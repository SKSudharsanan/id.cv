import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux";

import Loader from "../../components/loader";
import Button from "../../components/button";

import {
  postUploadPdfAction,
  getResumeDataByChatIdAction,
  postGenerateResumeAction,
} from "../../redux/data/data-slice";

type Props = {
  close: () => void;
};

const NewResumeUploader = ({ close }: Props) => {
  const dispatch = useAppDispatch();

  const { isUploading, isGenerating, myData } = useSelector(
    (state: any) => state.dataSlice
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

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
      resumeData: JSON.parse(data?.data),
      theme: "modern",
    };

    dispatch(postGenerateResumeAction(payload)).then((res) => {
      if (res?.success === true) {
        close();
      }
    });
  };

  const isLoading = isUploading || isGenerating;

  return (
    <div className="pdf_to_img_uploader">
      {isGenerating ? (
        <div className="is_generating">
          <Loader text="Now generating your Resume Data. Please wait..." />
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
