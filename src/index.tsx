import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/App";
import { reducer } from "./reducers/";

const revolutStore = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={revolutStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
