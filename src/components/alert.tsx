import { useEffect } from "react";
import { bounceInUp } from "react-animations";
import Radium from "radium";
import { useAppDispatch } from "../redux";

import Icon from "../assets/svg";

import { closeAlert } from "../redux/components/components-slice";

type Props = {
  className: string;
  text: string;
  close: boolean;
};

const Alert = ({ className, text, close }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeAlert());
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles: any = {
    bounceInUp: {
      animation: "x .6s",
      animationName: Radium.keyframes(bounceInUp, "bounceInUp"),
    },
  };

  return (
    <Radium.StyleRoot>
      <div className={`alert_container ${className}`} style={styles.bounceInUp}>
        <div className="alert">
          <p>{text}</p>
        </div>
        {close && (
          <div className="close_div" onClick={() => dispatch(closeAlert())}>
            <Icon name="close" />
          </div>
        )}
      </div>
    </Radium.StyleRoot>
  );
};

export default Alert;
