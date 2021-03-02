/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopName
// ====================================================

export interface ShopName_shop {
  __typename: "Shop";
  /**
   * The shop’s name.
   */
  name: string;
}

export interface ShopName {
  /**
   * The shop associated with the storefront access token.
   */
  shop: ShopName_shop;
}
