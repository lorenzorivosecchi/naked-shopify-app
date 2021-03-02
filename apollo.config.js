const dotenv = require("dotenv");

dotenv.config({
  path: "./.env.local",
});

const shopifyStore = process.env.NEXT_APP_SHOPIFY_STORE;
const shopifyApiPassword = process.env.NEXT_APP_SHOPIFY_API_PASSWORD;

module.exports = {
  client: {
    service: {
      name: "shopify",
      url: `https://${shopifyStore}.myshopify.com/admin/api/2021-01/graphql.json`,
      headers: {
        "X-Shopify-Access-Token": shopifyApiPassword,
      },
    },
    excludes: ["./src/pages/**/*"],
  },
};
