import { createSlice } from '@reduxjs/toolkit';

const grid = [];
for (let i = 0; i < 50; i++) {
  grid.push(Math.floor(Math.random() * 100));
}

const initialState = {
  grid,
  sorting: false,
  activeSorting: 0,
  size: 50,
  speed: 20,
  colors: {
    barColor: 'rgba(201, 203, 207, 1)',
    pointerColor: 'rgba(140, 255, 125, 1)',
    completeColor: 'rgba(140, 255, 125, 1)',
    selectedColor: 'rgba(125, 233, 140, 1)',
    sortedColor: 'rgba(140, 140, 125, 1)',
    pointerColor_i: 'rgba(140, 255, 125, 1)',
    pointerColor_j: 'rgba(140, 200, 125, 1)',
    minimumColor: 'rgba(100, 0, 0, 1)',
  },
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
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    updateActiveSorting: (state, action) => {
      state.activeSorting += action.payload;
    },
  },
});

export const {
  refreshGrid,
  toggleSorting,
  setSorting,
  setSize,
  setSpeed,
  updateActiveSorting,
} = sortingSlice.actions;

export default sortingSlice.reducer;
