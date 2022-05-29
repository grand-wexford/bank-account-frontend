import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/TransactionsSlice';
import cardsReducer from '../features/cards/CardsSlice';
import breadcrumbsReducer from '../features/breadcrumbs/BreadcrumbsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    cards: cardsReducer,
    breadcrumbs: breadcrumbsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
