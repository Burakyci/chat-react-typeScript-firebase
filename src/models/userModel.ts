import { IUserData } from "../types";

export class UserModel implements IUserData {
  id = "";
  firstName = "";
  lastName = "";
  online: undefined;
  profilePhoto =
    "https://firebasestorage.googleapis.com/v0/b/chat-3b279.appspot.com/o/images%2FprofileImages%2FdefaultPhoto.jpg?alt=media&token=e60611b5-597f-4f46-a53d-dfc8ad826019";
  constructor(data: IUserData) {
    Object.assign(this, { ...data });
  }
}
