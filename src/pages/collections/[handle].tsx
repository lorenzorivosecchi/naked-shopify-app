import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useCollection from "src/utils/hooks/useCollection";

const Collection: NextPage<{}> = () => {
  const router = useRouter();

  const { data, loading } = useCollection({
    variables: { handle: String(router.query.handle), first: 5 },
  });

  if (loading) {
    return null;
  }
  const collection = data?.collectionByHandle;

  return (
    <>
      <h3>{collection.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />
      {collection.products?.edges?.map(({ node }) => (
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

export default Collection;
