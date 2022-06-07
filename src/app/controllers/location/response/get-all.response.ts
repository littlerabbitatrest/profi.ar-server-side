export interface IGetLocationItemResponse {
  id: string;
  city: string;
  state: {
    id: string;
    name: string;
  };
}

export type IGetLocationsResponse = IGetLocationItemResponse[];

