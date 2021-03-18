/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_products_edges_node {
  __typename: "Product";
  /**
   * The product’s title.
   */
  title: string;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: any;
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
}

export interface Products_products_edges {
  __typename: "ProductEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of ProductEdge.
   */
  node: Products_products_edges_node;
}

export interface Products_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: Products_products_edges[];
}

export interface Products {
  /**
   * List of the shop’s products.
   */
  products: Products_products;
}

export interface ProductsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
