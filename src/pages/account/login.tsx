import { NextPage } from "next";
import LoginForm from "src/components/LoginForm";

const Login: NextPage<{}> = () => {
  return <LoginForm onSubmit={(data) => console.log(data)} />;
};

export default Login;
