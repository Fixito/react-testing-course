import { render, screen } from "@testing-library/react";
import List from "../components/List";
import { Item } from "../types";

vi.mock("../components/ItemCard", () => {
  return {
    default: () => <article>Carte de l'item</article>,
  };
});

describe("List component", () => {
  const mockItems: Item[] = [
    {
      id: "1",
      title: "Item 1",
      description: "Description 1",
      category: "urgent",
    },
    {
      id: "2",
      title: "Item 2",
      description: "Description 2",
      category: "normal",
    },
  ];
  const mockOnDelete = vi.fn();

  it("should render the flow board heading", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);
    expect(
      screen.getByRole("heading", { name: /panneau d'affichage/i }),
    ).toBeInTheDocument();
  });

  it("should render the correct number of ItemCards", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(2);
  });

  it("should render tempty when items not provided", () => {
    render(<List items={[]} onDelete={mockOnDelete} />);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
