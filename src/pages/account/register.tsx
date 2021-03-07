import { NextPage } from "next";
import useRedirect from "src/utils/hooks/useRedirect";
import RegisterForm from "src/components/RegisterForm";
import Link from "next/link";

const Register: NextPage<{}> = () => {
  const redirect = useRedirect();

  return (
    <>
      <h1>Register</h1>
      <RegisterForm
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
      <Link href="/account/login">
        <a>I already have an account</a>
      </Link>
    </>
  );
};

export default Register;
