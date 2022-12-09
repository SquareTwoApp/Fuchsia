import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  fetchOptions: { fetch },
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  credentials: 'include'
});
 
const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link,
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})