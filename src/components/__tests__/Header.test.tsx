import Header from "../Header";
import { render, waitFor } from "@testing-library/react";
import AutoMockedProvider from "../../utils/testing/AutoMockedProvider";
import AuthProvider from "../AuthProvider";
import { localStorageKeys } from "src/utils/constants";
import { getFutureDate } from "src/utils/testing/dates";

describe("Header", () => {
  it("displays the shop name", async () => {
    const resolvers = () => ({
      Shop: {
        name: () => "My Shop",
      },
    });

    const { getByText } = render(
      <AutoMockedProvider resolvers={resolvers}>
        <Header />
      </AutoMockedProvider>
    );

    await waitFor(() => {
      const shopName = getByText(/My Shop/i);
      expect(shopName).toBeInTheDocument();
    });
  });

  it("displays logout button when user is logged in", async () => {
    const mockedLocalStorage = {
      [localStorageKeys.CUSTOMER_TOKEN]: "hello-world",
      [localStorageKeys.CUSTOMER_TOKEN_EXPIRES_AT]: getFutureDate().toISOString(),
    };

    Storage.prototype.getItem = jest.fn((key) => mockedLocalStorage[key]);

    const { getByRole } = render(
      <AutoMockedProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </AutoMockedProvider>
    );

    await waitFor(() => {
      const button = getByRole("button", { name: /logout/i });
      expect(button).toBeInTheDocument();
    });
  });
});
