/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerErrorCode } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAccount
// ====================================================

export interface CreateAccount_customerCreate_customer {
  __typename: "Customer";
  /**
   * A unique identifier for the customer.
   */
  id: string;
}

export interface CreateAccount_customerCreate_customerUserErrors {
  __typename: "CustomerUserError";
  /**
   * Error code to uniquely identify the error.
   */
  code: CustomerErrorCode | null;
  /**
   * Path to the input field which caused the error.
   */
  field: string[] | null;
  /**
   * The error message.
   */
  message: string;
}

export interface CreateAccount_customerCreate {
  __typename: "CustomerCreatePayload";
  /**
   * The created customer object.
   */
  customer: CreateAccount_customerCreate_customer | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  customerUserErrors: CreateAccount_customerCreate_customerUserErrors[];
}

export interface CreateAccount_customerAccessTokenCreate_customerAccessToken {
  __typename: "CustomerAccessToken";
  /**
   * The customer’s access token.
   */
  accessToken: string;
  /**
   * The date and time when the customer access token expires.
   */
  expiresAt: any;
}

export interface CreateAccount_customerAccessTokenCreate {
  __typename: "CustomerAccessTokenCreatePayload";
  /**
   * The newly created customer access token object.
   */
  customerAccessToken: CreateAccount_customerAccessTokenCreate_customerAccessToken | null;
}

export interface CreateAccount {
  /**
   * Creates a new customer.
   */
  customerCreate: CreateAccount_customerCreate | null;
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   */
  customerAccessTokenCreate: CreateAccount_customerAccessTokenCreate | null;
}

export interface CreateAccountVariables {
  email: string;
  password: string;
}
