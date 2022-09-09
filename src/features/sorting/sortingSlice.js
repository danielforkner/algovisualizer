import { createSlice } from '@reduxjs/toolkit';

const grid = [];
for (let i = 0; i < 50; i++) {
  grid.push(Math.floor(Math.random() * 100));
}

const initialState = {
  grid,
  sorting: false,
  size: 50,
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
    setSize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { refreshGrid, toggleSorting, setSorting, setSize } =
  sortingSlice.actions;

export default sortingSlice.reducer;
