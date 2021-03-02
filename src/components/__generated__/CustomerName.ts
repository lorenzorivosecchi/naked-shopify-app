/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerName
// ====================================================

export interface CustomerName_customer {
  __typename: "Customer";
  /**
   * The customer’s name, email or phone number.
   */
  displayName: string;
  /**
   * The customer’s first name.
   */
  firstName: string | null;
  /**
   * The customer’s last name.
   */
  lastName: string | null;
}

export interface CustomerName {
  /**
   * Find a customer by its access token.
   */
  customer: CustomerName_customer | null;
}

export interface CustomerNameVariables {
  token: string;
}
