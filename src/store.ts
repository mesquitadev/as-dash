import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/services/apiSlice';
import selectedRowsReducer from '@/features/selectedRowsSlice';
import selectedTenantReducer from '@/features/selectedTenantSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedRows: selectedRowsReducer,
    selectedTenant: selectedTenantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
