import { ApolloCache, gql, useLazyQuery, useMutation } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import {
  clearCredentials,
  getStoredCredentials,
  storeCredentials,
} from "src/utils/common";
import { AuthContext } from "src/utils/context/auth";
import { CustomerName } from "./__generated__/CustomerName";
import { Login } from "./__generated__/Login";
import { Logout } from "./__generated__/Logout";
import { Register } from "./__generated__/Register";

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
  mutation Logout($token: String!) {
    customerAccessTokenDelete(customerAccessToken: $token) {
      deletedAccessToken
    }
  }
`;

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
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

const CUSTOMER_NAME = gql`
  query CustomerName($token: String!) {
    customer(customerAccessToken: $token) {
      displayName
      firstName
      lastName
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

  const [
    fetchCustomerNameQuery,
    { data: customerNameQueryData },
  ] = useLazyQuery<CustomerName>(CUSTOMER_NAME);

  // Checks inside localStorage for token and expiration date.
  useEffect(() => {
    const { accessToken, expiresAt } = getStoredCredentials();
    setAccessToken(accessToken);

    // If token is present and not expired.
    if (accessToken && expiresAt && new Date() > new Date(expiresAt)) {
      fetchCustomerNameQuery({
        variables: {
          token: accessToken,
        },
      });
    }
  }, []);

  /** Resets the cache.
   *  Called when auth state changes.
   * @see https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
   */
  const onAuthStateChange = (cache: ApolloCache<Login | Register | Logout>) => {
    cache.reset();
  };

  /** Called after successful login or register */
  const onLoginSuccess = (data: Login | Register) => {
    const { customerAccessToken } = data.customerAccessTokenCreate;
    storeCredentials(
      customerAccessToken.accessToken,
      customerAccessToken.expiresAt
    );
    // Refetch customer name query using new token.
    fetchCustomerNameQuery({
      variables: {
        token: customerAccessToken.accessToken,
      },
    });
    // Save access token so that logout function
    // will use the correct one.
    setAccessToken(customerAccessToken.accessToken);
  };

  const [login] = useMutation<Login>(LOGIN, {
    update: onAuthStateChange,
    onCompleted: onLoginSuccess,
  });

  const [register] = useMutation<Register>(REGISTER, {
    update: onAuthStateChange,
    onCompleted: onLoginSuccess,
  });

  /** Called after successful logout */
  const onLogoutSuccess = (_: Logout) => {
    clearCredentials();
    setAccessToken(null);
  };

  const [logout] = useMutation<Logout>(LOGOUT, {
    variables: {
      // Pass token so that consumer doesn't have to.
      token: accessToken,
    },
    update: onAuthStateChange,
    onCompleted: onLogoutSuccess,
  });

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        customer: customerNameQueryData?.customer || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
