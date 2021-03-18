import { gql } from "@apollo/client";

export const COLLECTION = gql`
  query Collection($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      descriptionHtml
      products(first: 5) {
        edges {
          cursor
          node {
            handle
            title
          }
        }
      }
    }
  }
`;
