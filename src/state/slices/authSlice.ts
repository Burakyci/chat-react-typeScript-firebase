import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialStateAuthType } from "../../types";
import AuthService from "../../services/authService";
import userService from "../../services/userService";
import { IUserLoginType, IUserSignupType } from "../../types/";
import { fireAuth } from "../../config/FirebaseConfig";

const initialState: IInitialStateAuthType = {
  user: null,
  login: {
    loading: false,
    error: null,
  },
  signup: {
    loading: false,
    error: null,
  },
};

export const appLogin = createAsyncThunk(
  "auth/appLogin",
  async (values: IUserLoginType, thunkApi) => {
    const loginResult = await AuthService.login(values.email, values.password);
    if (!loginResult.success || !loginResult.data)
      return thunkApi.rejectWithValue(loginResult.message);
    const activeUserId = fireAuth.currentUser?.uid;
    if (!activeUserId) return;
    await userService.isItOnline(activeUserId, true);
    return loginResult.data;
  }
);
export const appSignup = createAsyncThunk(
  "auth/appSignup",
  async (values: IUserSignupType, thunkApi) => {
    const signupResult = await AuthService.signup(
      values.email,
      values.password
    );
    if (!signupResult.success) {
      thunkApi.rejectWithValue(signupResult.message);
    }
    const user = await userService.initialUser(
      values.firstName,
      values.lastName,
      fireAuth.currentUser?.uid
    );
    if (!user.success) {
      thunkApi.rejectWithValue(signupResult.message);
    }
    const activeUserId = fireAuth.currentUser?.uid;
    if (!activeUserId) return;
    const res = await userService.isItOnline(activeUserId, true);
    if (!res.success) {
      thunkApi.rejectWithValue(res.message);
    }
    return signupResult.data;
  }
);
export const appLogout = createAsyncThunk(
  "auth/appLogout",
  async (_, { rejectWithValue }) => {
    const activeUserId = fireAuth.currentUser?.uid;
    if (!activeUserId) return;
    await userService.isItOnline(activeUserId, false);
    const res = await AuthService.logout();
    if (!res.success) {
      rejectWithValue(res.message);
    }
    return null;
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authInit: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appLogin.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(appLogin.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.error = null;
        state.user = action.payload;
      })
      .addCase(appLogin.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      });
    builder.addCase(appLogout.fulfilled, (state) => {
      state.user = null;
    });
    builder
      .addCase(appSignup.pending, (state) => {
        state.signup.loading = true;
        state.signup.error = null;
      })
      .addCase(appSignup.fulfilled, (state, action) => {
        state.signup.loading = false;
        state.signup.error = null;
        state.user = action.payload;
      })
      .addCase(appSignup.rejected, (state, action) => {
        state.signup.loading = false;
        state.signup.error = action.payload;
      });
  },
});

export const { authInit } = authSlice.actions;

export default authSlice.reducer;
