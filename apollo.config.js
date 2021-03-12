const dotenv = require("dotenv");

dotenv.config({
  path: "./.env.local",
});

module.exports = {
  client: {
    service: {
      name: "shopify",
      url: process.env.SHOPIFY_STOREFRONT_API_URL,
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_API_TOKEN,
      },
    },
    excludes: ["./src/pages/**/*"],
  },
};
