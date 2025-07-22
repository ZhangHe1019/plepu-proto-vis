// src/features/data/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  values: [10, 20, 30],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { updateData } = dataSlice.actions;
export default dataSlice.reducer;

