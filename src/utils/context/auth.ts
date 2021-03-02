import { MutationFunction } from "@apollo/client";
import React from "react";
import { Login, LoginVariables } from "src/components/__generated__/Login";
import { Logout } from "src/components/__generated__/Logout";
import {
  Register,
  RegisterVariables,
} from "src/components/__generated__/Register";

interface AuthContextValue {
  login?: MutationFunction<Login, LoginVariables>;
  logout?: MutationFunction<Logout>;
  register?: MutationFunction<Register, RegisterVariables>;
}

export const AuthContext = React.createContext<AuthContextValue>({});
