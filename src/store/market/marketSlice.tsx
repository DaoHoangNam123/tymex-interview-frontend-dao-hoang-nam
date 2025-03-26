import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CardProps, SearchProps } from "@/type/common";
import {
  getNFTCards,
  getNFTCardsWithCriteria,
  getNFTCardsWithSingleCriteria,
} from "@/services/marketService";

const SLICE_NAME = "market";

type MarketProps = {
  cardList: CardProps[];
  originalCardList: CardProps[];
  loading: boolean;
};
const initialState: MarketProps = {
  cardList: [],
  originalCardList: [],
  loading: true,
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
  SearchProps
>(
  SLICE_NAME + "/searchNFTCardsWithCriteria",
  async (params: SearchProps): Promise<CardProps[]> => {
    const response = await getNFTCardsWithSingleCriteria(params);

    return response as CardProps[];
  }
);

export const marketSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    filterPrice: (state, action) => {
      const [minPrice, maxPrice] = action.payload;

      let newCardList = [...state.originalCardList];
      newCardList = newCardList.filter((item) => item.price >= minPrice);
      newCardList = newCardList.filter((item) => item.price <= maxPrice);

      state.cardList = newCardList;
    },
    sortPrice: (state, action) => {
      const sortCriteria = action.payload;

      let newCardList = [...state.cardList];
      newCardList = newCardList.sort(
        (a, b) => sortCriteria * (b.price - a.price)
      );

      state.cardList = newCardList;
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
export const { filterPrice, sortPrice, sortCategory } = marketSlice.actions;
export default marketSlice.reducer;
