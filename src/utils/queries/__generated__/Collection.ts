/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_collectionByHandle_products_edges_node {
  __typename: "Product";
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: any;
}

export interface Collection_collectionByHandle_products_edges {
  __typename: "ProductEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of ProductEdge.
   */
  node: Collection_collectionByHandle_products_edges_node;
}

export interface Collection_collectionByHandle_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: Collection_collectionByHandle_products_edges[];
}

export interface Collection_collectionByHandle {
  __typename: "Collection";
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * The description of the collection, complete with HTML formatting.
   */
  descriptionHtml: any;
  /**
   * List of products in the collection.
   */
  products: Collection_collectionByHandle_products;
}

export interface Collection {
  /**
   * Find a collection by its handle.
   */
  collectionByHandle: Collection_collectionByHandle | null;
}

export interface CollectionVariables {
  handle: string;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
