export interface IBadgeClassObj {
  small: boolean;
  big: boolean;
}

export interface IDeleteDialogData {
  id: string;
  header: string;
  caption: string;
  classToApply: string;
  isCurrent: boolean;
  onAcceptCallback: (id: string) => {};
}
