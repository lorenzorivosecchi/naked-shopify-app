import { MutationFunction } from "@apollo/client";
import React from "react";
import { Form, Input, Error, Submit } from "src/lib/easy-form";
import useAuthContext from "src/utils/hooks/useAuthContext";
import { Login, LoginVariables } from "./__generated__/Login";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  /** Helper function that fires when form gets submitted */
  onSubmit: (
    /** The values that the user submitted */
    values: LoginFormValues,
    /** A wrapper over the mutation function */
    mutate: MutationFunction<Login, LoginVariables>
  ) => void;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { login } = useAuthContext();

  const handleSubmit = (values: LoginFormValues) => {
    // Prepare mutation for execution.
    const mutate = () =>
      login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    onSubmit(values, mutate);
  };

  return (
    <Form<LoginFormValues> label="Login" onSubmit={handleSubmit}>
      {({ register, formState: { errors } }) => (
        <>
          <Input
            name="email"
            label="Email"
            ref={register({ required: true })}
          />
          {errors.email?.type === "required" && (
            <Error>Please provide your email</Error>
          )}
          <Input
            name="password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password?.type === "required" && (
            <Error>Please provide your password</Error>
          )}
          <Submit />
        </>
      )}
    </Form>
  );
};

export default LoginForm;
