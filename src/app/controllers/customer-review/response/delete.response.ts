export interface IDeleteCustomerReviewResponse {
  id: string;
  description: string;
  rate: number;
  vacancy: {
    id: string;
    category: {
      title: string;
    };
  };
  specialist: {
    id: string;
    firstName: string;
    lastName: string;
    photoLink: string;
  };
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
