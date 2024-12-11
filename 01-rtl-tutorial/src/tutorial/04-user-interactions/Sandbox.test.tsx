import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "./Sandbox";

describe("04-user-interactions", () => {
  // TODO: Faire les tests
  it("should increment and decrement the count using FireEvent (legacy approach)", () => {
    render(<Sandbox />);

    const increaseButton = screen.getByRole("button", {
      name: /incrémenter/i,
    });
    const decreaseButton = screen.getByRole("button", {
      name: /décrémenter/i,
    });

    expect(screen.getByRole("heading", { name: /0/ })).toBeInTheDocument();

    fireEvent.click(increaseButton);
    expect(screen.getByRole("heading", { name: /1/ })).toBeInTheDocument();

    fireEvent.click(decreaseButton);
    expect(screen.getByRole("heading", { name: /0/ })).toBeInTheDocument();
  });

  it("should increment and decrement count using UserEvent", async () => {
    render(<Sandbox />);

    const user = userEvent.setup();

    const increaseButton = screen.getByRole("button", {
      name: /incrémenter/i,
    });
    const decreaseButton = screen.getByRole("button", {
      name: /décrémenter/i,
    });

    expect(screen.getByRole("heading", { name: /0/ })).toBeInTheDocument();

    await user.click(increaseButton);
    expect(screen.getByRole("heading", { name: /1/ })).toBeInTheDocument();

    await user.click(decreaseButton);
    expect(screen.getByRole("heading", { name: /0/ })).toBeInTheDocument();
  });

  it("should toggle the like button", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();

    expect(
      screen.getByRole("button", {
        name: /bouton j'aime/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /bouton de désapprobation/i,
      }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /bouton j'aime/i,
      }),
    );

    expect(
      screen.queryByRole("button", {
        name: /bouton j'aime/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /bouton de désapprobation/i,
      }),
    ).toBeInTheDocument();
  });
});
