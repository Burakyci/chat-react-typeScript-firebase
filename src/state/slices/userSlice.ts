import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";
import { IInitialUserType } from "../../types";

export const getUserList = createAsyncThunk(
  "user/userList",
  async (_, thunkApi) => {
    const res = await UserService.getUsers({});

    if (!res.success) {
      thunkApi.rejectWithValue(res.message);
    }
    return res.data;
  }
);

const initialState: IInitialUserType = {
  userList: {
    data: [],
    loading: true,
    error: undefined,
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.userList.data = action.payload;
    },
    isOnline: (state, action) => {
      state.userList.data = action.payload;
    },
  },
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

export const { updateUsers } = userSlice.actions;

export default userSlice.reducer;
