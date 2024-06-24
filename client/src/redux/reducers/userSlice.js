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
  },
});

export const { LoadUserRequest, LoadUserSuccess, LoadUserFail } =
  userSlice.actions;

export default userSlice.reducer;
