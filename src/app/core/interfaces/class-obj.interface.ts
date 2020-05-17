import { Observable } from 'rxjs';

export interface IBadgeClassObj {
  small: boolean;
  big: boolean;
}

export interface IDialogData {
  header: string;
  caption: string;
  classToApply: string;
  onAcceptCallback: () => {};
  select?: () => Observable<any>;
}
