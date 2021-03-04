import React from "react";
import { Form, Input, Error } from "src/lib/easy-form";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const onSubmit = () => console.log("Welcome");

  return (
    <Form<FormValues> onSubmit={onSubmit}>
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
          <Input name="password" ref={register({ required: true })} />
          {errors.password?.type === "required" && (
            <Error>Please provide your password</Error>
          )}
          <input type="submit" />
        </>
      )}
    </Form>
  );
}
