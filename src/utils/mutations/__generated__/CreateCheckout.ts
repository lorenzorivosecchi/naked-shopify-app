/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCheckout
// ====================================================

export interface CreateCheckout_checkoutCreate_checkout {
  __typename: "Checkout";
  /**
   * Globally unique identifier.
   */
  id: string;
}

export interface CreateCheckout_checkoutCreate {
  __typename: "CheckoutCreatePayload";
  /**
   * The new checkout object.
   */
  checkout: CreateCheckout_checkoutCreate_checkout | null;
}

export interface CreateCheckout {
  /**
   * Creates a new checkout.
   */
  checkoutCreate: CreateCheckout_checkoutCreate | null;
}
