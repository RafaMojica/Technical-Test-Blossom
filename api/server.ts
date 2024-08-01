import express from "express";
import cors from "cors";
import db from "./config/db/index";
import models from "./models";

models;
const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());

db.sync({ force: false })
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });
