import { TCurrency } from "../reducers";

export type getRatesRequest = {
  type: "GET_RATES_REQUEST";
};

export type getRateSuccess = {
  type: "GET_RATES_SUCCESS";
  payload: { to: number; exchangeValue: number };
};

export type getRatesError = {
  type: "GET_EXCHANGE_ERROR";
  payload: any;
};

export type exchange = {
  type: "EXCHANGE";
  payload: {
    initialValue: number;
    exchangeValue: number;
  };
};

export type setValue = {
  type: "SET_VALUE";
  payload: {
    initialValue: number;
    exchangeValue: number;
  };
};

export type setBaseCurrency = {
  type: "SET_BASE_CURRENCY";
  payload: TCurrency;
};

export type setExchangeCurrency = {
  type: "SET_EXCHANGE_CURRENCY";
  payload: TCurrency;
};
