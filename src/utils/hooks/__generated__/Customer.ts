/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Customer
// ====================================================

export interface Customer_customer {
  __typename: "Customer";
  /**
   * The customer’s name, email or phone number.
   */
  displayName: string;
}

export interface Customer {
  /**
   * Find a customer by its access token.
   */
  customer: Customer_customer | null;
}

export interface CustomerVariables {
  accessToken: string;
}
