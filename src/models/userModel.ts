import { IUserData } from "../types";

export class UserModel implements IUserData {
  id = "";
  firstName = "";
  lastName = "";
  online: undefined;
  constructor(data: IUserData) {
    Object.assign(this, { ...data });
  }
}
