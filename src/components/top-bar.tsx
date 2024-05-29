// import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux";

import { logoutUserAction } from "../redux/auth/auth-slice";

import Icon from "../assets/svg";

const TopBar = () => {
  const dispatch = useAppDispatch();

  // const { user } = useSelector((state: any) => state.authSlice);

  return (
    <div className="top_bar_container">
      <div className="logout" onClick={() => dispatch(logoutUserAction())}>
        <Icon name="logout" />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default TopBar;
