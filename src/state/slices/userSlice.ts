import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";
import { fireAuth } from "../../config/FirebaseConfig";
import { IInitialUserType } from "../../types/IInitialStateType";

export const getUserList = createAsyncThunk(
  "user/userList",
  async (_, thunkApi) => {
    try {
      const res = await UserService.getUsers();
      return res;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: IInitialUserType = {
  userList: {
    user: null,
    loading: true,
    error: null,
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.userList.loading = true;
        state.userList.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList.loading = false;
        state.userList.error = null;
        state.userList.user = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload as any;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
