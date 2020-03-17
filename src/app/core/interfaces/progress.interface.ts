export interface ISeniority {
  junior: string | boolean;
  middle: string | boolean;
  senior: string | boolean;
}

export interface ISubCategoryProgress {
  title: string;
  levels: ISeniority;
}

export interface ICategoryProgress {
  title: string;
  subCategories: ISubCategoryProgress[];
}
