/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_customerAccessTokenDelete {
  __typename: "CustomerAccessTokenDeletePayload";
  /**
   * The destroyed access token.
   */
  deletedAccessToken: string | null;
}

export interface Logout {
  /**
   * Permanently destroys a customer access token.
   */
  customerAccessTokenDelete: Logout_customerAccessTokenDelete | null;
}

export interface LogoutVariables {
  accessToken: string;
}
