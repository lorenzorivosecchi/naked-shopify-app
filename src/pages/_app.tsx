import { ApolloProvider } from "@apollo/client";
import type { AppProps /*, AppContext */ } from "next/app";
import AuthProvider from "src/components/AuthProvider";
import Header from "../components/Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Exposed through `next.config.js`.
const { shopifyStorefrontApiURL, shopifyStorefrontApiToken } = process.env;

const client = new ApolloClient({
  uri: shopifyStorefrontApiURL,
  headers: {
    "X-Shopify-Storefront-Access-Token": shopifyStorefrontApiToken,
  },
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
