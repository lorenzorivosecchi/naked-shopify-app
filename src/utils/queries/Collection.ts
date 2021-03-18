import { gql } from "@apollo/client";

export const COLLECTION = gql`
  query Collection(
    $handle: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    collectionByHandle(handle: $handle) {
      title
      descriptionHtml
      products(first: $first, after: $after, last: $last, before: $before) {
        edges {
          cursor
          node {
            handle
            title
            descriptionHtml
          }
        }
      }
    }
  }
`;
