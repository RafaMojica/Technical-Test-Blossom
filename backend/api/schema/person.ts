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
    allPersons: [Person!]
    person(id: ID!): Person
  }
`;

export const PersonResolvers = {
  Query: {
    allPersons: async () => {
      try {
        const persons = await Persons.findAll();
        return persons;
      } catch (error) {
        console.log(error);
        throw new Error(`Error getting persons`);
      }
    },
    person: async (_: undefined, arg: { id: number }) => {
      try {
        const persons = await Persons.findByPk(arg.id);
        return persons;
      } catch (error) {
        console.log(error);
        throw new Error(`Error getting persons`);
      }
    },
  },
};
