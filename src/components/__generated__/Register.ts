/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerCreateInput, CustomerErrorCode } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_customerCreate_customer {
  __typename: "Customer";
  /**
   * A unique identifier for the customer.
   */
  id: string;
}

export interface Register_customerCreate_customerUserErrors {
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

export interface Register_customerCreate {
  __typename: "CustomerCreatePayload";
  /**
   * The created customer object.
   */
  customer: Register_customerCreate_customer | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  customerUserErrors: Register_customerCreate_customerUserErrors[];
}

export interface Register {
  /**
   * Creates a new customer.
   */
  customerCreate: Register_customerCreate | null;
}

export interface RegisterVariables {
  input: CustomerCreateInput;
}
