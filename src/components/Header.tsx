import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TPocket, TState } from "../reducers";

export type THeaderProps = {
  pockets: Array<TPocket>;
};

const PocketElement = styled.div`
  padding: 10px 0;
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Amount = styled.p`
  margin-top: 0;
`;
const Header = ({ pockets }: THeaderProps) => (
  <header className="App-header">
    <h3>Your pockets</h3>
    {pockets.map(({ type, amount, sign }) => {
      return (
        <PocketElement key={sign}>
          <p>{type}</p>
          <Amount>
            <span>{sign}</span>
            {amount}
          </Amount>
        </PocketElement>
      );
    })}
  </header>
);
export default connect((state: TState) => ({ pockets: state.pockets }))(Header);
