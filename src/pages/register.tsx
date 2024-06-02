import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../redux";

import FormInput from "../components/form-input";
import Button from "../components/button";

import { loginUserAction } from "../redux/auth/auth-slice";

import Icon from "../assets/svg";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const account: any = useAccount();
  const { open } = useWeb3Modal();

  const { user } = useSelector((state: any) => state.authSlice);

  const [label, setLabel] = useState("");

  useEffect(() => {
    if (account?.isConnected && account?.address) {
      authenticateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const authenticateUser = async () => {
    dispatch(
      loginUserAction({
        address: account.address,
        domain: label,
      })
    );
  };

  if (user) {
    return <>{history.push("/my-data")}</>;
  }

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
            placeholder="sfolayan"
            value={label}
            onChange={(e) => setLabel(e?.target?.value)}
            readOnly={account?.isConnecting}
          />

          <div className="domain_preview">
            <div className="icon">
              <Icon name="cart" />
            </div>

            <div className="info">
              <h6>Domain: {label || "___"}.id.cv</h6>
              <p>Price: Free</p>
            </div>
          </div>

          <Button
            text="Connect Wallet"
            onClick={() => open()}
            disabled={label?.length < 3}
            loading={account?.isConnecting}
          />
        </div>

        <div className="top"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
