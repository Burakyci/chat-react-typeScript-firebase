import { IOperationResult } from "../models/commonModel";
import { UserModel } from "../models/userModel";
import { ChatModel, IChatModel } from "../models/chatModel";

export interface ILoginSignupType {
  error: any;
  loading: boolean;
}

export interface IInitialStateAuthType {
  user: any;
  login: ILoginSignupType;
  signup: ILoginSignupType;
}

export interface IInitialUserType {
  userList: {
    data: IOperationResult<UserModel[]> | undefined | null;
    loading: boolean;
    error: string | undefined;
  };
}

export interface IUserData {
  firstName: string;
  lastName: string;
  id: string;
  online: boolean | undefined;
}

export interface IUserSignupType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserLoginType {
  email: string;
  password: string;
}

export interface IInitialStateChatType {
  createRoomId: {
    loading: boolean;
    newChatId: string | undefined;
    error: null | string;
  };
  roomsData: {
    loading: boolean;
    roomsData: undefined | IOperationResult<IChatRoomData>;
    error: null | string;
  };
  sendMessageData: {
    loading: boolean;
    message: undefined | ChatModel;
    error: null | string;
  };
  userGetId: {
    loading: boolean;
    roomIds: undefined | IOperationResult<any>;
    error: null | string;
  };
}

export interface IICreateRoomParam {
  to: string;
  from: string;
}

export interface IISendMessageParam {
  to: string | undefined;
  from: string;
  roomId: string | undefined;
  message: string;
}

export interface IChatRoomData {
  chatId: string;
  members: string[];
  messages: IChatModel[] | undefined;
}
