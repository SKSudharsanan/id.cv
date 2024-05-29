import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { ProtectedRoute } from "./components/protected-route";
import Alert from "./components/alert";

import Dashboard from "./dashboard";

import HomePage from "./pages/index";
import RegisterPage from "./pages/register";

const App = () => {
  const { alert } = useSelector((state: any) => state.componentsSlice);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />

          <ProtectedRoute component={Dashboard} />
        </Switch>
      </BrowserRouter>

      {/* Other components */}
      {alert?.show && (
        <Alert className={alert?.type} text={alert?.message} close />
      )}
    </React.Fragment>
  );
};

export default App;
