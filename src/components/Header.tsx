import { gql } from "@apollo/client";

const HEADER_QUERY = gql`
  query Header2 {
    shop {
      name
    }
  }
`;

const Header: React.FC<{}> = () => {
  return <header></header>;
};

export default Header;
