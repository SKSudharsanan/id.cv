import { useState } from "react";

import FormInput from "../../components/form-input";
import Button from "../../components/button";

const OfficialName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="content_container official_name_container">
      <div className="header">
        <p className="title">Official Name</p>
      </div>

      <div className="content">
        <FormInput
          type="text"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          readOnly={isSubmitting}
        />
        <FormInput
          type="text"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          readOnly={isSubmitting}
        />
        <FormInput
          type="date"
          label="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          readOnly={isSubmitting}
        />

        <div className="actions">
          <Button text="Submit" onClick={submitForm} loading={isSubmitting} />
          <Button
            text="Submit and Verify"
            onClick={submitForm}
            loading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default OfficialName;
