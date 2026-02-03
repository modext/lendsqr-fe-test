import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router-dom";
import { router } from "../../app/router";

describe("Login", () => {
  it("shows error when email is empty (negative)", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const logInBtn = await screen.findByRole("button", { name: /log in/i });
    await user.click(logInBtn);
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it("shows error when password is empty after filling email (negative)", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const emailInput = await screen.findByPlaceholderText(/email/i);
    await user.type(emailInput, "test@example.com");
    const logInBtn = screen.getByRole("button", { name: /log in/i });
    await user.click(logInBtn);
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("shows welcome heading (positive)", async () => {
    render(<RouterProvider router={router} />);
    expect(await screen.findByRole("heading", { name: /welcome/i })).toBeInTheDocument();
  });
});
