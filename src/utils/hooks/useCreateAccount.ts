import { MutationHookOptions, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "../mutations/CreateAccount";
import {
  CreateAccount,
  CreateAccountVariables,
} from "../mutations/__generated__/CreateAccount";
import { onCustomerTokenCreated } from "./useLogin";

function useCreateAccount(
  options: MutationHookOptions<CreateAccount, CreateAccountVariables> = {}
) {
  return useMutation<CreateAccount, CreateAccountVariables>(CREATE_ACCOUNT, {
    ...options,
    onCompleted: (data) => onCustomerTokenCreated<CreateAccount>(data),
    update: (cache) => cache.reset(),
  });
}

export default useCreateAccount;
