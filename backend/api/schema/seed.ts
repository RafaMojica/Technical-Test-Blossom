import axios from "axios";
import Persons from "../models/Person.model";
import { Person } from "../types/person.types";
import { gql } from "apollo-server-express";

export const SeedTypeDefs = gql`
  type Mutation {
    seedDatabase: [Person!]!
  }
`;

export const SeedResolvers = {
  Mutation: {
    seedDatabase: async () => {
      try {
        const count = await Persons.count();
        if (count > 0) {
          throw new Error("Database is already seeded");
        }

        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character",
          {
            params: { page: 1 },
          }
        );

        const characters = data.results.slice(0, 15);

        const seedData = characters.map((character: Person) => ({
          name: character.name,
          species: character.species,
          image: character.image,
          gender: character.gender,
          status: character.status,
          like: false,
        }));

        const createdPersons = await Persons.bulkCreate(seedData, {
          returning: true,
        });
        return createdPersons;
      } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
      }
    },
  },
};
