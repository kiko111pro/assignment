import { configureStore } from '@reduxjs/toolkit';
import data from '../features/data/data.reducer';
export const store = configureStore({
  reducer: {
    data,
  },
});
