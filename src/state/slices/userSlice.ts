import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";
import { IInitialUserType } from "../../types";

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
    data: null,
    loading: true,
    error: undefined,
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
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList.loading = false;
        state.userList.error = undefined;
        state.userList.data = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload as string;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
