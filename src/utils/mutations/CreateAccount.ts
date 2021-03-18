import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    customerCreate(input: { email: $email, password: $password }) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
