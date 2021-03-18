import { NextPage } from "next";
import useCollections from "src/utils/hooks/useCollections";

const Collections: NextPage<{}> = () => {
  const { data, loading } = useCollections();

  if (loading) {
    return null;
  }
  return (
    <>
      {data?.collections?.edges?.map(({ cursor, node }) => (
        <div key={cursor}>
          <h3>{node.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} />
        </div>
      ))}
    </>
  );
};

export default Collections;
