/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: homepage
// ====================================================

export interface homepage_shop {
  __typename: "Shop";
  /**
   * The shop's name.
   */
  name: string;
}

export interface homepage {
  /**
   * Returns a Shop resource corresponding to access token used in request.
   */
  shop: homepage_shop;
}
