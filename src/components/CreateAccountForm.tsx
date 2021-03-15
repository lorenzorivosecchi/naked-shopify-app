import React, { useState } from "react";
import { Form, Input, Error } from "src/lib/easy-form";
import Submit from "src/lib/easy-form/Submit";
import useAuthContext from "src/utils/hooks/useAuthContext";
import { CreateAccount } from "./__generated__/CreateAccount";

export interface CreateAccountFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

type CustomerUserErrors = CreateAccount["customerCreate"]["customerUserErrors"];

interface Props {
  onSuccess: () => void;
}

const CreateAccountForm: React.FC<Props> = ({ onSuccess }) => {
  const { createAccount } = useAuthContext();

  const [serverErrors, setServerErrors] = useState<CustomerUserErrors>();

  const handleSubmit = async (values: CreateAccountFormValues) => {
    const result = await createAccount({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    const customerUserErrors = result?.data?.customerCreate?.customerUserErrors;

    // Check if there were user errors in the request.
    if (customerUserErrors?.length > 0) {
      // Save list of server error messages into the component state.
      setServerErrors(customerUserErrors);
    } else {
      onSuccess();
    }
  };

  return (
    <Form<CreateAccountFormValues>
      label="Create account"
      onSubmit={handleSubmit}
    >
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

export default CreateAccountForm;
