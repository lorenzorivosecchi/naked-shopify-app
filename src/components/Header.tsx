import { gql, useQuery } from "@apollo/client";
import useAuthContext from "src/utils/hooks/useAuthContext";
import useCustomer from "src/utils/hooks/useCustomer";
import Breadcrumbs from "./Breadcrumbs";
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
  const { logout } = useAuthContext();
  const customer = useCustomer();

  const shopName = shopNameQueryData?.shop?.name;
  const customerName = customer?.displayName;

  return (
    <header>
      {shopName && <h1>{shopName}</h1>}
      {customerName && (
        <>
          <p>Logged in as {customerName}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      )}
      {/* <Breadcrumbs /> */}
    </header>
  );
};

export default Header;
