import { companiesApiSlice } from '@/features/companiesApiSlice';
import { materialsApiSlice } from '@/features/materialsApiSlice';
import selectedRowsReducer from '@/features/selectedRowsSlice';
import selectedTenantReducer from '@/features/selectedTenantSlice';
import { stockApiSlice } from '@/features/stockApiSlice';
import { apiSlice } from '@/services/apiSlice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { tenantsApiSlice } from './features/tenantsApiSlice';
import { userStockApiSlice } from './features/userStocksApiSlice';
import { indicadoresApiSlice } from '@/features/indicatorsApiSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  companies: companiesApiSlice.reducer,
  materials: materialsApiSlice.reducer,
  stocks: stockApiSlice.reducer,
  userStocks: userStockApiSlice.reducer,
  tenants: tenantsApiSlice.reducer,
  indicators: indicadoresApiSlice.reducer,
  rowSelection: selectedRowsReducer,
  selectedTenant: selectedTenantReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
