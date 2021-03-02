import { gql, useQuery } from "@apollo/client";
import { ShopName } from "./__generated__/ShopName";

const SHOP_NAME = gql`
  query ShopName {
    shop {
      name
    }
  }
`;

const Header: React.FC<{}> = () => {
  const { data, loading } = useQuery<ShopName>(SHOP_NAME);

  if (loading) {
    return <p>Loading...</p>;
  }
  const shopName = data?.shop?.name;

  return <header>{shopName && <h1>{shopName}</h1>}</header>;
};

export default Header;
