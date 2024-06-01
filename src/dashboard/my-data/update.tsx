import { useState } from "react";
import Web3 from "web3";
import { useDropzone } from "react-dropzone";

import { APP_CONTRACT_ABI } from "../../utils/constants";
import Button from "../../components/button";

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

const rpcUrl = "https://devnet.galadriel.com/";
const contractABI = APP_CONTRACT_ABI;
const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
const chainId = process.env.REACT_APP_SMART_CONTRACT_CHAIN_ID;

const web3 = new Web3(rpcUrl);
const contract = new web3.eth.Contract(contractABI, contractAddress);

const PdfToImagesUploader = ({ close }: { close: () => void }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const [isUploading, setIsUploading] = useState(false);

  const convertPdfToImages = () => {
    if (!acceptedFiles[0]) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;

      // Dynamically load PDF.js script
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js";
      script.onload = () => {
        // Use PDF.js to load the PDF document
        window.pdfjsLib
          .getDocument({ data: arrayBuffer })
          .promise.then((pdfDoc: any) => {
            const numPages = pdfDoc.numPages;
            const imgPromises: Promise<string>[] = [];

            // Render each page to canvas and convert to image
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
              pdfDoc.getPage(pageNum).then((page: any) => {
                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };

                page.render(renderContext).promise.then(() => {
                  const imgUrl = canvas.toDataURL("image/png");
                  imgPromises.push(Promise.resolve(imgUrl));

                  // If all pages are processed, update state with images
                  if (imgPromises.length === numPages) {
                    Promise.all(imgPromises).then((imageUrls) => {
                      uploadImages(imageUrls);
                    });
                  }
                });
              });
            }
          });
      };
      document.body.appendChild(script);
    };

    reader.readAsArrayBuffer(acceptedFiles[0]);
  };

  const uploadImages = async (imageUrls: string[]) => {
    console.log(imageUrls, "imageUrls");
    setIsUploading(true);

    try {
      // Assume there's a function called "uploadImage" in the smart contract
      const accounts = await web3.eth.getAccounts();
      const imageUploadPromises = imageUrls.map((imageUrl, index) => {
        // Convert image URL to bytes
        const bytesData = web3.utils.asciiToHex(imageUrl);

        // Specify the chain ID when sending a transaction
        const transactionObject = {
          from: accounts[0], // Using the first account for simplicity
          to: contractAddress,
          data: contract.methods.uploadImage(bytesData).encodeABI(),
          chainId: chainId, // Set the chain ID for the network
        };

        // Send the transaction
        return web3.eth.sendTransaction(transactionObject);
      });

      // Wait for all image uploads to complete
      await Promise.all(imageUploadPromises);

      console.log("Images uploaded successfully");
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="pdf_to_img_uploader">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>
          {acceptedFiles?.length > 0
            ? acceptedFiles[0]?.name
            : "Start by importing your resume or Paste"}
        </p>
        <div className="btn">Browse files</div>
      </div>

      <div className="actions">
        <Button
          text="Cancel"
          className="btn_secondary"
          onClick={close}
          disabled={isUploading}
        />

        {acceptedFiles[0] && (
          <Button
            text="Upload PDF"
            onClick={convertPdfToImages}
            loading={isUploading}
          />
        )}
      </div>
    </div>
  );
};

export default PdfToImagesUploader;
