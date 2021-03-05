const dotenv = require("dotenv");

dotenv.config({
  path: "./.env.local",
});

const store = process.env.NEXT_PUBLIC_SHOPIFY_STORE;
const publicAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

module.exports = {
  client: {
    service: {
      name: "shopify",
      url: `https://${store}.myshopify.com/api/2021-01/graphql.json`,
      headers: {
        "X-Shopify-Storefront-Access-Token": publicAccessToken,
      },
    },
    excludes: ["./src/pages/**/*"],
  },
};
