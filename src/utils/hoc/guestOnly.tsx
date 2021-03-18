import { useRouter } from "next/router";
import { useEffect } from "react";
import useCustomer from "../hooks/useCustomer";

/** Redirects to homepage when user is logged in. */
function guestOnly<Props>(Component: React.FC<Props>): React.FC<Props> {
  const GuestOnly: React.FC<Props> = (props) => {
    const router = useRouter();
    const { data: customerData } = useCustomer();

    const isLoggedIn = !!customerData?.customer?.displayName;

    useEffect(() => {
      // Redirect to homepage when user is logged in.
      if (isLoggedIn) {
        router.push("/");
      }
    }, []);

    // Prevent flash of page content during redirections.
    if (isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };
  // Make wrapper rerender only when props change.
  return GuestOnly;
}

export default guestOnly;
