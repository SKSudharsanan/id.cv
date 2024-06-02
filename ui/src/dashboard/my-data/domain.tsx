import { useState } from "react";
import { useSelector } from "react-redux";

import FormInput from "../../components/form-input";
import Button from "../../components/button";
import Icon from "../../assets/svg";

type Props = {
  close: () => void;
  onSubmit: (domain: string) => void;
  isLoading: boolean;
};

const DomainForm = ({ close, onSubmit, isLoading }: Props) => {
  const { user } = useSelector((state: any) => state.authSlice);

  const [domain, setDomain] = useState(user?.domain || "");

  const submitForm = () => {
    onSubmit(domain);
  };

  return (
    <div className="register_domain">
      <FormInput
        label="Choose your id.cv name"
        type="text"
        placeholder="sfolayan"
        value={domain}
        onChange={(e) => setDomain(e?.target?.value)}
        readOnly={isLoading}
      />

      <div className="domain_preview">
        <div className="icon">
          <Icon name="cart" />
        </div>

        <div className="info">
          <h6>Domain: {domain || "___"}.id.cv</h6>
          <p>Price: 0.001ETH</p>
        </div>
      </div>

      <div className="actions">
        <Button
          text="Cancel"
          className="btn_secondary"
          onClick={close}
          disabled={isLoading}
        />
        <Button
          text="Mint Domain"
          onClick={submitForm}
          disabled={domain?.length < 3}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default DomainForm;
