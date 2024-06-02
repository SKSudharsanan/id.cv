import { useSelector } from "react-redux";

const ResumeData = () => {
  const { myData } = useSelector((state: any) => state.dataSlice);

  return (
    <div className="content_container resume_data_container">
      <div className="header">
        <p className="title">Resume Data</p>
      </div>

      <div className="content">
        <pre>{`${myData?.resumeData}`}</pre>
      </div>
    </div>
  );
};

export default ResumeData;
