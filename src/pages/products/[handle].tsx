import { NextPage } from "next";
import { useRouter } from "next/router";
import useProduct from "src/utils/hooks/useProduct";

const Product: NextPage<{}> = () => {
  const router = useRouter();

  const { data, loading } = useProduct({
    variables: {
      handle: String(router.query.handle),
    },
  });

  if (loading) {
    return null;
  }

  const product = data?.productByHandle;

  return (
    <>
      <h3>{product.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
    </>
  );
};

export default Product;
