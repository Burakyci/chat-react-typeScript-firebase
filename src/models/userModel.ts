import { IUserData } from "../types/IInitialStateType";

export class UserModel implements IUserData {
  id = "";
  firstName = "";
  lastName = "";
  constructor(data: IUserData) {
    Object.assign(this, { ...data });
  }
}
