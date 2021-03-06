import { gql, useQuery } from "@apollo/client";
import useAuthContext from "src/utils/hooks/useAuthContext";
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
  const { customer } = useAuthContext();

  // Rendering the component only when data is available.
  if (!shopNameQueryData) {
    return null;
  }

  const shopName = shopNameQueryData?.shop?.name;
  const customerName = customer?.displayName;

  return (
    <header>
      {shopName && <h1>{shopName}</h1>}
      {customerName && <p>Logged in as {customerName}</p>}
    </header>
  );
};

export default Header;
