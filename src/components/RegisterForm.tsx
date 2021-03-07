import { MutationFunction } from "@apollo/client";
import React from "react";
import { Form, Input, Error } from "src/lib/easy-form";
import Submit from "src/lib/easy-form/Submit";
import useAuthContext from "src/utils/hooks/useAuthContext";
import { Register, RegisterVariables } from "./__generated__/Register";

export interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Props {
  /** Helper function that fires when form gets submitted */
  onSubmit: (
    /** The values that the user submitted */
    values: RegisterFormValues,
    /** A wrapper over the mutation function */
    mutate: MutationFunction<Register, RegisterVariables>
  ) => void;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const { register } = useAuthContext();

  const handleSubmit = (values: RegisterFormValues) => {
    // Prepare mutation for execution.
    const mutate = () =>
      register({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    onSubmit(values, mutate);
  };

  return (
    <Form<RegisterFormValues> label="Create account" onSubmit={handleSubmit}>
      {({ register, getValues, formState: { errors } }) => (
        <>
          <Input
            name="email"
            label="Email"
            ref={register({ required: true })}
          />
          {errors.email?.type === "required" && (
            <Error>Please provide an email</Error>
          )}
          <Input
            name="password"
            label="Password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password?.type === "required" && (
            <Error>Please provide a password</Error>
          )}
          <Input
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            ref={register({
              required: true,
              validate: (value) => value === getValues("password"),
            })}
          />
          {errors.passwordConfirmation?.type === "required" && (
            <Error>Please confirm your password</Error>
          )}
          {errors.passwordConfirmation?.type === "validate" && (
            <Error>Passwords don't match</Error>
          )}
          <Submit />
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
