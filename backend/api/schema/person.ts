import { gql } from "apollo-server-express";
import Persons from "../models/Person.model";

export const PersonTypeDefs = gql`
  type Person {
    id: ID!
    name: String!
    species: String!
    image: String!
    gender: String!
    status: String!
    like: Boolean!
  }

  type Query {
    GetPersons: [Person!]
    GetDetailPerson(id: ID!): Person
  }

  type Mutation {
    ToggleLike(id: ID!): Person
  }
`;

export const PersonResolvers = {
  Query: {
    GetPersons: async () => {
      try {
        const persons = await Persons.findAll();
        return persons;
      } catch (error) {
        throw new Error(`Error getting persons`);
      }
    },
    GetDetailPerson: async (_: undefined, args: { id: number }) => {
      try {
        const persons = await Persons.findByPk(args.id);
        return persons;
      } catch (error) {
        throw new Error(`Error getting persons`);
      }
    },
  },

  Mutation: {
    ToggleLike: async (_: undefined, args: { id: number }) => {
      try {
        const person = await Persons.findByPk(args.id);
        if (!person) {
          throw new Error(`Person with not found`);
        }
        const newLikeValue = !person.dataValues.like;

        await Persons.update(
          { like: newLikeValue },
          {
            where: { id: args.id },
          }
        );

        const updatedPerson = await Persons.findByPk(args.id);
        return updatedPerson;
      } catch (error) {
        throw new Error(`Error toggling like`);
      }
    },
  },
};
