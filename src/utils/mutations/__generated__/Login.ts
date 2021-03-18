/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerErrorCode } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_customerAccessTokenCreate_customerAccessToken {
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

export interface Login_customerAccessTokenCreate_customerUserErrors {
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

export interface Login_customerAccessTokenCreate {
  __typename: "CustomerAccessTokenCreatePayload";
  /**
   * The newly created customer access token object.
   */
  customerAccessToken: Login_customerAccessTokenCreate_customerAccessToken | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  customerUserErrors: Login_customerAccessTokenCreate_customerUserErrors[];
}

export interface Login {
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   */
  customerAccessTokenCreate: Login_customerAccessTokenCreate | null;
}

export interface LoginVariables {
  email: string;
  password: string;
}
