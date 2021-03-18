import { gql } from "@apollo/client";

export const PRODUCT = gql`
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      title
      descriptionHtml
    }
  }
`;
