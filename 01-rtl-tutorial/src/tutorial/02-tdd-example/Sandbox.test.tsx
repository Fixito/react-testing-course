import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

// Le TDD (Test-Driven Development) est une approche de programmation qui consiste à écrire des tests avant d'écrire le code proprement dit.
describe("02-tdd-example", () => {
  it("shoudl render heading", () => {
    render(<Sandbox />);
    const heading = screen.getByText(/testing/i);
    expect(heading).toBeInTheDocument();
  });
});
