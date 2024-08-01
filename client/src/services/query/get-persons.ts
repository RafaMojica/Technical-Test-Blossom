import { gql } from "@apollo/client";

export const GET_PERSONS = gql`
  query GetPersons {
    characters {
      results {
        id
        name
        species
        image
        gender
        status
      }
    }
  }
`;
