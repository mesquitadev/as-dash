import { companiesApiSlice } from '@/features/companiesApiSlice';
import { materialsApiSlice } from '@/features/materialsApiSlice';
import selectedRowsReducer from '@/features/selectedRowsSlice';
import { stockApiSlice } from '@/features/stockApiSlice';
import { apiSlice } from '@/services/apiSlice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userStockApiSlice } from './features/userStocksApiSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  companies: companiesApiSlice.reducer,
  materials: materialsApiSlice.reducer,
  stocks: stockApiSlice.reducer,
  userStocks: userStockApiSlice.reducer,
  rowSelection: selectedRowsReducer,
});

export const setupStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
