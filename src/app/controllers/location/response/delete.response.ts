export interface IDeleteLocationResponse {
  id: string;
  city: string;
  state: {
    id: string;
    name: string;
  };
}
