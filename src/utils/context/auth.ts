import { LazyQueryResult, MutationFunction } from "@apollo/client";
import React from "react";
import {
  CustomerName,
  CustomerNameVariables,
} from "src/components/__generated__/CustomerName";
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
  customer?: LazyQueryResult<
    CustomerName,
    CustomerNameVariables
  >["data"]["customer"];
}

export const AuthContext = React.createContext<AuthContextValue>({});
