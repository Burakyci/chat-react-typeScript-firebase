import { IOperationResult } from "../models/commonModel";

export interface IInitialUserType {
  userList: {
    user: IOperationResult<[]> | undefined | null;
    loading: boolean;
    error: null;
  };
}
export interface IUserData {
  firstName: string;
  lastName: string;
  id: string;
}
