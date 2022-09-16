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
    barColor: 'rgba(0, 0, 0, 1)',
    pointerColor: 'green',
    completeColor: 'blue',
    selectedColor: 'orange',
    sortedColor: 'aqua',
    pointerColor_i: 'green',
    pointerColor_j: 'darkgreen',
    minimumColor: 'red',
  },
  active: ['insertion', 'selection', 'bubble', 'merge', 'quick'],
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
    updateActive: (state, action) => {
      state.active = action.payload;
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
  updateActive,
} = sortingSlice.actions;

export default sortingSlice.reducer;
