import { QueryHookOptions, useQuery } from "@apollo/client";
import { PRODUCT } from "../queries/Product";
import { Product, ProductVariables } from "../queries/__generated__/Product";

function useProduct(options: QueryHookOptions<Product, ProductVariables>) {
  return useQuery<Product, ProductVariables>(PRODUCT, options);
}

export default useProduct;
