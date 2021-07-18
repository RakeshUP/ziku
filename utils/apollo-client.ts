import { ApolloClient, InMemoryCache } from '@apollo/client'

const mainnet = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-mainnet',
  cache: new InMemoryCache(),
})

const ropsten = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-ropsten',
  cache: new InMemoryCache(),
})

const client = {
  1: mainnet,
  3: ropsten,
}

export default client;
