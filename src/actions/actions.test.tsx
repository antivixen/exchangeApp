import * as actions from "./index";

describe("actions", () => {
  it("should create an action to request rates", () => {
    const expectedAction = {
      type: "GET_RATES_REQUEST"
    };
    expect(actions.getRatesRequest()).toEqual(expectedAction);
  });

  it("should pass the data if request was successful", () => {
    const expectedAction = {
      type: "GET_RATES_SUCCESS",
      payload: { to: 1, exchangeValue: 1 }
    };
    expect(actions.getRateSuccess(1, 1)).toEqual(expectedAction);
  });

  it("should pass an error if request was failed", () => {
    const expectedAction = {
      type: "GET_EXCHANGE_ERROR",
      payload: "error"
    };
    expect(actions.getRatesError("error")).toEqual(expectedAction);
  });

  it("should commit an exchange action", () => {
    const expectedAction = {
      type: "EXCHANGE",
      payload: { initialValue: 1, exchangeValue: 1 }
    };
    expect(actions.exchange({ initialValue: 1, exchangeValue: 1 })).toEqual(
      expectedAction
    );
  });

  it("should set value", () => {
    const expectedAction = {
      type: "SET_VALUE",
      payload: { initialValue: 1, exchangeValue: 1 }
    };
    expect(actions.setValue({ initialValue: 1, exchangeValue: 1 })).toEqual(
      expectedAction
    );
  });

  it("should set up base currency", () => {
    const expectedAction = {
      type: "SET_BASE_CURRENCY",
      payload: "USD"
    };
    expect(actions.setBaseCurrency("USD")).toEqual(expectedAction);
  });

  it("should set up exchange currency", () => {
    const expectedAction = {
      type: "SET_EXCHANGE_CURRENCY",
      payload: "GBP"
    };
    expect(actions.setExchangeCurrency("GBP")).toEqual(expectedAction);
  });
});
