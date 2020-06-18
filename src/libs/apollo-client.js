import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

const authorizationLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('Token');

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authorizationLink.concat(httpLink),
  cache,
});


export default client;