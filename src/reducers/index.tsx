export type TCurrency = "EUR" | "GBP" | "USD";
export type TAction = {
  type: string;
  payload?: any;
};
export type TPocket = {
  type: TCurrency;
  sign: string;
  amount: number;
};

export type TPair = {
  base: TCurrency;
  to: TCurrency;
  rates: number;
  initialValue: number;
  exchangeValue: number;
};

export type TState = {
  isLogged: boolean;
  credentials: { login: string; password: string };
  pockets: Array<TPocket>;
  pair: TPair;
  error: any;
};
export const initialState: TState = {
  isLogged: false,
  credentials: { login: "", password: "" },
  pockets: [
    { type: "USD", sign: "$", amount: 100 },
    { type: "GBP", sign: "£", amount: 100 },
    { type: "EUR", sign: "€", amount: 100 }
  ],
  pair: { base: "USD", to: "GBP", rates: 2, initialValue: 0, exchangeValue: 0 },
  error: null
};

export const reducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case "SET_CREDENTIALS":
      return {
        ...state,
        isLogged: true,
        credentials: {
          ...state.credentials,
          login: action.payload.login,
          password: action.payload.password
        }
      };
    case "SET_BASE_CURRENCY":
      return { ...state, pair: { ...state.pair, base: action.payload } };
    case "SET_EXCHANGE_CURRENCY":
      return { ...state, pair: { ...state.pair, to: action.payload } };
    case "GET_RATES_SUCCESS":
      return {
        ...state,
        pair: {
          ...state.pair,
          rates: action.payload.to,
          exchangeValue: action.payload.exchangeValue
        }
      };
    case "GET_RATES_ERROR":
      return { ...state, error: action.payload };
    case "EXCHANGE":
      return {
        ...state,
        pair: { ...state.pair, initialValue: 0, exchangeValue: 0 },
        pockets: state.pockets.map(pocket => {
          if (pocket.type === state.pair.base) {
            return {
              ...pocket,
              amount: action.payload.initialValue
            };
          } else if (pocket.type === state.pair.to) {
            return {
              ...pocket,
              amount: action.payload.exchangeValue
            };
          } else {
            return pocket;
          }
        })
      };
    case "SET_VALUE":
      return {
        ...state,
        pair: {
          ...state.pair,
          initialValue: action.payload.initialValue,
          exchangeValue: action.payload.exchangeValue
        }
      };
    default:
      return state;
  }
};
