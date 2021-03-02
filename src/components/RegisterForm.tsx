import { useForm } from "react-hook-form";
import useAuthContext from "src/utils/hooks/useAuthContext";

type FormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const RegisterForm: React.FC<{}> = () => {
  const { register, handleSubmit, errors, getValues } = useForm<FormData>();

  const { register: createAccount } = useAuthContext();

  /** Sends register mutation and handles errors */
  const onSubmit = handleSubmit(async (data) => {
    try {
      createAccount({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          ref={register({ required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <span role="alert">Please enter your email</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={register({ required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <span role="alert">Please enter your password</span>
        )}
      </div>
      <div>
        <label htmlFor="passwordConfirmation">Confirm password</label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === getValues("password"),
          })}
          aria-invalid={errors.passwordConfirmation ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <span role="alert">Please confirm your password</span>
        )}
        {errors.email?.type === "validate" && (
          <span role="alert">Passwords don't match</span>
        )}
      </div>
      <input type="submit" />
    </form>
  );
};

export default RegisterForm;
