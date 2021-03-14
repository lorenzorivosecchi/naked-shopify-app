import Header from "../Header";
import { render, waitFor } from "@testing-library/react";
import AutoMockedProvider from "../../utils/testing/AutoMockedProvider";

describe("Header", () => {
  it("displays the shop name", async () => {
    const mocks = () => ({
      Shop: {
        name: () => "My Shop",
      },
    });

    const { getByText } = render(
      <AutoMockedProvider resolvers={mocks}>
        <Header />
      </AutoMockedProvider>
    );

    await waitFor(() => {
      const shopName = getByText(/My Shop/i);
      expect(shopName).toBeInTheDocument();
    });
  });
});
