import { gql } from "apollo-server-express";
import Comments from "../models/Comment.model";

export const CommentTypeDefs = gql`
  type Comment {
    id: ID!
    text: String!
    personId: ID!
  }

  type Query {
    GetCommentsPerson(personId: ID!): [Comment]
  }

  type Mutation {
    addComment(personId: ID!, text: String): Comment
  }
`;

export const CommentResolvers = {
  Query: {
    GetCommentsPerson: async (_: undefined, args: { personId: number }) => {
      try {
        const comments = await Comments.findAll({
          where: {
            personId: args.personId,
          },
        });
        return comments;
      } catch (error) {
        throw new Error("Unable to fetch comments.");
      }
    },
  },

  Mutation: {
    addComment: async (
      _: undefined,
      args: { personId: number; text: string }
    ) => {
      try {
        const comment = await Comments.create({
          personId: args.personId,
          text: args.text,
        });
        return comment;
      } catch (error) {
        console.error("Error adding comment:", error);
        throw new Error("Unable to add comment.");
      }
    },
  },
};
