import { NextPage } from "next";
import RegisterForm from "src/components/RegisterForm";

const Register: NextPage<{}> = () => {
  return (
    <>
      <RegisterForm onSubmit={() => alert("Welcome")} />
    </>
  );
};

export default Register;
