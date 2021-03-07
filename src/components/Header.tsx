import { gql, useQuery } from "@apollo/client";
import useAuthContext from "src/utils/hooks/useAuthContext";
import useCustomer from "src/utils/hooks/useCustomer";
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
  const { logout, accessToken } = useAuthContext();
  const customer = useCustomer();

  // Rendering the component only when data is available.
  if (!shopNameQueryData) {
    return null;
  }

  const shopName = shopNameQueryData?.shop?.name;

  return (
    <header>
      {shopName && <h1>{shopName}</h1>}
      {customer && (
        <>
          <p>Logged in as {customer?.displayName}</p>
          {accessToken && (
            <button onClick={() => logout({ variables: { accessToken } })}>
              Logout
            </button>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
