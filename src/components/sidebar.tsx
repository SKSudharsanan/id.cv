import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux";
import { useAccount } from "wagmi";

import Logo from "./logo";

import { navRoutes } from "../dashboard/routes";

import { toggleSidebarAction } from "../redux/components/components-slice";

import Icon from "../assets/svg";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const account = useAccount();

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
      <div
        className="close_menu"
        onClick={() => dispatch(toggleSidebarAction(false))}
      >
        <Icon name="close" />
      </div>

      <Logo colored />

      <div className="sidebar_container_inner">
        <div className="user">
          <div className="info">
            <div className="icon">
              <Icon name="user" />
            </div>
            <p>{account.address}</p>
          </div>

          <div className="chevron">
            <Icon name="chevronRight" />
          </div>
        </div>

        <div className="links">
          {navRoutes?.map((item, i) => (
            <NavLink to={item.to || ""} key={i} className="link">
              <div className="icon">
                <Icon name={item.icon} />
              </div>

              <p>{item.label}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
