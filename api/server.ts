import express from "express";
import cors from "cors";
import db from "./config/db";
/* eslint-disable @typescript-eslint/no-unused-vars */
import models from "./models";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());

db.sync({ force: false }).then(() => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`);
  });
});
