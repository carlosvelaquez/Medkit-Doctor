import * as Realm from "realm-web";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const app = new Realm.App({ id: "medkit-cxpjw" });

export const useDatabase = () =>
  app.currentUser.mongoClient("mongodb-atlas").db("dev");

export const gqlClient = new ApolloClient({
  uri: "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/medkit-cxpjw/graphql",
  cache: new InMemoryCache(),
});

export default app;
