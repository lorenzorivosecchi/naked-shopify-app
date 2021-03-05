import { ApolloProvider } from "@apollo/client";
import type { AppProps /*, AppContext */ } from "next/app";
import AuthProvider from "src/components/AuthProvider";
import Header from "../components/Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const storeName = process.env.NEXT_PUBLIC_SHOPIFY_STORE;
const publicAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: `https://${storeName}.myshopify.com/api/2021-01/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token": publicAccessToken,
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
