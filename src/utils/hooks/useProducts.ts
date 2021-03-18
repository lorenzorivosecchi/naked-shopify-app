import { QueryHookOptions, useQuery } from "@apollo/client";
import { PRODUCTS } from "../queries/Products";
import { Products, ProductsVariables } from "../queries/__generated__/Products";

const defaultOptions: QueryHookOptions<Products, ProductsVariables> = {
  variables: {
    first: 10,
  },
};

function useProducts(options = defaultOptions) {
  return useQuery<Products, ProductsVariables>(PRODUCTS, options);
}

export default useProducts;
