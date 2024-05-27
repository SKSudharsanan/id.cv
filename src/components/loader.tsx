import loader from "../assets/svg/loader.svg";

const Loader = ({ text }: { text?: string }) => {
  return (
    <div className="loader_img_container">
      <img src={loader} className="loader_img" alt="Loader img" />
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loader;
