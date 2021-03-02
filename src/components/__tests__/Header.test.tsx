import Header from "../Header";
import { render, waitFor } from "@testing-library/react";
import AutoMockedProvider from "../../utils/testing/AutoMockedProvider";

describe("Header", () => {
  it("is truthy", () => {
    expect(Header).toBeTruthy();
  });
  it("displays a spinner", async () => {
    const { getByText } = render(
      <AutoMockedProvider>
        <Header />
      </AutoMockedProvider>
    );

    await waitFor(() => {
      const loading = getByText(/Loading.../i);
      expect(loading).toBeInTheDocument();
    });
  });
});
