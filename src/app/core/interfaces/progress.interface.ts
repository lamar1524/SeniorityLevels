export interface ISeniorityDescriptions {
  junior: string;
  middle: string;
  senior: string;
}

export interface ISubCategoryDescription {
  title: string;
  levels: ISeniorityDescriptions;
}

export interface ICategoryProgress {
  title: string;
  subCategories: ISubCategoryDescription[];
}

export interface ISeniorityValues {
  junior: boolean;
  middle: boolean;
  senior: boolean;
}

export interface ISeniorityCount {
  junior: number;
  middle: number;
  senior: number;
}
