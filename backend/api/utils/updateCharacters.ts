import axios from "axios";
import Persons from "../models/Person.model";
import db from "../config/db";

export async function updateCharacters() {
  try {
    const randomPage = Math.floor(Math.random() * 6);

    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${randomPage}`
    );
    const characters = response.data.results.slice(0, 15);

    await Persons.destroy({ where: {}, truncate: true });
    await db.query("ALTER SEQUENCE persons_id_seq RESTART WITH 1");

    for (const character of characters) {
      await Persons.create({
        name: character.name,
        species: character.species,
        image: character.image,
        gender: character.gender,
        status: character.status,
        like: false,
      });
    }
    console.log("Characters updated");
  } catch (error) {
    console.error("Error updating characters:", error);
  }
}
