import { MutationHookOptions, useMutation } from "@apollo/client";
import { localStorageKeys } from "../constants";
import { LOGOUT } from "../mutations/Logout";
import { Logout, LogoutVariables } from "../mutations/__generated__/Logout";

export const onCustomerTokenDeleted = <TData extends Logout>(_data: TData) => {
  localStorage.removeItem(localStorageKeys.CUSTOMER_TOKEN);
  localStorage.removeItem(localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT);
};

function useLogout(options?: MutationHookOptions<Logout, LogoutVariables>) {
  return useMutation<Logout, LogoutVariables>(LOGOUT, {
    ...options,
    onCompleted: onCustomerTokenDeleted,
    update: (cache) => cache.reset(),
  });
}

export default useLogout;
