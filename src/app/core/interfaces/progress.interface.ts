export interface ISeniority {
  junior: string | number;
  middle: string | number;
  senior: string | number;
}

export interface ISubCategoryProgress {
  title: string;
  levels: ISeniority;
}

export interface ICategoryProgress {
  title: string;
  subCategories: ISubCategoryProgress[];
}
