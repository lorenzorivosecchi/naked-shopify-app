import { ReactNode } from "react";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { IMocks, IMockStore, addMocksToSchema } from "@graphql-tools/mock";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { buildClientSchema, printSchema } from "graphql";
import introspectionResult from "schema.json";

interface Props {
  children: ReactNode;
  resolvers?: (store?: IMockStore) => Record<string, unknown>;
}

/**
 * mocks data automatically using an introspection schema
 * @see https://www.youtube.com/watch?v=FKA5iNYpd_8&t=43s
 */
const AutoMockedProvider: React.FC<Props> = (props) => {
  const { children, resolvers } = props;

  // Convert JSON schema into Schema Definition Language
  const schemaDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any })
  );

  // Make schema "executable"
  const schema = makeExecutableSchema({
    typeDefs: schemaDL,
    resolverValidationOptions: {
      requireResolversForResolveType: "ignore",
    },
  });

  // Provide custom values for scalars and types
  const mocks: IMocks = {
    DateTime: () => "2019-07-03T20:47:55Z",
  };

  // Apply mock resolvers to executable schema
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
    resolvers,
  });

  // Define ApolloClient (client variable used below)
  const client = new ApolloClient({
    link: new SchemaLink({ schema: mockedSchema }),
    cache: new InMemoryCache(),
  });

  // Return ApolloProvider
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AutoMockedProvider;
