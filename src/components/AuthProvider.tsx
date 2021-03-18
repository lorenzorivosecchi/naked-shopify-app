import { ApolloCache, gql, useMutation } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "src/utils/context/auth";
import { LOGIN } from "src/utils/mutations/Login";
import { LOGOUT } from "src/utils/mutations/Logout";
import { Login, LoginVariables } from "src/utils/mutations/__generated__/Login";
import {
  Logout,
  LogoutVariables,
} from "src/utils/mutations/__generated__/Logout";
import {
  CreateAccount,
  CreateAccountVariables,
} from "src/utils/mutations/__generated__/CreateAccount";
import { localStorageKeys } from "src/utils/constants";
import { CREATE_ACCOUNT } from "src/utils/mutations/CreateAccount";

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
    const accessToken = localStorage.getItem(localStorageKeys.CUSTOMER_TOKEN);
    const expiresAt = localStorage.getItem(
      localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT
    );

    // Verify that token is present and not expired
    if (accessToken && expiresAt && new Date() < new Date(expiresAt)) {
      setAccessToken(accessToken);
      setExpiresAt(expiresAt);
    }
  }, []);

  // Watches accessToken and expiresAt and updates localStorage counterparts.
  useEffect(() => {
    accessToken
      ? localStorage.setItem(localStorageKeys.CUSTOMER_TOKEN, accessToken)
      : localStorage.removeItem(localStorageKeys.CUSTOMER_TOKEN);
    expiresAt
      ? localStorage.setItem(
          localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT,
          expiresAt
        )
      : localStorage.removeItem(localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT);
  }, [accessToken, expiresAt]);

  /** Resets the cache.
   *  Called when auth state changes.
   * @see https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
   */
  const onAuthStateChange = (cache: ApolloCache<{}>) => {
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
