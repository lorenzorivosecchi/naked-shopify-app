import React from "react";
import Form, { Input, Error } from "./Form";

interface FormValues {
  email: string;
  password: string;
}

export default function NewLoginForm() {
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ register, formState: { errors } }) => (
        <>
          <Input name="email" ref={register({ required: true })} />
          {errors.email?.type === "required" && (
            <Error>Please provide your email</Error>
          )}
          <Input name="password" ref={register({ required: true })} />
          {errors.password?.type === "required" && (
            <Error>Please provide your password</Error>
          )}
          <Input type="submit" />
        </>
      )}
    </Form>
  );
}
