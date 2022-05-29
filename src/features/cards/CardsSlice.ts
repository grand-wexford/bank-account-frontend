import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchCards } from "./CardsAPI";
import { ICardsState, IFilters } from "./interfaces";
import { ITEMS_ON_PAGE } from "../../constants";

const initialState: ICardsState = {
  list: [],
  status: "idle",
  pages: 1,
  selected: null,
  filters: {
    cardID: {
      title: "Card ID",
      values: [""]
    },
    cardAccount: {
      title: "Card Account",
      values: [""]
    },
    status: {
      title: "Status",
      values: ["", "active", "blocked"]
    },
    currency: {
      title: "Currency",
      values: ["", "USD", "EUR", "AZN"]
    },
  }
};

export const getCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, { getState }) => {
    const { breadcrumbs }: any = getState();
    const lastBreadcrumbs = breadcrumbs[breadcrumbs.length - 1];
    const response = await fetchCards();
    const currentPage = lastBreadcrumbs && lastBreadcrumbs.currentPage !== undefined ? lastBreadcrumbs.currentPage : 0;
    const savedFilters = lastBreadcrumbs && lastBreadcrumbs.filters ? lastBreadcrumbs.filters : {};

    return {
      list: response.data,
      currentPage,
      savedFilters,
    };
  }
);

export const getCardById = createAsyncThunk(
  "cards/fetchCardById",
  async (cardID: string) => {
    const response = await fetchCards();
    const card = response.data.find(p => p.cardID === cardID) || null;

    return card;
  }
);

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCards.fulfilled, (state, action) => {
        let list = action.payload.list;
        const currentPage = action.payload.currentPage;
        const savedFilters = action.payload.savedFilters;

        // ==> filters values
        let map: any = {
          cardID: {},
          cardAccount: {},
          amount: {},
          cardDate: {},
        };

        for (let i = 0; i < list.length; i++) {
          map.cardID[list[i].cardID] = "";
          map.cardAccount[list[i].cardAccount] = "";
        }

        state.filters.cardID.values = ["", ...Object.keys(map.cardID)];
        state.filters.cardAccount.values = ["", ...Object.keys(map.cardAccount)];
        // <== filters values


        // ==> savedFilters
        for (let mapKey in savedFilters) {
          if (savedFilters[mapKey] !== "") {
            list = list.filter(item => item[mapKey as keyof IFilters] === savedFilters[mapKey]);
          }
        }
        // <== savedFilters

        state.pages = Math.ceil(list.length / ITEMS_ON_PAGE);
        list = list.slice(currentPage * ITEMS_ON_PAGE, currentPage * ITEMS_ON_PAGE + ITEMS_ON_PAGE);
        state.status = "idle";
        state.list = list;
      })
      .addCase(getCardById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selected = action.payload;
      })
      .addCase(getCards.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCardById = (state: RootState) => state.cards.selected;
export const selectFiltersData = (state: RootState) => state.cards.filters;
export const selectCards = (state: RootState) => state.cards;

export default cardsSlice.reducer;
