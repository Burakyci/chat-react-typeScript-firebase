import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: "",
};

export const userSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
