import { IUserData } from "../types/IInitialUserType";

export class UserModel implements IUserData {
  id = "";
  firstName = "";
  lastName = "";
  constructor(data: IUserData) {
    Object.assign(this, { ...data });
  }
}
