import { DataTypes, Model } from "sequelize";
import db from "../config/db";

class Comments extends Model {}

Comments.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "comments" }
);

export default Comments;
