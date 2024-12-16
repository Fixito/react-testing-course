import { render, screen } from "@testing-library/react";
import ItemCard from "../components/ItemCard";
import { Item } from "../types";
import userEvent from "@testing-library/user-event";

interface MockProps extends Item {
  onDelete: (id: string) => void;
}

describe("ItemCard component", () => {
  const mockProps: MockProps = {
    id: "1",
    title: "Tâche test",
    description: "Description test",
    category: "urgent",
    onDelete: vi.fn(),
  };

  it("should render with correct content", () => {
    render(<ItemCard {...mockProps} />);
    expect(
      screen.getByRole("heading", { name: /tâche test/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Description test")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  it("should call onDelete hen delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<ItemCard {...mockProps} />);
    const deleteButton = screen.getByRole("button", {
      name: /supprimer la tâche : 1/i,
    });
    await user.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith("1");
  });
});
