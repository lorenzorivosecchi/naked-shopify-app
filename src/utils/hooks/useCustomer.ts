import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { localStorageKeys } from "../constants";
import { CUSTOMER } from "../queries/Customer";
import { Customer } from "../queries/__generated__/Customer";

const isExpired = (date: string) => new Date() >= new Date(date);

export default function useCustomer() {
  const [accessToken, setAccessToken] = useState<string | null>();
  const [expiresAt, setExpiresAt] = useState<string | null>();

  useEffect(() => {
    const accessToken = localStorage.getItem(localStorageKeys.CUSTOMER_TOKEN);
    const expiresAt = localStorage.getItem(
      localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT
    );
    setAccessToken(accessToken);
    setExpiresAt(expiresAt);
  }, []);

  return useQuery<Customer>(CUSTOMER, {
    skip: !accessToken || !expiresAt || isExpired(expiresAt),
    variables: {
      accessToken,
    },
    // Make this query network only because we rely on it
    // to know if the user is logged in.
    fetchPolicy: "network-only",
  });
}
