export interface IUser {
  key: string;
  values: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
export interface ILinkedUser extends IUser {
  profileLink: string;
}
