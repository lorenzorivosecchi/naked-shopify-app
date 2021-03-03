import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "src/pages/account/login";

describe("Login", () => {
  it("renders a form", () => {
    const { getByRole, getByLabelText } = render(<Login />);

    const email = getByLabelText(/email/i);
    const password = getByLabelText(/password/i);
    const submit = getByRole("button", { name: /submit/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
  it("displays errors for required fields", async () => {
    const { getByRole, getByText } = render(<Login />);

    const submit = getByRole("button", { name: /submit/i });
    userEvent.click(submit);

    await waitFor(() => {
      const emailError = getByText(/Please enter your email/i);
      const passwordError = getByText(/Please enter your password/i);

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });
});
