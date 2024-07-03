import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    LoadUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserRequest: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  signOutUserRequest,
  signOutUserSuccess,
  signOutUserFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
} = userSlice.actions;

export default userSlice.reducer;
