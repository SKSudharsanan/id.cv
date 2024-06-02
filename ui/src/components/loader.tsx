import Icon from "../assets/svg";

const Loader = ({ text }: { text?: string }) => {
  return (
    <div className="loader_img_container">
      <Icon name="loader" />
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loader;
