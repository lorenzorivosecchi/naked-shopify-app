import { render, waitFor } from "@testing-library/react";
import AuthProvider from "src/components/AuthProvider";
import AutoMockedProvider from "src/utils/testing/AutoMockedProvider";
import Login from "src/pages/account/login";
import userEvent from "@testing-library/user-event";
import Router from "next/router";
import { Login_customerAccessTokenCreate } from "src/components/__generated__/Login";
import { CustomerErrorCode } from "__generated__/globalTypes";

jest.mock("next/router");

describe("Login", () => {
  it("redirects to homepage when mutation succedes", async () => {
    const resolvers = () => ({
      Mutation: {
        customerAccessTokenCreate: (): Login_customerAccessTokenCreate => ({
          __typename: "CustomerAccessTokenCreatePayload",
          customerAccessToken: {
            __typename: "CustomerAccessToken",
            accessToken: "123456789",
            expiresAt: "2019-07-03T20:47:55Z",
          },
          customerUserErrors: [],
        }),
      },
    });

    const { getByLabelText, getByRole } = render(
      <AutoMockedProvider resolvers={resolvers}>
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
      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith("/");
    });
  });

  it("displays errors when mutation fails", async () => {
    const resolvers = () => ({
      Mutation: {
        customerAccessTokenCreate: (): Login_customerAccessTokenCreate => ({
          __typename: "CustomerAccessTokenCreatePayload",
          customerAccessToken: null,
          customerUserErrors: [
            {
              __typename: "CustomerUserError",
              code: CustomerErrorCode.INVALID,
              field: null,
              message: "Invalid password",
            },
          ],
        }),
      },
    });

    const { getByLabelText, getByRole, getByText } = render(
      <AutoMockedProvider resolvers={resolvers}>
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
      const passwordError = getByText(/\[INVALID\] Invalid password/i);
      expect(passwordError).toBeInTheDocument();
    });
  });
});
