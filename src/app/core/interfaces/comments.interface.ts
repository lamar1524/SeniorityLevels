import { IBasicUser } from '@core/interfaces/user.interface';

export interface IComment {
  author: IBasicUser;
  dateCreated: string;
  content: string;
}
