import { gql } from "@apollo/client";

export const GET_DETAIL_PERSON = gql`
  query GetDetailPerson($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      image
    }
  }
`;
