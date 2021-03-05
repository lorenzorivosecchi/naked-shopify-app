import { NextPage } from "next";
import LoginForm from "src/components/LoginForm";
import Link from "next/link";

const Login: NextPage<{}> = () => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={() => alert("Welcome")} />
      <Link href="/account/register">
        <a>I don't have an account</a>
      </Link>
    </>
  );
};

export default Login;
