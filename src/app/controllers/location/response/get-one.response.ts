export interface IGetLocationResponse {
  id: string;
  city: string;
  state: {
    id: string;
    name: string;
  };
}
