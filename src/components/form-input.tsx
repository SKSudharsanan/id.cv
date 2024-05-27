import classNames from "classnames";

import Icon from "../assets/svg";

type Props = {
  id?: string;
  name?: string;
  label?: any;
  type: string;
  placeholder?: string;
  accept?: string;
  checked?: boolean;
  value?: string | boolean;
  onKeyPress?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: any;
  leftIcon?: string;
  rightIcon?: string;
  iconClick?: () => void;
  readOnly: boolean;
  errorMessage?: string;
};

const FormInput = ({
  id,
  name,
  label,
  type,
  placeholder,
  accept,
  value,
  checked,
  inputRef,
  leftIcon,
  rightIcon,
  iconClick,
  readOnly,
  errorMessage,
  ...rest
}: Props) => {
  const checkBoxInputTypes = ["checkbox", "radio"];

  return (
    <div className="form_group_container">
      {!checkBoxInputTypes.includes(type) ? (
        <div className="form-group">
          <div className={classNames("flex_input", { error: errorMessage })}>
            {leftIcon && (
              <div className="icon left_icon">
                <Icon name={leftIcon} />
              </div>
            )}

            <input
              name={name}
              type={type}
              placeholder={placeholder}
              accept={accept}
              value={value}
              className="form-control"
              readOnly={readOnly ? true : false}
              {...inputRef}
              {...rest}
            />

            {rightIcon && iconClick && (
              <div className="icon right_icon" onClick={iconClick}>
                <Icon name={rightIcon} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="form-group form-check">
          <input
            className="form-check-input"
            name={name}
            type={type}
            defaultValue={value}
            checked={checked || value ? true : false}
            id={id}
            readOnly={readOnly ? true : false}
            {...inputRef}
            {...rest}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      )}
      {errorMessage && (
        <span className="error_message">
          <Icon name="errorCircle" /> {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
