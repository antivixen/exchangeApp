import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Exchange from "./Exchange";
import Login from "./Login";
import { TState } from "../reducers";
import { getCredentialsRequest } from "../actions";
import "./App.css";

const App = ({ isLogged }: { isLogged: boolean }) => {
  useEffect(() => {
    getCredentialsRequest();
  }, []);
  return (
    <div className="App">
      {isLogged ? (
        <Fragment>
          <Header />
          <Exchange />
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default connect(
  (state: TState) => ({ isLogged: state.isLogged }),
  dispatch => ({ getCredentials: dispatch(getCredentialsRequest()) })
)(App);
