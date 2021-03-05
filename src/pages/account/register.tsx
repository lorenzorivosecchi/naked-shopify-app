import { NextPage } from "next";
import RegisterForm from "src/components/RegisterForm";
import Link from "next/link";

const Register: NextPage<{}> = () => {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSubmit={() => alert("Welcome")} />
      <Link href="/account/login">
        <a>I already have an account</a>
      </Link>
    </>
  );
};

export default Register;
