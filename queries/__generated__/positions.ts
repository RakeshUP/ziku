/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: positions
// ====================================================

export interface positions_account_balances_token_underlyingAsset {
  __typename: "ERC20";
  id: string;
  symbol: string;
  decimals: number;
}

export interface positions_account_balances_token {
  __typename: "OToken";
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  underlyingAsset: positions_account_balances_token_underlyingAsset;
  strikePrice: any;
  expiryTimestamp: any;
  isPut: boolean;
}

export interface positions_account_balances {
  __typename: "AccountBalance";
  token: positions_account_balances_token;
  balance: any;
}

export interface positions_account {
  __typename: "Account";
  /**
   * Balances
   */
  balances: positions_account_balances[];
}

export interface positions {
  account: positions_account | null;
}

export interface positionsVariables {
  account: string;
}
