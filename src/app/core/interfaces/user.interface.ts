export interface IUserValues {
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface IUser {
  key: string;
  values: IUserValues;
}

export interface IUserRegisterData extends IUserValues {
  password: string;
}

export interface IBasicUser {
  email: string;
  uid: string;
  isAdmin: boolean;
}
