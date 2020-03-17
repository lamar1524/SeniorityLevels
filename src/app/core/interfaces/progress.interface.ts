export interface ISeniority {
  junior: string;
  middle: string;
  senior: string;
}
export interface ISubCategoryProgress {
  title: string;
  levels: ISeniority;
}
export interface ICategoryProgress {
  title: string;
  subCategories: ISubCategoryProgress[];
}

export interface ISeniorityLevels {
  junior: boolean;
  middle: boolean;
  senior: boolean;
}
