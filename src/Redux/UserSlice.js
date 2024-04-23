import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loginUser: null,
  profileUser: null,
  friendRequests: null,
  requestList: null,
};

//create a slice i.e. a state which will be changed. state has their own name, initial state and function which change their state
const UserSlice = createSlice({
  name: "user",
  initialState,
  //function which change the state of user
  reducers: {
    //at time of login, user will be changed
    login(state, action) {
      state.loginUser = action.payload;
    },
    //at time of logout, user will be changed
    logout(state) {
      state.loginUser = null;
      state.profileUser = null;
    },
    //at time of update profile,user will be changed
    updateProfile(state, action) {
      state.loginUser = action.payload;
    },
    visitProfile(state, action) {
      state.profileUser = action.payload;
    },
    setFriendRequests(state, action) {
      state.friendRequests = action.payload;
    },
    setRequestList(state, action) {
      state.requestList = action.payload;
    },
  },
});
//export actions and reducers
export const {
  login,
  logout,
  updateProfile,
  visitProfile,
  setFriendRequests,
  setRequestList,
} = UserSlice.actions;
export default UserSlice.reducer;
