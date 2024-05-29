import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux";

import FormInput from "../components/form-input";
import Button from "../components/button";

import { createUserAction } from "../redux/auth/auth-slice";

import Icon from "../assets/svg";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { user } = useSelector((state: any) => state.authSlice);

  const [domain, setDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    setIsSubmitting(true);

    const payload = { domain };

    setTimeout(() => {
      dispatch(createUserAction(payload));
      // setIsSubmitting(false);
    }, 1000);
  };

  if (user?.id) return <>{history.push("/my-data")}</>;

  return (
    <div className="register_page_container">
      <div className="side left_side">
        <div className="animated_text">
          <p>
            Everyone is welcome here 🖤 <span>✦</span> Everyone is welcome here
            🖤 <span>✦</span> Everyone is welcome here 🖤 <span>✦</span>{" "}
            Everyone is welcome here 🖤 <span>✦</span> Everyone is welcome here
            🖤 <span>✦</span> Everyone is welcome here 🖤 <span>✦</span>{" "}
            Everyone is welcome here 🖤 <span>✦</span>
          </p>
        </div>

        <div className="occupations"></div>
      </div>

      <div className="side right_side">
        <div className="top">
          <Link to="/" className="icon">
            <Icon name="close" />
          </Link>
        </div>

        <div className="form_container">
          <FormInput
            label="Choose your id.cv name"
            type="text"
            placeholder="sfolayan.id.cv"
            onChange={(e) => setDomain(e?.target?.value)}
            readOnly={isSubmitting}
          />

          <div className="domain_preview">
            <div className="icon">
              <Icon name="cart" />
            </div>

            <div className="info">
              <h6>Domain: sfolayan.id.cv</h6>
              <p>Price: Free</p>
            </div>
          </div>

          <Button
            text="Connect Wallet"
            onClick={submitForm}
            disabled={!domain}
            loading={isSubmitting}
          />
        </div>

        <div className="top"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
