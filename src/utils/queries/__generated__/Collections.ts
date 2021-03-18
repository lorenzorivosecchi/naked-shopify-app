/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collections
// ====================================================

export interface Collections_collections_edges_node {
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
   * A human-friendly unique string for the collection automatically generated from its title.
   * Limit of 255 characters.
   */
  handle: string;
}

export interface Collections_collections_edges {
  __typename: "CollectionEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of CollectionEdge.
   */
  node: Collections_collections_edges_node;
}

export interface Collections_collections {
  __typename: "CollectionConnection";
  /**
   * A list of edges.
   */
  edges: Collections_collections_edges[];
}

export interface Collections {
  /**
   * List of the shop’s collections.
   */
  collections: Collections_collections;
}

export interface CollectionsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
