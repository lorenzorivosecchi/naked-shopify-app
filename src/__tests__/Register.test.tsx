import { render, waitFor } from "@testing-library/react";
import AuthProvider from "src/components/AuthProvider";
import AutoMockedProvider from "src/utils/testing/AutoMockedProvider";
import Register from "src/pages/account/register";
import userEvent from "@testing-library/user-event";
import Router from "next/router";
import { CreateAccount_customerCreate } from "src/components/__generated__/CreateAccount";
import { CustomerErrorCode } from "__generated__/globalTypes";

jest.mock("next/router");

describe("Register", () => {
  it("redirects to homepage when mutation succedes", async () => {
    const resolvers = () => ({
      Mutation: {
        customerCreate: (): CreateAccount_customerCreate => ({
          __typename: "CustomerCreatePayload",
          customer: {
            id: "helloworld",
            __typename: "Customer",
          },
          customerUserErrors: [],
        }),
      },
    });

    const { getByLabelText, getByRole } = render(
      <AutoMockedProvider resolvers={resolvers}>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </AutoMockedProvider>
    );

    const email = getByLabelText(/^email/i);
    const password = getByLabelText(/^password/i);
    const passwordConf = getByLabelText(/^confirm password/i);
    const submit = getByRole("button", { name: /submit/i });

    userEvent.type(email, "hello@world.com");
    userEvent.type(password, "helloworld");
    userEvent.type(passwordConf, "helloworld");
    userEvent.click(submit);

    await waitFor(() => {
      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith("/");
    });
  });

  it("displays errors when mutation fails", async () => {
    const resolvers = () => ({
      Mutation: {
        customerCreate: (): CreateAccount_customerCreate => ({
          __typename: "CustomerCreatePayload",
          customer: {
            id: "helloworld",
            __typename: "Customer",
          },
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
          <Register />
        </AuthProvider>
      </AutoMockedProvider>
    );

    const email = getByLabelText(/^email/i);
    const password = getByLabelText(/^password/i);
    const passwordConf = getByLabelText(/^confirm password/i);
    const submit = getByRole("button", { name: /submit/i });

    userEvent.type(email, "hello@world.com");
    userEvent.type(password, "helloworld");
    userEvent.type(passwordConf, "helloworld");
    userEvent.click(submit);

    await waitFor(() => {
      const passwordError = getByText(/\[INVALID\] Invalid password/i);
      expect(passwordError).toBeInTheDocument();
    });
  });
});
