import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
