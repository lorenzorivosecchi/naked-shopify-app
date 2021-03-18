import { NextPage } from "next";
import { useRouter } from "next/router";
import useCollection from "src/utils/hooks/useCollection";

const Collection: NextPage<{}> = () => {
  const { query } = useRouter();

  const { data, loading, error } = useCollection({
    variables: { handle: String(query.slug), first: 5 },
  });

  if (loading) {
    return null;
  }
  if (error) {
    console.error(error);
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Collection;
