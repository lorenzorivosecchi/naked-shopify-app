import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <Link href="/account/login">Login</Link>
    </>
  );
}
