import { IUser } from '@core/interfaces/user.interface';

export interface IComment {
  author: IUser;
  dateCreated: Date;
  content: string;
}
