import { gql } from "@apollo/client";

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout {
    checkoutCreate(input: { lineItems: [] }) {
      checkout {
        id
      }
    }
  }
`;
