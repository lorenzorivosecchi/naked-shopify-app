import { ApolloClient, InMemoryCache } from "@apollo/client";

// Exposed through `next.config.js`.
const { shopifyStorefrontApiURL, shopifyStorefrontApiToken } = process.env;

export const client = new ApolloClient({
  uri: shopifyStorefrontApiURL,
  headers: {
    "X-Shopify-Storefront-Access-Token": shopifyStorefrontApiToken,
  },
  cache: new InMemoryCache(),
});
