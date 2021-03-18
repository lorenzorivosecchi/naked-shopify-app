import { gql, useQuery } from "@apollo/client";
import React from "react";
import useCustomer from "src/utils/hooks/useCustomer";
import LogoutButton from "./LogoutButton";
import { ShopName } from "./__generated__/ShopName";

const SHOP_NAME = gql`
  query ShopName {
    shop {
      name
    }
  }
`;

const Header: React.FC<{}> = () => {
  const { data: shopNameQueryData } = useQuery<ShopName>(SHOP_NAME);
  const { data: customerData } = useCustomer();

  const shopName = shopNameQueryData?.shop?.name;
  const customerName = customerData?.customer?.displayName;

  return (
    <header>
      {shopName && <h1>{shopName}</h1>}
      {customerName && (
        <>
          <p>Logged in as {customerName}</p>
          <LogoutButton />
        </>
      )}
      {/* <Breadcrumbs /> */}
    </header>
  );
};

export default Header;
