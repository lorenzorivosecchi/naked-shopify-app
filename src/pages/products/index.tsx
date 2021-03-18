import { NextPage } from "next";
import Link from "next/link";
import useProducts from "src/utils/hooks/useProducts";

const Products: NextPage<{}> = () => {
  const { data, loading } = useProducts();

  if (loading) {
    return null;
  }
  return (
    <>
      {data?.products?.edges?.map(({ cursor, node }) => (
        <Link
          href={`/products/${encodeURIComponent(node.handle)}`}
          key={node.handle}
        >
          <a>
            <h3>{node.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} />
          </a>
        </Link>
      ))}
    </>
  );
};

export default Products;
