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
        <label>Email</label>
        <input name="email" ref={register({ required: true })} />
        {errors.email?.type === "required" && "Please enter your email"}
      </div>
      <div>
        <label>Password</label>
        <input name="password" ref={register({ required: true })} />
        {errors.email && <span>{errors.email}</span>}
        {errors.email?.type === "required" && "Please enter your password"}
      </div>
    </form>
  );
};

export default LoginForm;
