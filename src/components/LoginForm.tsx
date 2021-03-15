import React, { useState } from "react";
import { Form, Input, Error, Submit } from "src/lib/easy-form";
import useAuthContext from "src/utils/hooks/useAuthContext";
import { Login } from "./__generated__/Login";

export interface LoginFormValues {
  email: string;
  password: string;
}

// An array of mutation errors.
// I Don't know why a CustomerUserError type isn't exported from schema by apollo CLI.
type CustomerUserErrors = Login["customerAccessTokenCreate"]["customerUserErrors"];

interface Props {
  /** A callback function that gets fired when mutation is succesful. */
  onSuccess: () => void;
}

/**
 * A complete login form. It handles input validation and dispatches mutation.
 * When mutation is successfull it executes the onSuccess callback.
 */
const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { login } = useAuthContext();
  const [serverErrors, setServerErrors] = useState<CustomerUserErrors>();

  const handleSubmit = async (values: LoginFormValues) => {
    const result = await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    const customerUserErrors =
      result.data?.customerAccessTokenCreate?.customerUserErrors;

    // Check if there were user errors in the request.
    if (customerUserErrors?.length > 0) {
      // Save list of server error messages into the component state.
      setServerErrors(customerUserErrors);
    } else {
      onSuccess();
    }
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
          {/* Log a list of server errors if there are any */}
          {serverErrors?.map((error, index) => (
            <Error key={index}>
              [{error.code}] {error.message}
            </Error>
          ))}
        </>
      )}
    </Form>
  );
};

export default LoginForm;
