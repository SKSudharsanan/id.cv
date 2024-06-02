import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux";
import { ethers } from "ethers";
import { useEthersSigner } from "../../ethereum/use-ether-signer";

import PageTitle from "../../components/page-title";
import Button from "../../components/button";
import Loader from "../../components/loader";

import OfficialName from "./official-name";
import Email from "./email";
import ResumeData from "./resume-data";
import Certificates from "./certificates";
import Identification from "./identification";
import NewResumeUploader from "./new-resume";
import DomainForm from "./domain";

import { setAlert } from "../../redux/components/components-slice";
import {
  getResumeDataAction,
  postUpdateSavedDataAction,
} from "../../redux/data/data-slice";

import Icon from "../../assets/svg";

import { APP_CONTRACT_ABI } from "../../utils/constants";
import { getRequestError } from "../../utils/functions";

const navigations = [
  { key: "name", label: "Official Name" },
  { key: "email", label: "Email" },
  { key: "document", label: "Resume Data" },
  { key: "certification", label: "Certificates and Credentials" },
  { key: "identification", label: "Identification" },
];
const myResumeNav = navigations[2].label;

const MyDataPage = () => {
  const dispatch = useAppDispatch();
  const signer = useEthersSigner();

  const { user } = useSelector((state: any) => state.authSlice);
  const { isFetching, myData } = useSelector((state: any) => state.dataSlice);

  const [activeNav, setActiveNav] = useState(myData ? myResumeNav : "");
  const [showNewResume, setShowNewResume] = useState(false);
  const [showMintDomain, setShowMintDomain] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    getResumeData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResumeData = () => {
    dispatch(getResumeDataAction(myData?.domain + ".idcv.xyz")).then(() => {
      console.log(myData, "myData");
    });
  };

  useEffect(() => {
    if (!myData) {
      toggleNewResume();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);

  const toggleNewResume = () => {
    setActiveNav("");
    setShowNewResume(true);
  };

  const closeNewResume = () => {
    setActiveNav(myResumeNav);
    setShowNewResume(false);
  };

  const toggleMintDomain = () => {
    setActiveNav("");
    setShowMintDomain(true);
  };

  const closeMintDomain = () => {
    setActiveNav(myResumeNav);
    setShowMintDomain(false);
  };

  const registerSubDomain = async (domain: string) => {
    setIsRegistering(true);

    const contract = new ethers.Contract(
      process.env.REACT_APP_SMART_CONTRACT_ADDRESS || "",
      APP_CONTRACT_ABI,
      signer
    );
    const parentNode =
      "0xb6f17a44c72d1879e8ac12da42bb822b48cfd2bd7b6657787e3de381640c05da";
    const label = domain;
    const newOwner = user.address;
    const fuses = 0;
    const duration = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    try {
      const tx = await contract.register(
        parentNode,
        label,
        newOwner,
        fuses,
        duration,
        "0x" + myData.contentHash,
        { value: ethers.parseEther("0.001") }
      );

      const receipt = await tx.wait();
      if (receipt?.blockNumber) {
        dispatch(
          postUpdateSavedDataAction({
            ...(myData || {}),
            domain,
          })
        );
        dispatch(
          setAlert(true, "success", "Subdomain registration successful!")
        );
      }

      setIsRegistering(false);
      closeMintDomain();
    } catch (error) {
      console.error("Error registering subdomain:", error);

      setIsRegistering(false);
      dispatch(setAlert(true, "error", getRequestError(error)));
    }
  };

  const downloadJSON = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(myData?.resumeData ? myData?.resumeData : myData);
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "[ID.CV] My Resume.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const showHeaderActions = showNewResume || showMintDomain;

  return (
    <React.Fragment>
      <PageTitle title="My Data" />

      <div className="my_data_page_container">
        {isFetching ? (
          <div className="is_fetching_resume_data">
            <Loader />
          </div>
        ) : (
          <>
            <div className="content_container">
              <div className="section_header">
                <div className="left">
                  <h3>My Data</h3>
                  <p>Yours always.</p>
                </div>

                {!showHeaderActions && (
                  <div className="actions">
                    {myData && (
                      <Button text="Mint Domain" onClick={toggleMintDomain} />
                    )}
                    <Button
                      text="Update"
                      className="btn_secondary"
                      onClick={toggleNewResume}
                    />
                    <Button
                      text="Download JSON"
                      className="btn_secondary"
                      onClick={downloadJSON}
                    />
                  </div>
                )}
              </div>

              {showNewResume ? (
                <NewResumeUploader close={closeNewResume} />
              ) : showMintDomain ? (
                <DomainForm
                  close={closeMintDomain}
                  onSubmit={(domain) => registerSubDomain(domain)}
                  isLoading={isRegistering}
                />
              ) : (
                <div className="navigation">
                  <p className="title">Quick Search</p>

                  <div className="navs vertical_scroll">
                    {navigations.map((item, i) => (
                      <div
                        key={i}
                        className={classNames("item", {
                          active: activeNav === item.label,
                        })}
                        onClick={() => setActiveNav(item.label)}
                      >
                        <div className="icon">
                          <Icon name={item.key} />
                        </div>

                        <p>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr />

            {activeNav === navigations[0].label && <OfficialName />}
            {activeNav === navigations[1].label && <Email />}
            {activeNav === navigations[2].label && <ResumeData />}
            {activeNav === navigations[3].label && <Certificates />}
            {activeNav === navigations[4].label && <Identification />}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyDataPage;
