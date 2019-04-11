import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actions from "../actions/index";
import { numberValidate } from "../helpers";
import ErrorMessage from "./ErrorMessage";
import { TCurrency, TPocket, TPair, TState } from "../reducers";
import {
  formattedPocketsSelector,
  currentPocketSelector,
  donationPocketSelector,
  exchangeDisabledSelector
} from "../selectors";

export type TValues = {
  initialValue: number;
  exchangeValue: number;
};

export type TExchangeProps = {
  exchangeDisabled: boolean;
  pockets: Array<TPocket>;
  setBaseCurrency: (type: TCurrency) => void;
  pair: TPair;
  setLoading: () => void;
  currentPocket: TPocket;
  donationPocket: TPocket;
  setValue: (values: TValues) => void;
  exchange: (values: TValues) => void;
  setExchangeCurrency: (currency: TCurrency) => void;
  error: any;
};

const Container = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Information = styled.p`
  font-size: 12px;
`;

const Exchange = ({
  exchangeDisabled,
  pockets,
  setBaseCurrency,
  pair,
  setLoading,
  currentPocket,
  donationPocket,
  setValue,
  exchange,
  setExchangeCurrency,
  error
}: TExchangeProps) => {
  const [timing, setTiming]: Array<any> = useState(null);

  const initialInput = useRef<HTMLInputElement>(null);

  const { base, to } = pair;
  const maxValue = currentPocket.amount;

  useEffect(() => {
    if (timing) {
      clearInterval(timing);
    }
    if (initialInput && initialInput.current) {
      setExchangeValue({ target: { value: initialInput.current.value } });
    }
    if (initialInput && initialInput.current) {
      initialInput.current.focus();
    }
    setLoading();
    setTiming(setInterval(setLoading, 10000));
    return () => clearInterval(timing);
  }, [setLoading, base, to]);

  const setInitialValue = ({
    target
  }: React.ChangeEvent<HTMLInputElement> | { target: { value: number } }) => {
    const value = numberValidate(target.value);
    const exchangeValue =
      value / pair.rates > maxValue ? maxValue * pair.rates : value;
    const initialValue = numberValidate(exchangeValue / pair.rates);
    setValue({ initialValue, exchangeValue });
  };

  const setExchangeValue = ({
    target
  }: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    const value = numberValidate(target.value);
    const initialValue = numberValidate(value > maxValue ? maxValue : value);
    const exchangeValue = numberValidate(initialValue * pair.rates);
    setValue({
      initialValue,
      exchangeValue
    });
  };

  const makeExchange = () => {
    const initialValue: number = numberValidate(
      currentPocket.amount - pair.initialValue
    );
    const exchangeValue: number = numberValidate(
      donationPocket.amount + pair.exchangeValue
    );

    exchange({ initialValue, exchangeValue });
  };

  return error ? (
    <ErrorMessage />
  ) : (
    <Container>
      <div className="base">
        <h4>Exchange from currency</h4>
        <div className="currencies">
          {pockets.map(pocket => {
            return (
              <button
                key={pocket.type}
                disabled={pocket.type === base}
                onClick={() => setBaseCurrency(pocket.type)}
              >
                {pocket.sign}
              </button>
            );
          })}
        </div>
        <input
          ref={initialInput}
          placeholder={pair.base}
          type="number"
          value={pair.initialValue || ""}
          onChange={setExchangeValue}
        />
        <Information>
          You have {currentPocket.amount}
          {currentPocket.sign}
        </Information>
      </div>
      <button disabled={exchangeDisabled} onClick={makeExchange}>
        Exchange
      </button>
      <div className="to">
        <h4>Exchange to currency</h4>
        <div className="currencies">
          {pockets.map(pocket => {
            return (
              <button
                key={pocket.type}
                disabled={pocket.type === to}
                onClick={() => setExchangeCurrency(pocket.type)}
              >
                {pocket.sign}
              </button>
            );
          })}
        </div>
        <input
          type="number"
          placeholder={pair.to}
          value={pair.exchangeValue || ""}
          onChange={setInitialValue}
        />
        <Information>
          1({pair.base}) = {numberValidate(pair.rates)}({pair.to})
        </Information>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: TState) => ({
  error: state.error,
  pockets: formattedPocketsSelector(state),
  pair: state.pair,
  currentPocket: currentPocketSelector(state),
  donationPocket: donationPocketSelector(state),
  exchangeDisabled: exchangeDisabledSelector(state)
});

const mapDospatchToProps = (dispatch: any) => ({
  setLoading: () => dispatch(actions.loadData()),
  setValue: (values: TValues) => dispatch(actions.setValue(values)),
  exchange: (values: TValues) => dispatch(actions.exchange(values)),
  setBaseCurrency: (currency: TCurrency) =>
    dispatch(actions.setBaseCurrency(currency)),
  setExchangeCurrency: (currency: TCurrency) =>
    dispatch(actions.setExchangeCurrency(currency))
});

export default connect(
  mapStateToProps,
  mapDospatchToProps
)(Exchange);
