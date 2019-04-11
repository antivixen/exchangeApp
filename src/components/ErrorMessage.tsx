import React, { Fragment } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const ErrorTitle = styled.h1`
  color: red;
`;

const ErrorMessage = () => (
  <Fragment>
    <ErrorTitle>Something went wrong</ErrorTitle>
    <Loader />
  </Fragment>
);
export default ErrorMessage;
