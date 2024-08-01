import express from "express";
import cors from "cors";
import db from "./config/db";
import models from "./models";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

models;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

async function startApolloServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.sync({ force: false }).then(() => {
    console.log("DB Connected");
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
