import { createSlice } from '@reduxjs/toolkit';

const grid = [];
for (let i = 0; i < 10; i++) {
  grid.push(Math.floor(Math.random() * 100));
}

const initialState = {
  grid,
  sorting: false,
};

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    refreshGrid: (state, action) => {
      state.grid = action.payload;
    },
    toggleSorting: (state) => {
      state.sorting = !state.sorting;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export const { refreshGrid, toggleSorting, setSorting } = sortingSlice.actions;

export default sortingSlice.reducer;
