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
    roomsData: undefined,
    error: null,
  },
  sendMessageData: {
    loading: true,
    message: undefined,
    error: null,
  },
  userGetId: {
    loading: true,
    roomIds: undefined,
    error: null,
  },
};
export const createRoom = createAsyncThunk(
  "auth/createRoom",
  async (values: IICreateRoomParam, thunkApi: any) => {
    try {
      const createRoom = await chatService.createRoom(values.to, values.from);
      return createRoom;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getRoom = createAsyncThunk(
  "auth/getRoom",
  async (chatId: string, thunkApi: any) => {
    try {
      const getRoom = await chatService.getRoom(chatId);
      return getRoom;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "auth/sendMessage",
  async (values: IISendMessageParam, thunkApi: any) => {
    try {
      const { from, to, message, roomId } = values;
      const sendMessage = await chatService.sendMessage(
        to,
        from,
        roomId,
        message
      );
      return sendMessage;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getRoomIds = createAsyncThunk(
  "auth/userGetRoomId",
  async (userId: string, thunkApi: any) => {
    try {
      const userGetRoomId = await chatService.getRoomIds(userId);
      return userGetRoomId;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
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
      .addCase(getRoom.pending, (state) => {
        state.roomsData.loading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.roomsData.loading = false;
        state.roomsData.error = null;
        state.roomsData.roomsData = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
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
    builder
      .addCase(getRoomIds.pending, (state) => {
        state.userGetId.loading = true;
      })
      .addCase(getRoomIds.fulfilled, (state, action) => {
        state.userGetId.loading = false;
        state.userGetId.error = null;
        state.userGetId.roomIds = action.payload;
      })
      .addCase(getRoomIds.rejected, (state, action) => {
        state.userGetId.loading = false;
        state.userGetId.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;
// export const {} = chatSlice.actions;
