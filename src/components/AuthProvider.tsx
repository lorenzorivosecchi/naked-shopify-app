import { ApolloCache, gql, useMutation } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "src/utils/context/auth";
import { Login, LoginVariables } from "./__generated__/Login";
import { Logout, LogoutVariables } from "./__generated__/Logout";
import {
  CreateAccount,
  CreateAccountVariables,
} from "./__generated__/CreateAccount";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const LOGOUT = gql`
  mutation Logout($accessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $accessToken) {
      deletedAccessToken
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    customerCreate(input: { email: $email, password: $password }) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

interface Props {
  children: ReactNode;
}

/**
 * Provides authentication state and mutations.
 */
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>();
  const [expiresAt, setExpiresAt] = useState<string | null>();

  useEffect(() => {
    // Look for credentials inside localStorage
    const accessToken = localStorage.getItem("CUSTOMER_TOKEN");
    const expiresAt = localStorage.getItem("CUSTOMER_TOKEN_EXPIRES_AT");

    // Verify that token is present and not expired
    if (accessToken && expiresAt && new Date() < new Date(expiresAt)) {
      setAccessToken(accessToken);
      setExpiresAt(expiresAt);
    }
  }, []);

  // Watches accessToken and expiresAt and updates localStorage counterparts.
  useEffect(() => {
    accessToken
      ? localStorage.setItem("CUSTOMER_TOKEN", accessToken)
      : localStorage.removeItem("CUSTOMER_TOKEN");
    expiresAt
      ? localStorage.setItem("CUSTOMER_TOKEN_EXPIRES_AT", expiresAt)
      : localStorage.removeItem("CUSTOMER_TOKEN_EXPIRES_AT");
  }, [accessToken, expiresAt]);

  /** Resets the cache.
   *  Called when auth state changes.
   * @see https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
   */
  const onAuthStateChange = (
    cache: ApolloCache<Login | CreateAccount | Logout>
  ) => {
    cache.reset();
  };

  /** Stores customer access token inside component state. */
  const storeCustomerAccessToken = (data: Login | CreateAccount) => {
    const customerAccessToken =
      data.customerAccessTokenCreate?.customerAccessToken;
    if (customerAccessToken) {
      setAccessToken(customerAccessToken.accessToken);
      setExpiresAt(customerAccessToken.expiresAt);
    }
  };

  const [login] = useMutation<Login, LoginVariables>(LOGIN, {
    update: onAuthStateChange,
    onCompleted: storeCustomerAccessToken,
  });

  const [createAccount] = useMutation<CreateAccount, CreateAccountVariables>(
    CREATE_ACCOUNT,
    {
      update: onAuthStateChange,
      onCompleted: storeCustomerAccessToken,
    }
  );

  const [logout] = useMutation<Logout, LogoutVariables>(LOGOUT, {
    variables: {
      accessToken,
    },
    update: onAuthStateChange,
    onCompleted: () => {
      setAccessToken(null);
      setExpiresAt(null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        createAccount,
        accessToken,
        expiresAt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
