import { ApolloServer } from "@saeris/apollo-server-vercel";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import dbConnection from "@/util/dbConnection";

dbConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

export default server.createHandler();
