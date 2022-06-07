export interface IGetVacancyItemResponse {
  id: string;
  education: string;
  experience: string;
  commonRate: number;
  specialist: {
    id: string;
    firstName: string;
    lastName: string;
    photoLink: string;
  };
  scope: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    title: string;
  }
}

export type IGetVacanciesResponse = IGetVacancyItemResponse[];
