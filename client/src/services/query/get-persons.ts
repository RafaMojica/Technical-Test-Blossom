import { gql } from "@apollo/client";

export const GET_PERSONS = gql`
  query GetPersons {
    GetPersons {
      id
      name
      species
      image
      like
    }
  }
`;
