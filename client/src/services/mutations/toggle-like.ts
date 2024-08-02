import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
  mutation ToggleLike($id: ID!) {
    ToggleLike(id: $id) {
      id
      name
      like
    }
  }
`;
