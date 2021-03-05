import { getByLabelText, render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders a form", () => {
    const { getByLabelText } = render(<App />);

    const form = getByLabelText(/profile/i);
    expect(form).toBeInTheDocument();

    const firstName = getByLabelText(/first name/i);
    expect(firstName).toBeInTheDocument();

    const lastName = getByLabelText(/last name/i);
    expect(lastName).toBeInTheDocument();

    const submit = getByLabelText(/submit/);
    expect(lastName).toBeInTheDocument();
  });
});
