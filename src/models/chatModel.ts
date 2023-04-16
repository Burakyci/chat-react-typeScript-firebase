import { IChatRoomData } from "../types";

export interface IMessageModel {
  date?: any;
  message?: string;
  fromUserId: string | undefined;
  read: boolean;
}

export class MessageModel implements IMessageModel {
  date? = Date.now();
  message = "";
  fromUserId = "";
  read = false;
  constructor(params?: IMessageModel) {
    Object.assign(this, params);
  }
  toJSON(): IMessageModel {
    return {
      date: this.date,
      message: this.message,
      fromUserId: this.fromUserId,
      read: this.read,
    };
  }
}
export class RoomModel implements IChatRoomData {
  chatId = "";
  members = [];
  messages = [];
  constructor(id: string, data?: IChatRoomData) {
    this.chatId = id;
    if (data) {
      Object.assign(this, { ...data });
    }
  }
}
