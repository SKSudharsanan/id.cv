import Loader from "./loader";

import Icon from "../assets/svg";

type Props = {
  className?: string;
  btnStyle?: any;
  text: any;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  className,
  btnStyle,
  text,
  leftIcon,
  rightIcon,
  loading,
  loadingText,
  disabled,
  onClick,
  ...rest
}: Props) => (
  <button
    className={`button_component btn ${className ? className : "btn_primary"} ${
      loading ? "loading" : ""
    }`}
    style={btnStyle}
    onClick={onClick}
    disabled={disabled || loading}
    {...rest}
  >
    {loading ? (
      <div className="loader">
        <Loader />
        {loadingText && <p>{loadingText}</p>}
      </div>
    ) : (
      <>
        {leftIcon && <Icon name={leftIcon} />}
        {text}
        {rightIcon && <Icon name={rightIcon} />}
      </>
    )}
  </button>
);

export default Button;
