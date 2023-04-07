import { IOperationResult } from "../models/commonModel";
export interface ILoginSignupType {
  error: any;
  loading: boolean;
}

export interface IInitialStateAuthType {
  initUser: { user: any; loading: boolean };
  login: ILoginSignupType;
  signup: ILoginSignupType;
}

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
