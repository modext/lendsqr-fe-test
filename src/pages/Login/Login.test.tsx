import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router-dom";
import { router } from "../../app/router";

describe("Login", () => {
  it("shows error when fields are empty", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const logInBtn = await screen.findByRole("button", { name: /log in/i });
    await user.click(logInBtn);
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
});
