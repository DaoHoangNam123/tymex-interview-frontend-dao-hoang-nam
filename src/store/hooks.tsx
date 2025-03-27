import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useMarketDispatch = useDispatch.withTypes<AppDispatch>();
export const useMarketSelector = useSelector.withTypes<RootState>();
