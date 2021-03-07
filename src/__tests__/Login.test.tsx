import { render, waitFor } from "@testing-library/react";
import AuthProvider from "src/components/AuthProvider";
import AutoMockedProvider from "src/utils/testing/AutoMockedProvider";
import Login from "src/pages/account/login";
import userEvent from "@testing-library/user-event";
import Router from "next/router";

describe("Login", () => {
  it("redirects to homepage when login is successful", async () => {
    jest.mock("next/router");
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const { getByLabelText, getByRole } = render(
      <AutoMockedProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </AutoMockedProvider>
    );

    const email = getByLabelText(/email/i);
    const password = getByLabelText(/password/i);
    const submit = getByRole("button", { name: /submit/i });

    userEvent.type(email, "hello@world.com");
    userEvent.type(password, "helloworld");
    userEvent.click(submit);

    await waitFor(() => {
      expect(window["alert"]).toHaveBeenCalledTimes(0);
      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith("/");
    });
  });
});
