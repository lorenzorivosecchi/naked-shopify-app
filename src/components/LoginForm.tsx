import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<{}> = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = (data) => console.log(data);

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
