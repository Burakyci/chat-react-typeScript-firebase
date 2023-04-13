export interface IChatModel {
  date?: any;
  message?: string;
  toUserId: string | undefined;
  fromUser: string;
  read: boolean;
}

export class ChatModel implements IChatModel {
  date? = Date.now();
  message = "";
  toUserId = "";
  fromUser = "";
  read = false;
  constructor(params?: IChatModel) {
    Object.assign(this, params);
  }
  toJSON(): IChatModel {
    return {
      date: this.date,
      message: this.message,
      toUserId: this.toUserId,
      fromUser: this.fromUser,
      read: this.read,
    };
  }
}
