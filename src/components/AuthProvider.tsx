import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { ReactNode } from "react";
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

/** Stores customer access token and expiration date into localStorage */
const onAccessTokenCreated = (
  result: Login_customerAccessTokenCreate | Register_customerAccessTokenCreate
) => {
  const { accessToken, expiresAt } = result.customerAccessToken;
  localStorage.setItem("CUSTOMER_TOKEN", accessToken);
  localStorage.setItem("CUSTOMER_TOKEN_EXPIRES_AT", expiresAt);
};

/** Removes customer access token and expiration date from localStorage */
const onAccessTokenDeleted = () => {
  localStorage.removeItem("CUSTOMER_TOKEN");
  localStorage.removeItem("CUSTOMER_TOKEN_EXPIRES_AT");
};

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [_, { data }] = useLazyQuery<CustomerName>(CUSTOMER_NAME);
  const customer = data?.customer || null;

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

  return (
    <AuthContext.Provider value={{ login, logout, register, customer }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
