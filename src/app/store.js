import { configureStore } from '@reduxjs/toolkit';
import sortingReducer from '../features/sorting/sortingSlice';

export const store = configureStore({
  reducer: {
    sorting: sortingReducer,
  },
});
