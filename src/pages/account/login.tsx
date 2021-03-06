import { NextPage } from "next";
import LoginForm, { LoginFormValues } from "src/components/LoginForm";
import Link from "next/link";
import useAuthContext from "src/utils/hooks/useAuthContext";

const Login: NextPage<{}> = () => {
  const { login } = useAuthContext();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      if (result.errors) {
        const errors = result.errors.flatMap((error) => error.message);
        throw new Error(errors.join("\n"));
      }
      alert(`Welcome`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
      <Link href="/account/register">
        <a>I don't have an account</a>
      </Link>
    </>
  );
};

export default Login;
