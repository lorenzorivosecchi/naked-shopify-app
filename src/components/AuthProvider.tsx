import { gql, useMutation, useQuery } from "@apollo/client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthContext } from "src/utils/context/auth";
import { CustomerName } from "./__generated__/CustomerName";
import { Login, Login_customerAccessTokenCreate } from "./__generated__/Login";
import { Logout } from "./__generated__/Logout";
import {
  Register,
  Register_customerAccessTokenCreate,
} from "./__generated__/Register";

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

const AuthProvider: React.FC<Props> = ({ children }) => {
  // Keep track of old token and its expiration date.
  const [oldToken, setOldToken] = useState<string>();
  const [oldTokenHasExpired, setOldTokenHasExpired] = useState<boolean>();

  // Checks inside localStorage for token and expiration date.
  useEffect(() => {
    const token = localStorage.getItem("CUSTOMER_TOKEN");
    const tokenExpiresAt = localStorage.getItem("CUSTOMER_TOKEN_EXPIRES_AT");

    // Set token or null in case there isn't one.
    setOldToken(token);

    if (tokenExpiresAt) {
      const hasExpired = new Date() > new Date(tokenExpiresAt);
      setOldTokenHasExpired(hasExpired);
    }
  }, []);

  // - Runs customer query if old credentials are valid.
  // - Exposes function to refetch data after a mutation.
  const { data: customerQueryData, refetch } = useQuery<CustomerName>(
    CUSTOMER_NAME,
    {
      // Skip initial query in case token doesn't exist or it has expired.
      skip: !oldToken || oldTokenHasExpired,
      variables: {
        token: oldToken,
      },
    }
  );

  /** Stores customer access token and expiration date into localStorage */
  const onAccessTokenCreated = (
    result: Login_customerAccessTokenCreate | Register_customerAccessTokenCreate
  ) => {
    const { accessToken, expiresAt } = result.customerAccessToken;
    localStorage.setItem("CUSTOMER_TOKEN", accessToken);
    localStorage.setItem("CUSTOMER_TOKEN_EXPIRES_AT", expiresAt);
    // Refetch customer query
    refetch({
      token: accessToken,
    });
  };

  /** Removes customer access token and expiration date from localStorage */
  const onAccessTokenDeleted = () => {
    localStorage.removeItem("CUSTOMER_TOKEN");
    localStorage.removeItem("CUSTOMER_TOKEN_EXPIRES_AT");
    // TODO: invalidate cached response for customer query
  };

  const [login] = useMutation<Login>(LOGIN, {
    onCompleted(data) {
      onAccessTokenCreated(data.customerAccessTokenCreate);
    },
  });

  const [register] = useMutation<Register>(REGISTER, {
    onCompleted(data) {
      onAccessTokenCreated(data.customerAccessTokenCreate);
    },
  });

  const [logout] = useMutation<Logout>(LOGOUT, {
    onCompleted() {
      onAccessTokenDeleted();
    },
  });

  const customer = customerQueryData?.customer || null;

  return (
    <AuthContext.Provider value={{ login, logout, register, customer }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
