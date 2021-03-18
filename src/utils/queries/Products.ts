import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products($first: Int, $after: String, $last: Int, $before: String) {
    products(first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          title
          descriptionHtml
          handle
        }
      }
    }
  }
`;
