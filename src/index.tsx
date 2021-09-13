import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          alunos: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'GetAlunos',
                id: args?.id,
              });
            }
          }
        }
      }
    }
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
