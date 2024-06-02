import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux";
import { ethers } from "ethers";
import { useEthersSigner } from "../../ethereum/use-ether-signer";

import Loader from "../../components/loader";
import Button from "../../components/button";

import { setAlert } from "../../redux/components/components-slice";
import {
  postUploadPdfAction,
  getResumeDataByChatIdAction,
  postGenerateResumeAction,
} from "../../redux/data/data-slice";

import { APP_CONTRACT_ABI } from "../../utils/constants";
import { getRequestError } from "../../utils/functions";

type Props = {
  close: () => void;
  onSuccess: () => void;
};

const NewResumeUploader = ({ close }: Props) => {
  const dispatch = useAppDispatch();
  const signer = useEthersSigner();

  const { user } = useSelector((state: any) => state.authSlice);
  const { isUploading, isGenerating, myData } = useSelector(
    (state: any) => state.dataSlice
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const [isRegisteringSubDomain, setIsRegisteringSubDomain] = useState(false);

  const handleUpload = async () => {
    if (!acceptedFiles[0]) return;

    const formData = new FormData();
    formData.append("pdf", acceptedFiles[0]);

    dispatch(postUploadPdfAction(formData)).then((res) => {
      if (res?.success === true) {
        setTimeout(() => handleGetResumeData(res?.data), 5000);
      }
    });
  };

  const handleGetResumeData = async (id: number) => {
    dispatch(getResumeDataByChatIdAction(id)).then((res) => {
      if (res?.success === true) {
        handleGenerateResume({ id, data: res?.data });
      }
    });
  };

  const handleGenerateResume = async (data: any) => {
    const payload: any = {
      chatId: data?.id,
      resumeData: data?.data,
      theme: "modern",
    };

    dispatch(postGenerateResumeAction(payload)).then((res) => {
      if (res?.success === true) {
        registerSubDomain();
      }
    });
  };

  const registerSubDomain = async () => {
    setIsRegisteringSubDomain(true);

    const contract = new ethers.Contract(
      process.env.REACT_APP_SMART_CONTRACT_ADDRESS || "",
      APP_CONTRACT_ABI,
      signer
    );
    const parentNode =
      "0xb6f17a44c72d1879e8ac12da42bb822b48cfd2bd7b6657787e3de381640c05da";
    const label = user.domain;
    const newOwner = user.address;
    const fuses = 0;
    const duration = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    try {
      const tx = await contract.register(
        parentNode,
        label,
        newOwner,
        fuses,
        duration,
        myData.contentHash,
        { value: ethers.parseEther("0.001") }
      );
      console.log("Transaction hash:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction was mined in block:", receipt.blockNumber);

      setIsRegisteringSubDomain(false);
      dispatch(setAlert(true, "success", "Domain registration successful!"));
    } catch (error) {
      console.error("Error registering subdomain:", error);
      dispatch(setAlert(true, "error", getRequestError(error)));

      setIsRegisteringSubDomain(false);
    }
  };

  const isLoading = isUploading || isGenerating || isRegisteringSubDomain;

  console.log(myData, "myData");

  return (
    <div className="pdf_to_img_uploader">
      {isGenerating || isRegisteringSubDomain ? (
        <div className="is_generating">
          <Loader
            text={`Now ${
              isGenerating
                ? `generating your Resume Data`
                : `registering your sub domain`
            }. Please wait...`}
          />
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            {acceptedFiles?.length > 0
              ? acceptedFiles[0]?.name
              : "Start by importing your resume or Paste"}
          </p>
          <div className="btn">Browse files</div>
        </div>
      )}

      <div className="actions">
        {myData && (
          <Button
            text="Cancel"
            className="btn_secondary"
            onClick={close}
            disabled={isLoading}
          />
        )}

        {acceptedFiles[0] && (
          <Button
            text="Upload PDF"
            onClick={handleUpload}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default NewResumeUploader;
