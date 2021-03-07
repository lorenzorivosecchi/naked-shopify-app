import { MutationFunction } from "@apollo/client";
import React from "react";
import { Login, LoginVariables } from "src/components/__generated__/Login";
import { Logout, LogoutVariables } from "src/components/__generated__/Logout";
import {
  CreateAccount,
  CreateAccountVariables,
} from "src/components/__generated__/CreateAccount";

interface AuthContextValue {
  login?: MutationFunction<Login, LoginVariables>;
  logout?: MutationFunction<Logout, LogoutVariables>;
  createAccount?: MutationFunction<CreateAccount, CreateAccountVariables>;
  accessToken?: string;
  expiresAt?: string;
}

export const AuthContext = React.createContext<AuthContextValue>({});
