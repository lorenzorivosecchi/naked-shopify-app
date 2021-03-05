import { getByLabelText, render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders a form", () => {
    const { getByLabelText } = render(<App />);

    const form = getByLabelText(/Profile/i);

    expect(form).toBeInTheDocument();
  });
});
