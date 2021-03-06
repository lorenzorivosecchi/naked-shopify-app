import { ApolloProvider } from "@apollo/client";
import type { AppProps /*, AppContext */ } from "next/app";
import AuthProvider from "src/components/AuthProvider";
import { client } from "src/utils/apolloClient";
import Header from "src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
