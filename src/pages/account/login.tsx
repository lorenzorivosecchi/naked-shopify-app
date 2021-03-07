import { NextPage } from "next";
import LoginForm from "src/components/LoginForm";
import Link from "next/link";
import { useRouter } from "next/router";
import guestOnly from "src/utils/hoc/guestOnly";

const Login: NextPage<{}> = () => {
  const router = useRouter();

  return (
    <>
      <h1>Login</h1>
      <LoginForm
        onSubmit={async (_, mutate) => {
          try {
            const result = await mutate();
            // if mutation was successful
            if (result.data) {
              // Redirect to homepage
              router.push("/");
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

export default guestOnly(Login);
