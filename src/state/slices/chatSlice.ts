import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IICreateRoomParam,
  IISendMessageParam,
  IInitialStateChatType,
} from "../../types";
import chatService from "../../services/chatService";

const initialState: IInitialStateChatType = {
  createRoomId: {
    loading: true,
    newChatId: undefined,
    error: null,
  },
  roomsData: {
    loading: true,
    data: undefined,
    error: null,
  },
  sendMessageData: {
    loading: true,
    message: undefined,
    error: null,
  },
};
export const getRoomData = createAsyncThunk(
  "chatSlice/getRoomData",
  async (userId: string, thunkApi) => {
    const res = await chatService.getChatRoom(userId);
    if (res.success) return res.data;
    thunkApi.rejectWithValue(res.message);
  }
);
export const createRoom = createAsyncThunk(
  "auth/createRoom",
  async (values: IICreateRoomParam, thunkApi: any) => {
    try {
      const createRoom = await chatService.createRoom(values.to, values.from);
      return createRoom.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "auth/sendMessage",
  async (values: IISendMessageParam, thunkApi: any) => {
    try {
      const { from, message, roomId } = values;
      const sendMessage = await chatService.sendMessage(from, roomId, message);
      return sendMessage.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    updateRoomsData: (state, action) => {
      state.roomsData.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.createRoomId.loading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createRoomId.loading = false;
        state.createRoomId.error = null;
        state.createRoomId.newChatId = action.payload;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.createRoomId.loading = false;
        state.createRoomId.error = action.payload as string;
      });
    builder
      .addCase(getRoomData.pending, (state) => {
        state.roomsData.loading = true;
      })
      .addCase(getRoomData.fulfilled, (state, action) => {
        state.roomsData.loading = false;
        state.roomsData.error = null;
        state.roomsData.data = action.payload;
      })
      .addCase(getRoomData.rejected, (state, action) => {
        state.roomsData.loading = false;
        state.roomsData.error = action.payload as string;
      });

    builder
      .addCase(sendMessage.pending, (state) => {
        state.sendMessageData.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendMessageData.loading = false;
        state.sendMessageData.error = null;
        state.sendMessageData.message = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendMessageData.loading = false;
        state.sendMessageData.error = action.payload as string;
      });
  },
});

export const { updateRoomsData } = chatSlice.actions;
export default chatSlice.reducer;
