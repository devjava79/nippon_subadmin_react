import React from 'react';
import Home from "./component/kycmanagement/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App from "./App";

const routes  = () => {
    <Router>
        <Switch>
          <Route exact path="/" component={App}></Route>
        </Switch>
      </Router>
};

export default routes;