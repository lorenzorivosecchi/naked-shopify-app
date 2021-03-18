import { gql, useQuery } from "@apollo/client";
import { Customer } from "./__generated__/Customer";

const CUSTOMER = gql`
  query Customer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      displayName
    }
  }
`;

const isExpired = (date: string) => new Date() >= new Date(date);

export default function useCustomer() {
  // const { data } = useQuery<Customer>(CUSTOMER, {
  //   skip: !accessToken || !expiresAt || isExpired(expiresAt),
  //   variables: {
  //     accessToken,
  //   },
  // });

  return null;
}
