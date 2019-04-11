import { createSelector } from "reselect";
import { TState, TPocket, TPair } from "../reducers";
import { numberValidate } from "../helpers";

const pockets = (state: TState): Array<TPocket> => state.pockets;
const pair = (state: TState): TPair => state.pair;

export const formattedPocketsSelector = createSelector(
  pockets,
  pockets =>
    pockets.map(pocket => ({
      ...pocket,
      amount: numberValidate(pocket.amount)
    }))
);
export const currentPocketSelector = createSelector(
  pockets,
  pair,
  (pocket, pair) =>
    pocket.reduce((acc, next) => (next.type === pair.base ? next : acc))
);

export const donationPocketSelector = createSelector(
  pockets,
  pair,
  (pocket, pair) =>
    pocket.reduce((acc, next) => (next.type === pair.to ? next : acc))
);

export const exchangeDisabledSelector = createSelector(
  pair,
  pair => pair.base === pair.to || !pair.initialValue
);
