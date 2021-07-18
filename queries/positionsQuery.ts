import { gql } from "@apollo/client"

export const POSITIONS_QUERY = gql`
  query positions ($account: ID!) {
    account(id: $account) {
      balances {
        token {
          id
          name
          symbol
          decimals
          underlyingAsset {
            id
            symbol
            decimals
          }
          strikePrice
          expiryTimestamp
          isPut
        }
        balance
      }
    }
  }
`
export default POSITIONS_QUERY;
