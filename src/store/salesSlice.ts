import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesState {
  data: any[];
}

const initialState: SalesState = {
  data: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = salesSlice.actions;
export default salesSlice.reducer;