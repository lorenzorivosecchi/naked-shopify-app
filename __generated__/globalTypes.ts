/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Possible error codes that could be returned by CustomerUserError.
 */
export enum CustomerErrorCode {
  ALREADY_ENABLED = "ALREADY_ENABLED",
  BAD_DOMAIN = "BAD_DOMAIN",
  BLANK = "BLANK",
  CONTAINS_HTML_TAGS = "CONTAINS_HTML_TAGS",
  CONTAINS_URL = "CONTAINS_URL",
  CUSTOMER_DISABLED = "CUSTOMER_DISABLED",
  INVALID = "INVALID",
  INVALID_MULTIPASS_REQUEST = "INVALID_MULTIPASS_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE = "PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE",
  TAKEN = "TAKEN",
  TOKEN_INVALID = "TOKEN_INVALID",
  TOO_LONG = "TOO_LONG",
  TOO_SHORT = "TOO_SHORT",
  UNIDENTIFIED_CUSTOMER = "UNIDENTIFIED_CUSTOMER",
}

/**
 * Specifies the input fields required to create a customer access token.
 */
export interface CustomerAccessTokenCreateInput {
  email: string;
  password: string;
}

/**
 * Specifies the fields required to create a new customer.
 */
export interface CustomerCreateInput {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  password: string;
  acceptsMarketing?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
