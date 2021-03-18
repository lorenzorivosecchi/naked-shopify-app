import { useRouter } from "next/router";
import Link from "next/link";

const Breadcrumbs: React.FC<{}> = () => {
  const router = useRouter();

  const tokens = router.asPath.split("/");
  // Remove home path
  tokens.shift();

  const links = tokens.map((path, i) => {
    return { label: path, href: "/" + tokens.slice(0, i + 1).join("/") };
  });

  return (
    <nav aria-label="breadcrumbs">
      <ol>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <a>{link.label}</a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );

  return null;
};

export default Breadcrumbs;
