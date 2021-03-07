import { MutationFunction } from "@apollo/client";
import React from "react";
import { Login, LoginVariables } from "src/components/__generated__/Login";
import { Logout, LogoutVariables } from "src/components/__generated__/Logout";
import {
  Register,
  RegisterVariables,
} from "src/components/__generated__/Register";

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface AuthContextValue {
  login?: MutationFunction<Login, LoginVariables>;
  logout?: MutationFunction<Logout, LogoutVariables>;
  register?: MutationFunction<Register, RegisterVariables>;
  accessToken?: string;
  expiresAt?: string;
}

export const AuthContext = React.createContext<AuthContextValue>({});
