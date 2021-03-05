import { NextPage } from "next";
import LoginForm from "src/components/LoginForm";

const Login: NextPage<{}> = () => {
  return <LoginForm onSubmit={() => alert("Welcome")} />;
};

export default Login;
