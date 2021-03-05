import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Form, Input, Error } from "src/lib/easy-form";
import Submit from "src/lib/easy-form/Submit";

export interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Props {
  onSubmit: SubmitHandler<RegisterFormValues>;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Form<RegisterFormValues> label="Create account" onSubmit={onSubmit}>
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
