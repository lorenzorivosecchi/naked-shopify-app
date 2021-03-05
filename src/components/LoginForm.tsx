import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Form, Input, Error } from "src/lib/easy-form";
import Submit from "src/lib/easy-form/Submit";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: SubmitHandler<FormValues>;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Form<FormValues> label="Login" onSubmit={onSubmit}>
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
          <Submit />
        </>
      )}
    </Form>
  );
};

export default LoginForm;
