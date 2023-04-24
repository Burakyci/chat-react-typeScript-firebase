import { Timestamp } from "firebase/firestore";
import { IRoomData } from "../types";

export interface IMessageModel {
  date?: Timestamp;
  message?: string;
  fromUserId: string | undefined;
  read: boolean;
}

export class MessageModel implements IMessageModel {
  date? = Timestamp.now();
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
export class RoomModel implements IRoomData {
  chatId = "";
  members = [];
  membersName = [];
  messages = [];
  constructor(id: string, data: IRoomData) {
    this.chatId = id;
    if (data) {
      Object.assign(this, { ...data });
    }
  }
}
