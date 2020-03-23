export interface IUserValues {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUser {
  key: string;
  values: IUserValues;
}

export interface ILinkedUser extends IUser {
  profileLink: string;
}
