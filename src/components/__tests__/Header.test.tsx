import Header from "../Header";
import { findByText, render, waitFor } from "@testing-library/react";
import AutoMockedProvider from "../../utils/testing/AutoMockedProvider";

describe("Header", () => {
  it("is truthy", () => {
    expect(Header).toBeTruthy();
  });
  it("displays the shop name", async () => {
    const mocks = {
      Shop: {
        name: () => "My Shop",
      },
    };

    const { getByText } = render(
      <AutoMockedProvider mocks={mocks}>
        <Header />
      </AutoMockedProvider>
    );

    const loading = getByText(/Loading.../i);
    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      const shopName = getByText(/My Shop/i);
      expect(shopName).toBeInTheDocument();
    });
  });
});
