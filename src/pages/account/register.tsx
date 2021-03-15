import { NextPage } from "next";
import CreateAccountForm from "src/components/CreateAccountForm";
import Link from "next/link";
import { useRouter } from "next/router";
import guestOnly from "src/utils/hoc/guestOnly";

const Register: NextPage<{}> = () => {
  const router = useRouter();

  return (
    <>
      <h1>Create Account</h1>
      <CreateAccountForm onSuccess={() => router.push("/")} />
      <Link href="/account/login">
        <a>I already have an account</a>
      </Link>
    </>
  );
};

export default guestOnly(Register);
