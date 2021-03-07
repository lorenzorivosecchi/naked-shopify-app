import { React } from "@ungap/global-this";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import useCustomer from "../hooks/useCustomer";

/** Redirects to homepage when user is logged in. */
function guestOnly<Props>(Component: React.FC<Props>): React.FC<Props> {
  const GuestOnly: React.FC<Props> = (props) => {
    const router = useRouter();
    const customer = useCustomer();

    useEffect(() => {
      // Redirect to homepage when user is logged in.
      if (customer) {
        router.push("/");
      }
    }, []);

    // Prevent flash of page content during redirections.
    if (customer) {
      return null;
    }

    return <Component {...props} />;
  };
  // Make wrapper rerender only when props change.
  return memo(GuestOnly);
}

export default guestOnly;
