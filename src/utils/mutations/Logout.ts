import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation Logout($accessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $accessToken) {
      deletedAccessToken
    }
  }
`;
