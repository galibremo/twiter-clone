import axios from "axios";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  signOutUserRequest,
  signOutUserSuccess,
  signOutUserFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
} from "../reducers/userSlice";
import { toast } from "react-toastify";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`/api/auth/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFail(error.response.data.message));
  }
};

export const signout = () => async (dispatch) => {
  try {
    dispatch(signOutUserRequest());
    const { data } = await axios.post(`/api/user/signout`);
    dispatch(signOutUserSuccess(data));
    toast.success(data);
  } catch (error) {
    dispatch(signOutUserFail(error.response.data.message));
    console.log(error.response.data.message);
  }
};
export const updateUserImage =
  (profileImg, coverImg, id) => async (dispatch) => {
    try {
      dispatch(updateUserInfoRequest());
      const { data } = await axios.put(
        `/api/user/update/${id}`,
        { profileImg, coverImg },
        {
          withCredentials: true,
        }
      );
      if (data.success === true) {
        dispatch(updateUserInfoSuccess(data.updatedUser));
        toast.success("User information updated successfully!");
      }
    } catch (error) {
      dispatch(updateUserInfoFail(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
