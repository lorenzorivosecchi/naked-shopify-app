import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { ReactNode } from "react";
import { AuthContext } from "src/utils/context/auth";
import { CustomerName } from "./__generated__/CustomerName";
import { Login } from "./__generated__/Login";
import { Logout } from "./__generated__/Logout";
import { Register } from "./__generated__/Register";

const LOGIN = gql`
  mutation Login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
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
  mutation Register($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
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
  const [_, { data }] = useLazyQuery<CustomerName>(CUSTOMER_NAME);
  const customer = data?.customer || null;

  const [login] = useMutation<Login>(LOGIN);
  const [logout] = useMutation<Logout>(LOGOUT);
  const [register] = useMutation<Register>(REGISTER);

  return (
    <AuthContext.Provider value={{ login, logout, register, customer }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
