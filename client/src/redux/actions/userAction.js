import axios from "axios";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
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
