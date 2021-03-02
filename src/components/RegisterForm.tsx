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
        <label>Email</label>
        <input name="email" ref={register({ required: true })} />
        {errors.email?.type === "required" && "Please enter your email"}
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true })}
        />
        {errors.email?.type === "required" && "Please enter your password"}
      </div>
      <div>
        <label>Confirm password</label>
        <input
          name="passwordConfirmation"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
        {errors.email?.type === "required" && "Please confirm your password"}
        {errors.email?.type === "validate" && "Passwords don't match"}
      </div>
    </form>
  );
};

export default RegisterForm;
