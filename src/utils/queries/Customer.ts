import { gql } from "@apollo/client";

export const CUSTOMER = gql`
  query Customer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      displayName
    }
  }
`;
