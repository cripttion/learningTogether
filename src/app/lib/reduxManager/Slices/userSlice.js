import {createSlice} from '@reduxjs/toolkit';

import axios from 'axios';


const initialState = {
  isLoading: false, 
  error: null,
  userData: null, 
};

const UserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    startAuth(state) {
      state.isLoading = true;
      state.error = null;
    },
    completeAuth(state, action) {
      state.isLoading = false;
      state.user = action.payload; 
      state.error = null;
    },
    failAuth(state, action) {
      state.isLoading = false;
      state.error = action.payload; 
    },
    clearError(state) {
      state.error = null;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const {startAuth, completeAuth, failAuth, clearError, setUserData} =
 UserSlice.actions;


export default UserSlice.reducer;
