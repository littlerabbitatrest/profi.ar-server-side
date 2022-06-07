export interface IGetCategoryItemResponse {
  id: string,
  title: string;
  scope: {
    id: string,
    name: string
  };
}

export type IGetCategoriesResponse = IGetCategoryItemResponse[];

