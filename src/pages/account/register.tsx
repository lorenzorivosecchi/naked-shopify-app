import { NextPage } from "next";
import useAuthContext from "src/utils/hooks/useAuthContext";
import RegisterForm, { RegisterFormValues } from "src/components/RegisterForm";
import Link from "next/link";

const Register: NextPage<{}> = () => {
  const { register } = useAuthContext();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await register({
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
      <h1>Register</h1>
      <RegisterForm onSubmit={onSubmit} />
      <Link href="/account/login">
        <a>I already have an account</a>
      </Link>
    </>
  );
};

export default Register;
