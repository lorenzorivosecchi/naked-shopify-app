/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Header
// ====================================================

export interface Header_shop {
  __typename: "Shop";
  /**
   * The shop's name.
   */
  name: string;
}

export interface Header {
  /**
   * Returns a Shop resource corresponding to access token used in request.
   */
  shop: Header_shop;
}
