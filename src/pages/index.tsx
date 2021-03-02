import { gql } from "@apollo/client";

const HOMEPAGE_QUERY = gql`
  query homepage {
    shop {
      name
    }
  }
`;

export default function Home() {
  return null;
}
