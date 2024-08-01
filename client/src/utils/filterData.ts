import { Person } from "../types/person.types";

export const filterData = (data: Person[], searchTerm: string) => {
  return data.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
