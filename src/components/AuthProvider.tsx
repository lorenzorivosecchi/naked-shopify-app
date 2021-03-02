import { gql, useMutation } from "@apollo/client";
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

const AuthProvider: React.FC<{}> = () => {
  const [login] = useMutation<Login>(LOGIN);
  const [logout] = useMutation<Logout>(LOGOUT);
  const [register] = useMutation<Register>(REGISTER);

  return null;
};

export default AuthProvider;
