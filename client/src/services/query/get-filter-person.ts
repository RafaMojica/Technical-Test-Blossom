import { gql } from "@apollo/client";

export const GET_FILTER_PERSON = gql`
  query GetFilterPerson($species: String, $gender: String, $status: String) {
    GetFilterPerson(species: $species, gender: $gender, status: $status) {
      id
      name
      species
      image
      like
    }
  }
`;
