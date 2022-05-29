import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IBreadcrumbsStateItem } from './interfaces';

const initialState: IBreadcrumbsStateItem[] = [
  {
    link: "",
    name: 'Home',
    filters: {},
    currentPage: 0,
  }
];

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    pushBreadcrumb: (state, action: PayloadAction<IBreadcrumbsStateItem>) => {
      state.push(action.payload);
    },
    resetBreadcrumb: (state, action?: PayloadAction<IBreadcrumbsStateItem>) => {
      state.splice(1);
      if (action) {
        state.push(action.payload);
      }
    },
    sliceBreadcrumb: (state, action: PayloadAction<number>) => {
      state.splice(-action.payload);
    },
    setFilters: (state, action: any) => {
      state[state.length - 1].filters = action.payload;
      state[state.length - 1].currentPage = 0;
    },
    setCurrentPage: (state, action: any) => {
      state[state.length - 1].currentPage = action.payload;
    },
  },
});

export const { pushBreadcrumb, resetBreadcrumb, setFilters, sliceBreadcrumb, setCurrentPage } = breadcrumbsSlice.actions;
export const selectBreadcrumbs = (state: RootState) => state.breadcrumbs;
export const selectFilters = (state: RootState) => state.breadcrumbs[state.breadcrumbs.length - 1].filters || {};

export default breadcrumbsSlice.reducer;
