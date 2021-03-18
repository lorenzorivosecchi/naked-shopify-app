import { ApolloProvider } from "@apollo/client";
import type { AppProps /*, AppContext */ } from "next/app";
import { client } from "src/utils/apolloClient";
import Header from "src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
