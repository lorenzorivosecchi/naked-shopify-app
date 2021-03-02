/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: header
// ====================================================

export interface header_shop {
  __typename: "Shop";
  /**
   * The shop's name.
   */
  name: string;
}

export interface header {
  /**
   * Returns a Shop resource corresponding to access token used in request.
   */
  shop: header_shop;
}
