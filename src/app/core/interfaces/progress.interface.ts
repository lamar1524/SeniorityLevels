export interface ISeniority {
  junior: string;
  middle: string;
  senior: string;
}
export interface ISubCategoryProgress {
  title: string;
  levels: ISeniority;
}
export interface IProgressCategory {
  title: string;
  subCategories: ISubCategoryProgress[];
}
