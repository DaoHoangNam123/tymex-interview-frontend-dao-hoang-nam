import { renderHook, act, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import useSidebarController from "@/src/app/(marketpage)/_components/Sidebar/hooks/useSidebarController";
import {
  saveCriteria,
  searchWithMultiCriteria,
  searchWithSingleCriteria,
  getCards,
  filterPrice,
  marketSlice,
} from "@/src/store/market/marketSlice";
import { RootState } from "@/src/store/store";
import "@testing-library/jest-dom";
import { useMarketSelector } from "@/store/hooks";

jest.mock("@/src/store/hooks", () => ({
  useMarketDispatch: jest.fn(),
  useMarketSelector: jest.fn(),
}));
const createMockStore = (preloadedState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      market: marketSlice.reducer,
    },
    preloadedState,
  });
};

describe("useSidebarController Hook", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({
      market: {
        cardList: [],
        originalCardList: [],
        loading: true,
        criteria: {
          priceSlider: [0.01, 200],
          tier: "All",
          theme: "Halloween",
          time: "Latest",
          priceSort: "Low",
          input: "",
          sort: "",
          order: "",
        },
      },
    });
    store.dispatch = jest.fn();
    (useMarketSelector as unknown as jest.Mock).mockReturnValue({
      priceSlider: [0.01, 200],
      tier: "All",
      theme: "Halloween",
      time: "Latest",
      priceSort: "Low",
      input: "aaaa",
      sort: "time",
      order: "asc",
    });
  });

  it("should handle input change and dispatch actions", async () => {
    const { result } = renderHook(() => useSidebarController());
    act(() => {
      result.current.handleChange({
        target: { value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        saveCriteria({ input: "test" })
      );
    });
  });

  // it("should handle sidebar change and dispatch actions", () => {
  //   const { result } = renderHook(() => useSidebarController());
  //   act(() => {
  //     result.current.handleChangeSidebar("Low", "priceSort");
  //   });
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     searchWithSingleCriteria({
  //       criteria: expect.any(Object),
  //       type: "priceSort",
  //     })
  //   );
  // });

  // it("should handle slider change and dispatch action", () => {
  //   const { result } = renderHook(() => useSidebarController(), { wrapper });
  //   act(() => {
  //     result.current.handleChangeSlider([10, 100]);
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledWith(filterPrice([10, 100]));
  // });

  // it("should handle reset filter and dispatch actions", () => {
  //   const { result } = renderHook(() => useSidebarController(), { wrapper });
  //   act(() => {
  //     result.current.handleResetFilter({ input: "", priceSort: "Low" });
  //   });
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     saveCriteria({ input: "", priceSort: "Low" })
  //   );
  //   expect(store.dispatch).toHaveBeenCalledWith(getCards());
  // });

  // it("should handle search button click and dispatch actions", () => {
  //   const { result } = renderHook(() => useSidebarController(), { wrapper });
  //   act(() => {
  //     result.current.handleClickSearchButton({ input: "search" });
  //   });
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     saveCriteria({ input: "search" })
  //   );
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     searchWithMultiCriteria({ criteria: { input: "search" } })
  //   );
  // });
});
