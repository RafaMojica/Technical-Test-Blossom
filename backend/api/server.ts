import express from "express";
import cors from "cors";
import db from "./config/db";
import models from "./models";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema/schema";
import { requestLogger } from "./middleware/requestLogger";
import Persons from "./models";

models;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(requestLogger);

async function startApolloServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.sync({ force: false }).then(async () => {
    console.log("DB Connected");

    const count = await Persons.count();
    if (count === 0) {
      const { data } = await apolloServer.executeOperation({
        query: `mutation { seedDatabase { name species image gender status like } }`,
      });
      console.log("Seed data:", data);
      console.log("Database seeded");
    }

    app.listen(port, () => {
      console.log(
        `Server on http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  });
}

startApolloServer().catch((error) => {
  console.error("Error starting the server:", error);
});
