import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/api'
})

export function query(request: string): Promise<object>{
  return client.query({
    query: gql`${request}`,
  })  
}