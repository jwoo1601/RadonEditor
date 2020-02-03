import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import ViewManager from "./views/ViewManager";

import "./i18n";

/* Development Mode Only */
Object.defineProperty(window, "store", store);
///////////////////////////

ReactDOM.render(
  <Provider store={store}>
    <ViewManager />
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
