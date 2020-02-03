import React from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";

import ViewWindow from "./viewWindow";
import ViewStartup from "./viewStartup";
import { State } from "../types/states";

const mapStateToProps = (state: State) => {
  return {};
};

const ConnectedViewManager = () => {
  return (
    <Router>
      <ViewStartup path="startup" />
      <ViewWindow path="window" />
    </Router>
  );
};

const ViewManager = connect(mapStateToProps)(ConnectedViewManager);
export default ViewManager;
