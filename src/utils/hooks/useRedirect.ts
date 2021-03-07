import { useRouter } from "next/router";
import { useCallback } from "react";

function useRedirect(defaultPath = "/", queryParamKey = "redirectTo") {
  const router = useRouter();
  const pathFromQueryParams = router.query[queryParamKey];

  const redirect = useCallback(() => {
    let pathname = "/";
    if (typeof pathFromQueryParams === "string") {
      // keep the path utf-8 compatible.
      pathname = encodeURIComponent(pathFromQueryParams);
    }
    router.push(pathname);
  }, [defaultPath, pathFromQueryParams]);

  return redirect;
}

export default useRedirect;
