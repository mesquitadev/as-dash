import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TenantState {
  tenantId: string;
}

const initialState: TenantState = {
  tenantId: '', // Inicialmente vazio
};

const selectedTenantReducer = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenantId: (state, action: PayloadAction<string>) => {
      state.tenantId = action.payload;
    },
  },
});

export const { setTenantId } = selectedTenantReducer.actions;
export const selectTenantId = (state: any) => state.tenant.tenantId; // Seleciona o tenantId do estado global
export default selectedTenantReducer.reducer;
