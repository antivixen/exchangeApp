import { numberValidate } from "../helpers/";
import { TState, TCurrency } from "../reducers";
import * as types from "./types";

export const setCredentials = ({
  login,
  password
}: {
  login: string;
  password: string;
}): types.setCredentialsType => ({
  type: "SET_CREDENTIALS",
  payload: { login, password }
});

export const getCredentialsRequest = (): types.getCredentialsRequest => ({
  type: "GET_CREDENTIALS_REQUEST"
});

export const getRatesRequest = (): types.getRatesRequest => ({
  type: "GET_RATES_REQUEST"
});

export const getRateSuccess = (
  to: number,
  exchangeValue: number
): types.getRateSuccess => ({
  type: "GET_RATES_SUCCESS",
  payload: { to, exchangeValue }
});

export const getRatesError = (error: any): types.getRatesError => ({
  type: "GET_EXCHANGE_ERROR",
  payload: error
});

export const exchange = (values: {
  initialValue: number;
  exchangeValue: number;
}): types.exchange => ({ type: "EXCHANGE", payload: values });

export const setValue = (value: {
  initialValue: number;
  exchangeValue: number;
}): types.setValue => ({ type: "SET_VALUE", payload: value });

export const setBaseCurrency = (
  currency: TCurrency
): types.setBaseCurrency => ({ type: "SET_BASE_CURRENCY", payload: currency });

export const setExchangeCurrency = (
  currency: TCurrency
): types.setExchangeCurrency => ({
  type: "SET_EXCHANGE_CURRENCY",
  payload: currency
});

export const loadData = () => async (dispatch: any, getState: () => TState) => {
  dispatch(getRatesRequest());
  const { pair } = getState();

  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${pair.base}&symbols=${
        pair.to
      }`
    );
    const { rates } = await response.json();

    const exchangeValue = pair.initialValue
      ? numberValidate(pair.initialValue * rates[pair.to])
      : pair.exchangeValue;

    dispatch(getRateSuccess(rates[pair.to], exchangeValue));
  } catch (e) {
    dispatch(getRatesError(e));
  }
};
