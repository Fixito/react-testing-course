import userEvent, { UserEvent } from "@testing-library/user-event";
import { Post } from "../hooks/usePosts";
import Item from "../components/Item";
import { render, screen } from "@testing-library/react";

const mockOnLike = vi.fn();
const mockOnDelete = vi.fn();

const mockPost: Post = { id: "1", title: "Poste 1", likes: 5 };

describe("Item component", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    render(
      <Item post={mockPost} onLike={mockOnLike} onDelete={mockOnDelete} />,
    );
  });

  it("should render post title correctly", () => {
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it("should render correct number of likes", async () => {
    expect(screen.getByText(`👍 ${mockPost.likes}`)).toBeInTheDocument();
  });

  it("should call onLike when like button is clicked", async () => {
    const likeButton = screen.getByRole("button", {
      name: `👍 ${mockPost.likes}`,
    });
    await user.click(likeButton);
    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it("should call onDelete when delete button is clicked", async () => {
    const deleteButton = screen.getByRole("button", {
      name: /supprimer/i,
    });
    await user.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockPost.id);
  });
});
