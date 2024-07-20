import {createSlice} from '@reduxjs/toolkit';

import axios from 'axios';


const initialState = {
  groups:null,
  isLoading: false, 
  error: null,
  groupData: null,
  groupID:null 

};

const GroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    startAuth(state) {
      state.isLoading = true;
      state.error = null;
    },
    completeAuth(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    failAuth(state, action) {
      state.isLoading = false;
      state.error = action.payload; 
    },
    clearError(state) {
      state.error = null;
    },
    setGroups(state,action){
        state.groups=action.payload;
    },
    setGroupData(state, action) {
      state.groupData= action.payload;
    },
    setError(state,action){
        state.error = action.payload;
    },
    setGroupID(state,action){
        state.groupID = action.payload;
    }
  },
});

export const {startAuth, completeAuth, failAuth, clearError, setGroupData,setError,setGroups,setGroupID} =
GroupSlice.actions;

export const getgroups = () => async dispatch =>{
    try{    
        dispatch(startAuth());
        let userData = await sessionStorage.getItem('GrowID');
        userData = JSON.parse(userData);
        const URL = 'api/getGroup'
        const response = await axios.post(URL,{memberId:userData._id})
        const result = await response.data;
        console.log("Response:", result);
    
        if (result.success) {
          dispatch(setGroups(result.data));
          dispatch(completeAuth());
        } else {
          console.error("Failed to retrieve group IDs:", result.error);
        }
    }catch(error)
    {
        if(error.response.statusCode===500)
        {
            dispatch(setError(error.response.data))
        }
    }
}

export const getGroupsData = (groupID)=>async dispatch =>{
    dispatch(startAuth());
    try {
        dispatch(setGroupID(groupID))
        const URL = '/api/getGroupData';

        const response = await axios.post(URL,{GroupID:groupID});
        if(response.data.statusCode===200)
        {
            dispatch(setGroupData(response.data.data));
            dispatch(completeAuth());
            return response.data;
        }
    } catch (error) {
        if(error.response.statusCode===400){
            dispatch(setError("unable to retrived Data"));
            return error.response;
        }
    }
}
export default GroupSlice.reducer;
