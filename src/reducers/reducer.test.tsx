import { reducer, initialState } from "./index";

describe("main reducer", () => {
  it("should return the initialState", () => {
    expect(reducer(undefined, { type: "default" })).toEqual(initialState);
  });
  it("should set up base currency", () => {
    expect(
      reducer(undefined, { type: "SET_BASE_CURRENCY", payload: "USD" })
    ).toEqual({ ...initialState, pair: { ...initialState.pair, base: "USD" } });
  });
  it("should set the rates on", () => {
    expect(
      reducer(undefined, {
        type: "GET_RATES_SUCCESS",
        payload: { to: 1, exchangeValue: 1 }
      })
    ).toEqual({
      ...initialState,
      pair: { ...initialState.pair, rates: 2, exchangeValue: 0 }
    });
  });
  it("should set the value", () => {
    expect(
      reducer(undefined, {
        type: "SET_VALUE",
        payload: { initialValue: 1, exchangeValue: 1 }
      })
    ).toEqual({
      ...initialState,
      pair: { ...initialState.pair, initialValue: 1, exchangeValue: 1 }
    });
  });
  it("should commit an exchange action", () => {
    expect(
      reducer(undefined, {
        type: "EXCHANGE",
        payload: { initialValue: 1, exchangeValue: 1 }
      })
    ).toEqual({
      ...initialState,
      pair: { ...initialState.pair, initialValue: 0, exchangeValue: 0 },
      pockets: initialState.pockets.map(pocket => {
        if (pocket.type === initialState.pair.base) {
          return {
            ...pocket,
            amount: 1
          };
        } else if (pocket.type === initialState.pair.to) {
          return {
            ...pocket,
            amount: 1
          };
        } else {
          return pocket;
        }
      })
    });
  });
});
