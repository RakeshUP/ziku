/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: otokens
// ====================================================

export interface otokens_otokens_strikeAsset {
  __typename: "ERC20";
  id: string;
  symbol: string;
  decimals: number;
}

export interface otokens_otokens_underlyingAsset {
  __typename: "ERC20";
  id: string;
  symbol: string;
  decimals: number;
}

export interface otokens_otokens_collateralAsset {
  __typename: "ERC20";
  id: string;
  symbol: string;
  decimals: number;
}

export interface otokens_otokens {
  __typename: "OToken";
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  strikeAsset: otokens_otokens_strikeAsset;
  underlyingAsset: otokens_otokens_underlyingAsset;
  collateralAsset: otokens_otokens_collateralAsset;
  strikePrice: any;
  isPut: boolean;
  expiryTimestamp: any;
  implementation: any;
}

export interface otokens {
  otokens: otokens_otokens[];
}

export interface otokensVariables {
  expiry: any;
}
