import { createSlice } from '@reduxjs/toolkit';

export const sorterSlice = createSlice({
  name: 'sorter',
  initialState: {
    value: null,
  },
  reducers: {
    sorterCheapest: (state) => {
      state.value = 'cheapest';
      console.log(state.value);
    },
    sorterFastest: (state) => {
      state.value = 'fastest';
    },
    sorterOptimal: (state) => {
      state.value = 'optimal';
    },
  },
});

export const { sorterCheapest, sorterFastest, sorterOptimal } = sorterSlice.actions;

export default sorterSlice.reducer;
