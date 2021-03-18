import { NextPage } from "next";
import useCollections from "src/utils/hooks/useCollections";

const Collections: NextPage<{}> = () => {
  const { data, loading } = useCollections();

  if (loading) {
    return null;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Collections;
