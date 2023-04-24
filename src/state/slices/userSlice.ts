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
export const getAnotherUser = createAsyncThunk(
  "user/getAnotherUser",
  async (userId: string, thunkApi) => {
    const res = await UserService.getUser(userId);
    if (!res.success) {
      thunkApi.rejectWithValue(res.message);
    }
    return res.data;
  }
);
export const getMyProfile = createAsyncThunk(
  "user/getMyProfile",
  async (userId: string, thunkApi) => {
    const res = await UserService.getUser(userId);
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
  anotherUser: {
    data: undefined,
    loading: true,
    error: undefined,
  },
  myProfile: {
    data: undefined,
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
    builder
      .addCase(getAnotherUser.pending, (state) => {
        state.anotherUser.loading = true;
      })
      .addCase(getAnotherUser.fulfilled, (state, action) => {
        state.anotherUser.loading = false;
        state.anotherUser.error = undefined;
        state.anotherUser.data = action.payload;
      })
      .addCase(getAnotherUser.rejected, (state, action) => {
        state.anotherUser.loading = false;
        state.anotherUser.error = action.payload as string;
      });
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.myProfile.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.myProfile.loading = false;
        state.myProfile.error = undefined;
        state.myProfile.data = action.payload;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.myProfile.loading = false;
        state.myProfile.error = action.payload as string;
      });
  },
});

export const { updateUsers } = userSlice.actions;

export default userSlice.reducer;
