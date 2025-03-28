import { configureStore } from "@reduxjs/toolkit";
import { getCards, marketSlice } from "@/store/market/marketSlice";
import { render, screen } from "@testing-library/react";
import { RootState } from "@/src/store/store";
import CardList from "@/src/app/(marketpage)/_components/CardList/cardList";
import { Provider } from "react-redux";

jest.mock("@/src/store/market/marketSlice", () => ({
  ...jest.requireActual("@/src/store/market/marketSlice"),
  getCards: jest.fn(() => async () => Promise.resolve([])),
}));

jest.mock("@/src/components/Skeleton/skeleton", () => {
  const SkeletonList = () => (
    <div data-testid="skeleton-list">Mocked skeleton</div>
  );
  return SkeletonList;
});

const createMockStore = (preloadedState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      market: marketSlice.reducer,
    },
    preloadedState,
  });
};

describe("CardList Component", () => {
  test("show skeleton when loading", async () => {
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

    render(
      <Provider store={mockStore}>
        <CardList numberOfCards={10} />
      </Provider>
    );

    expect(await screen.findByText("Mocked skeleton")).toBeInTheDocument();
  });

  test("show 'No card found' when there are no cards", async () => {
    const mockStore = createMockStore({
      market: {
        cardList: [],
        originalCardList: [],
        loading: false,
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

    mockStore.dispatch(getCards());

    render(
      <Provider store={mockStore}>
        <CardList numberOfCards={10} />
      </Provider>
    );

    expect(await screen.findByText(/no card found/i)).toBeInTheDocument();
  });
});
