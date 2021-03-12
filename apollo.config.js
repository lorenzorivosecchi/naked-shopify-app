const dotenv = require("dotenv");

dotenv.config({
  path: "./.env.local",
});

const getShopifyEnv = () => ({
  url: process.env.SHOPIFY_STOREFRONT_API_URL,
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.SHOPIFY_STOREFRONT_API_TOKEN,
  },
});

const { url, headers } = getShopifyEnv();

module.exports = {
  client: {
    service: {
      name: "shopify",
      url,
      headers,
    },
    excludes: ["./src/pages/**/*"],
  },
};
