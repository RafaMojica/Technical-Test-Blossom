import { DataTypes, Model } from "sequelize";
import db from "../config/db";

class Persons extends Model {}

Persons.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "persons" }
);

export default Persons;
