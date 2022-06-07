export interface IGetVacancyReviewItemResponse {
  id: string;
  rate: number;
  description: string;
  vacancy: {
    id: string;
    specialist: {
      id: string;
      firstName: string;
      lastName: string;
      photoLink: string;
    };
    category: {
      id: string;
      title: string;
    };
  };
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export type IGetVacancyReviewsResponse = IGetVacancyReviewItemResponse[];
