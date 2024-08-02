import { gql } from "apollo-server-express";
import { PersonResolvers, PersonTypeDefs } from "./person";
import { SeedResolvers, SeedTypeDefs } from "./seed";
import { CommentResolvers, CommentTypeDefs } from "./comment";

const RootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const resolvers = [SeedResolvers, PersonResolvers, CommentResolvers];
export const typeDefs = [
  RootTypeDefs,
  PersonTypeDefs,
  SeedTypeDefs,
  CommentTypeDefs,
];
