import { QueryHookOptions, useQuery } from "@apollo/client";
import { COLLECTION } from "../queries/Collection";
import {
  Collection,
  CollectionVariables,
} from "../queries/__generated__/Collection";

function useCollection(
  options: QueryHookOptions<Collection, CollectionVariables>
) {
  return useQuery<Collection, CollectionVariables>(COLLECTION, options);
}

export default useCollection;
