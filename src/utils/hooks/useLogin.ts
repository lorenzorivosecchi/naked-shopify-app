import {
  MutationHookOptions,
  MutationOptions,
  useMutation,
} from "@apollo/client";
import { localStorageKeys } from "../constants";
import { LOGIN } from "../mutations/Login";
import { CreateAccount } from "../mutations/__generated__/CreateAccount";
import { Login, LoginVariables } from "../mutations/__generated__/Login";

export const onCustomerTokenCreated = <TData extends Login>(data: TData) => {
  const token = data?.customerAccessTokenCreate?.customerAccessToken;

  if (typeof token === "object") {
    localStorage.setItem(localStorageKeys.CUSTOMER_TOKEN, token.accessToken);
    localStorage.setItem(
      localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT,
      token.expiresAt
    );
  }
};

function useLogin(options?: MutationHookOptions<Login, LoginVariables>) {
  return useMutation<Login, LoginVariables>(LOGIN, {
    ...options,
    onCompleted: onCustomerTokenCreated,
    update: (cache) => cache.reset(),
  });
}

export default useLogin;
