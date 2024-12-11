import { logRoles, render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  it("renders nav and navigation links", () => {
    const { container } = render(<Sandbox />);
    logRoles(container);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /accueil/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /à propos/i })).toBeInTheDocument();
  });

  it("renders headings with correct hierarchy", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("heading", { name: /titre principal/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sous-titre/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    render(<Sandbox />);

    expect(screen.getByRole("img", { name: /exemple/i })).toBeInTheDocument();
  });

  it("renders initial buttons", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("button", { name: /clique moi/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /envoyer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /annuler/i }),
    ).toBeInTheDocument();
  });

  it("error button is not initialy visible", () => {
    render(<Sandbox />);

    expect(
      screen.queryByRole("button", { name: /erreur/i }),
    ).not.toBeInTheDocument();
  });

  it("async button appears after delay", async () => {
    render(<Sandbox />);

    const buttonName = /bouton async/i;

    expect(
      screen.queryByRole("button", { name: buttonName }),
    ).not.toBeInTheDocument();

    const asyncButton = await screen.findByRole("button", {
      name: buttonName,
    });

    expect(asyncButton).toBeInTheDocument();
  });
});
