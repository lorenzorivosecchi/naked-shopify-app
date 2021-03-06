export const getStoredCredentials = () => ({
  accessToken: localStorage.getItem("CUSTOMER_TOKEN"),
  expiresAt: localStorage.getItem("CUSTOMER_TOKEN_EXPIRES_AT"),
});

/** Stores token and expiration date into localStorage */
export const storeCredentials = (token: string, expiresAt: string) => {
  localStorage.setItem("CUSTOMER_TOKEN", token);
  localStorage.setItem("CUSTOMER_TOKEN_EXPIRES_AT", expiresAt);
};

/** Deletes token and expiration date into localStorage */
export const clearCredentials = () => {
  localStorage.removeItem("CUSTOMER_TOKEN");
  localStorage.removeItem("CUSTOMER_TOKEN_EXPIRES_AT");
};
