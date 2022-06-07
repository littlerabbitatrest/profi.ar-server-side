export interface ISpecialistResponse {
  id: string;
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  vacancies: {
    id: string;
    category: {
      id: string;
      title: string;
    };
  }[];
  location: {
    id: string;
    city: string;
    state: {
      name: string;
    }
  };
}
