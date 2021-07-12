import { gql } from "@apollo/client"

export const OPTIONS_QUERY = gql`
  query otokens ($expiry: BigInt!) {
    otokens (where: {expiryTimestamp_gt: $expiry} ) {
      id
      symbol
      name
      decimals
      strikeAsset {
        id
        symbol
        decimals
      }
      underlyingAsset {
        id
        symbol
        decimals
      }
      collateralAsset {
        id
        symbol
        decimals
      }
      strikePrice
      isPut
      expiryTimestamp
      implementation
    }
  }
`
export default OPTIONS_QUERY;
