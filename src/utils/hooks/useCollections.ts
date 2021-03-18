import { QueryHookOptions, useQuery } from "@apollo/client";
import { COLLECTIONS } from "../queries/Collections";
import {
  Collections,
  CollectionsVariables,
} from "../queries/__generated__/Collections";

const defaultOptions: QueryHookOptions<Collections, CollectionsVariables> = {
  variables: {
    first: 10,
  },
};

function useCollections(options = defaultOptions) {
  return useQuery<Collections, CollectionsVariables>(COLLECTIONS, options);
}

export default useCollections;
