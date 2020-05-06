import { IBasicUser } from './user.interface';

export interface IComment {
  author: IBasicUser;
  dateCreated: string;
  content: string;
}
