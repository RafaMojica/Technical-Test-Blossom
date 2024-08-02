import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($personId: ID!, $text: String!) {
    addComment(personId: $personId, text: $text) {
      id
      text
      personId
    }
  }
`;
