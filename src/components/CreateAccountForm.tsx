import { Form, Input, Error } from "src/lib/easy-form";
import Submit from "src/lib/easy-form/Submit";
import useCreateAccount from "src/utils/hooks/useCreateAccount";

export interface CreateAccountFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Props {
  onSuccess: () => void;
}

const CreateAccountForm: React.FC<Props> = ({ onSuccess }) => {
  const [createAccount, { data }] = useCreateAccount();

  const handleSubmit = async (values: CreateAccountFormValues) => {
    await createAccount({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    onSuccess();
  };

  const serverErrors = [
    ...(data?.customerAccessTokenCreate?.customerUserErrors || []),
    ...(data?.customerCreate?.customerUserErrors || []),
  ];

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
          {serverErrors.map((error, index) => (
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
