import { gql } from "@apollo/client";

export const GET_COMMENTS_PERSON = gql`
  query GetCommentsPerson($personId: ID!) {
    GetCommentsPerson(personId: $personId) {
      id
      text
      personId
    }
  }
`;
