import { NextPage } from "next";
import RegisterForm from "src/components/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/router";

const Register: NextPage<{}> = () => {
  const router = useRouter();

  return (
    <>
      <h1>Register</h1>
      <RegisterForm
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
      <Link href="/account/login">
        <a>I already have an account</a>
      </Link>
    </>
  );
};

export default Register;
