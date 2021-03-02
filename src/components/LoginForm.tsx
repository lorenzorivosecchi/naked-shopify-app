import { useForm } from "react-hook-form";
import useAuthContext from "src/utils/hooks/useAuthContext";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<{}> = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const { login } = useAuthContext();

  /** Sends login mutation and handles errors */
  const onSubmit = handleSubmit(async (data) => {
    try {
      login({
        variables: data,
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
          ref={register({ required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password?.type === "required" && (
          <span role="alert">Please enter your password</span>
        )}
      </div>
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
