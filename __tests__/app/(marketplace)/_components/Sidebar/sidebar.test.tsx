import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState } from "@/src/store/store";
import { configureStore } from "@reduxjs/toolkit";
import { marketSlice } from "@/src/store/market/marketSlice";
import Sidebar from "@/src/app/(marketpage)/_components/Sidebar/sidebar";

const createMockStore = (preloadedState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      market: marketSlice.reducer,
    },
    preloadedState,
  });
};

const mockStore = createMockStore({
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
describe("Sidebar Component", () => {
  const renderComponent = () =>
    render(
      <Provider store={mockStore}>
        <Sidebar />
      </Provider>
    );

  it("renders quick search input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Quick search")).toBeInTheDocument();
  });

  it("renders price range slider", () => {
    renderComponent();
    const sliderElement = screen.getAllByText("PRICE")[0];
    expect(sliderElement).toBeInTheDocument();
  });

  it("renders dropdown filters", () => {
    renderComponent();
    const priceSortElement = screen.getAllByText("PRICE")[1];
    expect(screen.getByText("TIER")).toBeInTheDocument();
    expect(screen.getByText("THEME")).toBeInTheDocument();
    expect(screen.getByText("TIME")).toBeInTheDocument();
    expect(priceSortElement).toBeInTheDocument();
  });

  it("renders reset and search buttons", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("updates state when quick search input changes", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Quick search");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });
});
