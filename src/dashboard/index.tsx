import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import Sidebar from "../components/sidebar";

import UserRoutes from "./routes";
import TopBar from "../components/top-bar";

const Dashboard = () => {
  const { isSidebarOpen } = useSelector((state: any) => state.componentsSlice);

  return (
    <BrowserRouter>
      <div
        className={classNames("dashboard_container", {
          hide_sidebar: !isSidebarOpen,
        })}
      >
        <Sidebar />

        <div className="dashboard_content">
          <TopBar />

          <div className="page_container">
            <UserRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
