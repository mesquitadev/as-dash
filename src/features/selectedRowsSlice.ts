import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedRowsState {
  selectedRows: any[];
}

const initialState: SelectedRowsState = {
  selectedRows: [],
};

const selectedRowsSlice = createSlice({
  name: 'rowSelection',
  initialState,
  reducers: {
    setRowSelection(state, action: PayloadAction<any[]>) {
      state.selectedRows = action.payload;
    },
  },
});

export const { setRowSelection } = selectedRowsSlice.actions;
export default selectedRowsSlice.reducer;
