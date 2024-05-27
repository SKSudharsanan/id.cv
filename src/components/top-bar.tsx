import { useSelector } from "react-redux";

import Button from "./button";

const TopBar = () => {
  const { user, store } = useSelector((state: any) => state.authSlice);

  const mainAppUrl = "https://app.getidcv.com/dashboard";
  const storefrontUrl = store?.website_url;

  return (
    <div className="top_bar_container">
      <Button
        leftIcon="arrowBack"
        text="Back to App"
        className="btn_tertiary"
        onClick={() => window.location.assign(mainAppUrl)}
      />

      <div className="flex_end">
        <Button
          text="View Store"
          className="btn_secondary"
          onClick={() => window.open(storefrontUrl)}
        />

        <div className="user">
          <img src={store?.logo} alt="Store logo" />
          <p>{`${user?.first_name} ${user?.last_name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
