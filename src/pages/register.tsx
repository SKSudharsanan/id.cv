import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../redux";

import { loginUserAction } from "../redux/auth/auth-slice";

import FormInput from "../components/form-input";
import Button from "../components/button";

import Icon from "../assets/svg";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const account = useAccount();
  const { open } = useWeb3Modal();

  const { user } = useSelector((state: any) => state.authSlice);

  const [domain, setDomain] = useState("sfolayan.id.cv");

  useEffect(() => {
    if (account?.isConnected) {
      dispatch(loginUserAction(account.address));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

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
            placeholder="sfolayan.id.cv"
            value={domain}
            onChange={(e) => setDomain(e?.target?.value)}
            readOnly={account?.isConnecting}
          />

          <div className="domain_preview">
            <div className="icon">
              <Icon name="cart" />
            </div>

            <div className="info">
              <h6>Domain: {domain}</h6>
              <p>Price: Free</p>
            </div>
          </div>

          <Button
            text="Connect Wallet"
            onClick={() => open()}
            disabled={!domain}
            loading={account?.isConnecting}
          />
        </div>

        <div className="top"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
