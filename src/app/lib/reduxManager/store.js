import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlice';
import groupsSlice from './Slices/groupsSlice';

const rootReducer = combineReducers({
  user:userSlice,
  group:groupsSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
