/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Product
// ====================================================

export interface Product_productByHandle {
  __typename: "Product";
  /**
   * The product’s title.
   */
  title: string;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: any;
}

export interface Product {
  /**
   * Find a product by its handle.
   */
  productByHandle: Product_productByHandle | null;
}

export interface ProductVariables {
  handle: string;
}
