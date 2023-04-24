import { IOperationResult } from "../models/commonModel";
import { UserModel } from "../models/userModel";
import { MessageModel, IMessageModel, RoomModel } from "../models/chatModel";

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
    data: UserModel[] | undefined;
    loading: boolean;
    error: string | undefined;
  };
  anotherUser: {
    data: IUserData | undefined;
    loading: boolean;
    error: string | undefined;
  };
  myProfile: {
    data: IUserData | undefined;
    loading: boolean;
    error: string | undefined;
  };
}

export interface IUserData {
  firstName: string;
  lastName: string;
  id: string;
  online: boolean | undefined;
  profilePhoto: string;
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
    data: undefined | RoomModel[];
    error: null | string;
  };
  sendMessageData: {
    loading: boolean;
    message: undefined | MessageModel;
    error: null | string;
  };
}

export interface IICreateRoomParam {
  to: string;
  from: string;
}

export interface IISendMessageParam {
  from: string;
  roomId: string | undefined;
  message: string;
}
export interface IMembers {
  id: string;
  name: string;
  lastName: string;
}

export interface IRoomData {
  chatId?: string;
  members?: string[];
  membersName?: string[];
  messages?: IRoomData[];
}
export interface IPropsRoomListToMessageList {
  room: number;
}
