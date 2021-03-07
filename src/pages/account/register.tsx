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
      <CreateAccountForm
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

export default guestOnly(Register);
