# naked-shopify-app

A blueprint for building apps using Next.js and the Shopify Storefront API

## Setup

To begin building with Shopify's APIs, you need to set up a development store and a way to send API requests.

Set up a development store
If you're new to building Shopify integrations, then you need to create a Shopify Partner account and create a development store. A development store is a free Shopify account that you can use to install and test your apps. To learn more, see Creating development stores.

Steps:
Create a Partner account, if you don't already have one.
Create a development store, or log into an existing one.
Generate API credentials for a private app, and take note of the API password.

[\[...\]](https://shopify.dev/tutorials/make-your-first-graphql-request)

Then you should create a file called `.env.local` with the following content:

```shell
NEXT_APP_SHOPIFY_STORE="your store name"
NEXT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your api password"
```

> Note: this file will be excluded from version control.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
