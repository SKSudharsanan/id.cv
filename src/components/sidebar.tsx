import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux";

// import Logo from "./logo";

import { toggleSidebarAction } from "../redux/components/components-slice";

// import Icon from "../assets/svg";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useSelector((state: any) => state.componentsSlice);

  const respScreenWidth = 851;

  const handleSidebarClose = () => {
    if (window.innerWidth < respScreenWidth) {
      dispatch(toggleSidebarAction(false));
    }
  };
  useEffect(() => {
    handleSidebarClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames("sidebar_container", {
        sidebar_open: isSidebarOpen,
      })}
    >
      <div className="sidebar_container_inner"></div>
    </div>
  );
};

export default Sidebar;
