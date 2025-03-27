import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CardProps, FilterCriteriaProps, SearchProps } from "@/type/common";
import {
  getNFTCards,
  getNFTCardsWithCriteria,
  getNFTCardsWithSingleCriteria,
} from "@/services/marketService";
import { debounce } from "lodash";

const SLICE_NAME = "market";

const defaultFilterValue = {
  priceSlider: [0.01, 200],
  tier: "All",
  theme: "Halloween",
  time: "Latest",
  priceSort: "Low",
  input: "",
  sort: "",
  order: "",
};

type MarketProps = {
  cardList: CardProps[];
  originalCardList: CardProps[];
  loading: boolean;
  criteria: FilterCriteriaProps;
};

const initialState: MarketProps = {
  cardList: [],
  originalCardList: [],
  loading: true,
  criteria: defaultFilterValue,
};

export const getCards = createAsyncThunk<CardProps[]>(
  SLICE_NAME + "/getNFTCards",
  async (): Promise<CardProps[]> => {
    const response = await getNFTCards();

    return response.data as CardProps[];
  }
);

export const searchWithMultiCriteria = createAsyncThunk<
  CardProps[],
  SearchProps
>(
  SLICE_NAME + "/searchNFTCardsWithCriteria",
  async (params: SearchProps): Promise<CardProps[]> => {
    const response = await getNFTCardsWithCriteria(params);

    return response;
  }
);

export const searchWithSingleCriteria = createAsyncThunk<
  CardProps[],
  SearchProps & { type: string }
>(
  SLICE_NAME + "/searchNFTCardsWithCriteria",
  async (params): Promise<CardProps[]> => {
    const response = await getNFTCardsWithSingleCriteria(params);

    return response.data as CardProps[];
  }
);

export const marketSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    filterPrice: (state, action) => {
      const [minPrice, maxPrice] = action.payload;
      console.log("heree");
      let newCardList = [...state.originalCardList];
      newCardList = newCardList.filter((item) => item.price >= minPrice);
      newCardList = newCardList.filter((item) => item.price <= maxPrice);

      state.cardList = newCardList;
    },
    saveCriteria: (state, action) => {
      const sortCriteria = action.payload;
      state.criteria = sortCriteria;
    },
    sortCategory: (state, action) => {
      const category = action.payload;

      let newCardList = [...state.originalCardList];

      if (category === "All") {
        newCardList = [...state.originalCardList];
      } else {
        newCardList = newCardList.filter((card) => card.category === category);
      }

      state.cardList = newCardList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cardList = action.payload;
        state.originalCardList = action.payload;
        state.loading = false;
      })
      .addCase(getCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchWithMultiCriteria.fulfilled, (state, action) => {
        state.cardList = action.payload;
        state.originalCardList = action.payload;

        state.loading = false;
      })
      .addCase(searchWithMultiCriteria.pending, (state) => {
        state.loading = true;
      });
  },
});
export const { filterPrice, sortCategory, saveCriteria } = marketSlice.actions;
export default marketSlice.reducer;
