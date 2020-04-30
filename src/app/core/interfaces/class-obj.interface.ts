import { UsersModuleState } from '@modules/users/store';
import { Store } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store/src/selector';

export interface IBadgeClassObj {
  small: boolean;
  big: boolean;
}

export interface IDialogData {
  header: string;
  caption: string;
  classToApply: string;
  onAcceptCallback: (store: Store, id?: string) => {};
  isCurrent?: boolean;
  select?: MemoizedSelector<UsersModuleState, boolean>;
  id?: string;
}
