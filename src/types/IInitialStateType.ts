export interface ILoginSignupType {
  error: any;
  loading: boolean;
}

export interface IInitialStateAuthType {
  initUser: { user: any; loading: boolean };
  login: ILoginSignupType;
  signup: ILoginSignupType;
}
