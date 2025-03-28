import { renderHook, act, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import useSidebarController from "@/src/app/(marketpage)/_components/Sidebar/hooks/useSidebarController";
import { marketSlice } from "@/src/store/market/marketSlice";
import { RootState } from "@/src/store/store";
import "@testing-library/jest-dom";
import { useMarketSelector, useMarketDispatch } from "@/store/hooks";

jest.mock("@/src/store/hooks", () => ({
  useMarketDispatch: jest.fn(),
  useMarketSelector: jest.fn(),
}));
jest.mock("lodash", () => ({
  debounce: jest.fn((fn) => fn),
}));

const createMockStore = (preloadedState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      market: marketSlice.reducer,
    },
    preloadedState,
  });
};
const mockCriteria = {
  priceSlider: [0.01, 200],
  tier: "All",
  theme: "Halloween",
  time: "Latest",
  priceSort: "Low",
  input: "",
  sort: "",
  order: "",
};

const mockState = {
  market: {
    cardList: [],
    originalCardList: [],
    loading: true,
    criteria: mockCriteria,
  },
};

describe("useSidebarController Hook", () => {
  let store;

  beforeEach(() => {
    store = createMockStore(mockState);
    (useMarketSelector as unknown as jest.Mock).mockReturnValue({
      ...mockCriteria,
      input: "test",
      sort: "time",
      order: "asc",
    });
    (useMarketDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });
  it("should handle input change and dispatch actions", async () => {
    store.dispatch = useMarketDispatch;

    const { result } = renderHook(() => useSidebarController());
    act(() => {
      result.current.handleChange({
        target: { value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  it("should handle sidebar change and dispatch actions", () => {
    store.dispatch = useMarketDispatch;

    const { result } = renderHook(() => useSidebarController());
    act(() => {
      result.current.handleChangeSidebar("Low", "priceSort");
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should handle slider change and dispatch action", () => {
    store.dispatch = useMarketDispatch;

    const { result } = renderHook(() => useSidebarController());
    act(() => {
      result.current.handleChangeSlider([10, 100]);
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should handle reset filter and dispatch actions", () => {
    store.dispatch = useMarketDispatch;

    const { result } = renderHook(() => useSidebarController());
    act(() => {
      result.current.handleResetFilter({ input: "", priceSort: "Low" });
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should handle search button click and dispatch actions", () => {
    store.dispatch = useMarketDispatch;

    const { result } = renderHook(() => useSidebarController());
    act(() => {
      result.current.handleClickSearchButton({ input: "search" });
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
