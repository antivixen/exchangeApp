import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { isValid } from "../helpers";
import { TPocket, TState } from "../reducers";
import { setCredentials } from "../actions";

export type THeaderProps = {
  pockets: Array<TPocket>;
};

const LoginContainer = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputFields = styled.div`
  width: 500px;
  height 350px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 350px;
`;

type TProps = {
  setCredentials: (credentials: { login: string; password: string }) => void;
};

const Login = ({ setCredentials }: TProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const _onSubmit = () => {
    if (login.length && isValid(password)) {
      setCredentials({ login, password });
    }
  };

  return (
    <LoginContainer>
      <InputFields>
        <Input
          type="text"
          onChange={e => setLogin(e.target.value)}
          placeholder="Your login"
        />
        <br />
        <Input
          type="text"
          onChange={e => setPassword(e.target.value)}
          placeholder="Your password"
        />
        <br />
        <button
          disabled={!login.length || !isValid(password)}
          onClick={_onSubmit}
        >
          Submit
        </button>
      </InputFields>
    </LoginContainer>
  );
};

export default connect(
  null,
  (dispatch: any) => ({
    setCredentials: (credentials: { login: string; password: string }) =>
      dispatch(setCredentials(credentials))
  })
)(Login);
