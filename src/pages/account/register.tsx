import { NextPage } from "next";
import useAuthContext from "src/utils/hooks/useAuthContext";
import RegisterForm, { RegisterFormValues } from "src/components/RegisterForm";
import Link from "next/link";

const Register: NextPage<{}> = () => {
  const { register } = useAuthContext();

  const onSubmit = (values: RegisterFormValues) => {
    try {
      register({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSubmit={onSubmit} />
      <Link href="/account/register">
        <a>I already have an account</a>
      </Link>
    </>
  );
};

export default Register;
