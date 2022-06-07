import { Statuses } from '@app/interfaces';

export interface IGetOrderItemResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  status: Statuses,
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    photoLink: string;
  };
  vacancy: {
    id: string;
    specialist: {
      id: string;
      firstName: string;
      lastName: string;
      photoLink: string;
    }
  }
  scope: {
    id: string;
    name: string;
  }
  category: {
    id: string;
    title: string;
  }
}

export type IGetOrdersResponse = IGetOrderItemResponse[];

