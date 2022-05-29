import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchTransactions } from "./TransactionsAPI";
import { ITransactionsState, IFilters } from "./interfaces";
import { ITEMS_ON_PAGE } from "../../constants";

const initialState: ITransactionsState = {
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
    amount: {
      title: "Amount",
      values: [""]
    },
    transactionDate: {
      title: "Transaction Date",
      values: [""]
    },
    currency: {
      title: "Currency",
      values: ["", "USD", "EUR", "AZN"]
    },
  }
};

export const getTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { getState }) => {
    const { breadcrumbs }: any = getState();
    const lastBreadcrumbs = breadcrumbs[breadcrumbs.length - 1];
    const response = await fetchTransactions();
    const currentPage = lastBreadcrumbs && lastBreadcrumbs.currentPage !== undefined ? lastBreadcrumbs.currentPage : 0;
    const savedFilters = lastBreadcrumbs && lastBreadcrumbs.filters ? lastBreadcrumbs.filters : {};

    return {
      list: response.data,
      currentPage,
      savedFilters,
    };
  }
);

export const getTransactionById = createAsyncThunk(
  "transactions/fetchTransactionById",
  async (transactionID: string) => {
    const response = await fetchTransactions();
    const transaction = response.data.find(p => p.transactionID === transactionID) || null;

    return transaction;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        let list = action.payload.list;
        const currentPage = action.payload.currentPage;
        const savedFilters = action.payload.savedFilters;

        // ==> filters values
        let map: any = {
          cardID: {},
          cardAccount: {},
          amount: {},
          transactionDate: {},
        };

        for (let i = 0; i < list.length; i++) {
          map.cardID[list[i].cardID] = "";
          map.cardAccount[list[i].cardAccount] = "";
          map.amount[list[i].amount] = "";
          map.transactionDate[list[i].transactionDate] = "";
        }

        state.filters.cardID.values = ["", ...Object.keys(map.cardID)];
        state.filters.cardAccount.values = ["", ...Object.keys(map.cardAccount)];
        state.filters.amount.values = ["", ...Object.keys(map.amount)];
        state.filters.transactionDate.values = ["", ...Object.keys(map.transactionDate)];
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
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selected = action.payload;
      })
      .addCase(getTransactions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectTransactionById = (state: RootState) => state.transactions.selected;
export const selectFiltersData = (state: RootState) => state.transactions.filters;
export const selectTransactions = (state: RootState) => state.transactions;

export default transactionsSlice.reducer;
