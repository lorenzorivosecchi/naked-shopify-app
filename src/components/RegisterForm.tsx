import React from "react";
import { Form, Input, Error } from "src/lib/easy-form";

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function RegisterForm() {
  const onSubmit = () => alert("Welcome");

  return (
    <Form<FormValues> label="Create account" onSubmit={onSubmit}>
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
            ref={register({ required: true })}
          />
          {errors.password?.type === "required" && (
            <Error>Please provide a password</Error>
          )}
          <Input
            name="passwordConfirmation"
            label="Confirm Password"
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
          <input type="submit" />
        </>
      )}
    </Form>
  );
}
