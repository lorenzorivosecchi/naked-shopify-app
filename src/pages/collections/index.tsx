import { NextPage } from "next";
import Link from "next/link";
import useCollections from "src/utils/hooks/useCollections";

const Collections: NextPage<{}> = () => {
  const { data, loading } = useCollections();

  if (loading) {
    return null;
  }
  return (
    <>
      {data?.collections?.edges?.map(({ cursor, node }) => (
        <Link
          href={`/collections/${encodeURIComponent(node.handle)}`}
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

export default Collections;
