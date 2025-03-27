import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import useSidebarController from "@/src/app/(marketpage)/_components/Sidebar/hooks/useSidebarController";
import {
  saveCriteria,
  searchWithMultiCriteria,
  searchWithSingleCriteria,
  getCards,
  filterPrice,
} from "@/src/store/market/marketSlice";

const createMockStore = (preloadedState) => {
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
  });

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it("should handle input change and dispatch actions", async () => {
    const { result } = renderHook(() => useSidebarController(), { wrapper });
    act(() => {
      result.current.handleChange({ target: { value: "test" } });
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      saveCriteria({ input: "test" })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      searchWithMultiCriteria({ criteria: { input: "test" } })
    );
  });

  it("should handle sidebar change and dispatch actions", async () => {
    const { result } = renderHook(() => useSidebarController(), { wrapper });
    act(() => {
      result.current.handleChangeSidebar("Low", "priceSort");
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      searchWithSingleCriteria({
        criteria: expect.any(Object),
        type: "priceSort",
      })
    );
  });

  it("should handle slider change and dispatch action", () => {
    const { result } = renderHook(() => useSidebarController(), { wrapper });
    act(() => {
      result.current.handleChangeSlider([10, 100]);
    });
    expect(store.dispatch).toHaveBeenCalledWith(filterPrice([10, 100]));
  });

  it("should handle reset filter and dispatch actions", () => {
    const { result } = renderHook(() => useSidebarController(), { wrapper });
    act(() => {
      result.current.handleResetFilter({ input: "", priceSort: "Low" });
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      saveCriteria({ input: "", priceSort: "Low" })
    );
    expect(store.dispatch).toHaveBeenCalledWith(getCards());
  });

  it("should handle search button click and dispatch actions", () => {
    const { result } = renderHook(() => useSidebarController(), { wrapper });
    act(() => {
      result.current.handleClickSearchButton({ input: "search" });
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      saveCriteria({ criteria: { input: "search" } })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      searchWithMultiCriteria({ criteria: { input: "search" } })
    );
  });
});
