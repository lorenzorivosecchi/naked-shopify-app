import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  it("works", async () => {
    const { getByLabelText, getByRole } = render(<App />);

    const form = getByLabelText(/profile/i);
    expect(form).toBeInTheDocument();

    expect(form).toHaveFormValues({
      firstName: "",
      lastName: "",
      gender: "Male",
    });

    const firstName = getByLabelText(/first name/i);
    const lastName = getByLabelText(/last name/i);
    const gender = getByLabelText(/gender/i);

    userEvent.type(firstName, "Lisa");
    userEvent.type(lastName, "Simpson");
    userEvent.selectOptions(gender, "Female");

    await waitFor(() => {
      expect(form).toHaveFormValues({
        firstName: "Lisa",
        lastName: "Simpson",
        gender: "Female",
      });
    });

    const submit = getByRole("button", { name: /update/i });
    expect(submit).toBeInTheDocument();
  });

  it("displays validation errors", async () => {
    const { getAllByRole, getByRole } = render(<App />);

    const submit = getByRole("button", { name: /update/i });

    userEvent.click(submit);

    await waitFor(() => {
      const errors = getAllByRole("alert");
      expect(errors.length).toBe(2);
    });
  });
});
