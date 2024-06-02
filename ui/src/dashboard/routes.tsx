import { Switch, Route, Redirect } from "react-router-dom";

import MyDataPage from "./my-data";

const dummyPage = () => {
  return <>Empty Page</>;
};

type NavRouteProps = {
  icon: string;
  label: string;
  to?: string | null;
  component?: () => JSX.Element;
}[];

export const navRoutes: NavRouteProps = [
  {
    icon: "data",
    label: "My Data",
    to: "/my-data",
    component: MyDataPage,
  },
  {
    icon: "notification",
    label: "Notifications",
    to: "/notifications",
    component: dummyPage,
  },
  {
    icon: "request",
    label: "Requests",
    to: "/requests",
    component: dummyPage,
  },
  {
    icon: "history",
    label: "History",
    to: "/history",
    component: dummyPage,
  },
  {
    icon: "help",
    label: "Help",
    to: "/help",
    component: dummyPage,
  },
  {
    icon: "settings",
    label: "Settings",
    to: "/settings",
    component: dummyPage,
  },
];

const UserRoutes = () => {
  const paths = navRoutes?.map((x) => x?.to);

  const pathname = window.location.pathname;

  return (
    <Switch>
      {navRoutes?.map((route, i) => (
        <Route
          key={i}
          exact
          path={route?.to || ""}
          component={route?.component}
        />
      ))}

      <Route
        path="*"
        render={() => (
          <Redirect to={paths.includes(pathname) ? pathname : `${paths[0]}`} />
        )}
      />
    </Switch>
  );
};

export default UserRoutes;
