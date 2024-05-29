import { useEffect } from "react";
import { useAppDispatch } from "../redux";
import { useAccount, useDisconnect } from "wagmi";

import { logoutUserAction } from "../redux/auth/auth-slice";

import Icon from "../assets/svg";

const TopBar = () => {
  const dispatch = useAppDispatch();

  const account = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (account?.isDisconnected) {
      dispatch(logoutUserAction());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="top_bar_container">
      <div className="search_container"></div>

      <div className="logout" onClick={() => disconnect()}>
        <div className="icon">
          <Icon name="logout" />
        </div>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default TopBar;
