import { RootState } from "../store";

export const marketCardList = (state: RootState) => state.market.cardList;
export const loading = (state: RootState) => state.market.loading;
export const getCriteria = (state: RootState) => state.market.criteria;
