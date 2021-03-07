import { NextPage } from "next";
import LoginForm from "src/components/LoginForm";
import Link from "next/link";
import useRedirect from "src/utils/hooks/useRedirect";

const Login: NextPage<{}> = () => {
  const redirect = useRedirect();

  return (
    <>
      <h1>Login</h1>
      <LoginForm
        onSubmit={async (_, mutate) => {
          try {
            const result = await mutate();
            // Redirect if mutation was successful
            if (result.data) {
              redirect();
            }
          } catch (err) {
            alert(err.message);
          }
        }}
      />
      <Link href="/account/register">
        <a>I don't have an account</a>
      </Link>
    </>
  );
};

export default Login;
