import { Form, Input, Error, Submit } from "src/lib/easy-form";
import useLogin from "src/utils/hooks/useLogin";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  /** A callback function that gets fired when mutation is succesful. */
  onSuccess: () => void;
}

/**
 * A complete login form. It handles input validation and dispatches mutation.
 * When mutation is successfull it executes the onSuccess callback.
 */
const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [login, { data }] = useLogin();

  const handleSubmit = async (values: LoginFormValues) => {
    await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  const serverErrors =
    data?.customerAccessTokenCreate?.customerUserErrors || [];

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

export default LoginForm;
