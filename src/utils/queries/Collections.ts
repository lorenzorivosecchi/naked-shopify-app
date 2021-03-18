import { gql } from "@apollo/client";

export const COLLECTIONS = gql`
  query Collections($first: Int, $after: String, $last: Int, $before: String) {
    collections(first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          title
          descriptionHtml
        }
      }
    }
  }
`;
