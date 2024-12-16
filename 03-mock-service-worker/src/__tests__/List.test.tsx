import { render, screen } from "@testing-library/react";
import List from "../components/List";
import { Post } from "../hooks/usePosts";

const mockPosts: Post[] = [
  { id: "1", title: "Poste 1", likes: 0 },
  { id: "2", title: "Poste 2", likes: 5 },
];

const mockOnLike = vi.fn();
const mockOnDelete = vi.fn();

describe("List component", () => {
  it("should render correct numbers of articles", () => {
    render(
      <List posts={mockPosts} onLike={mockOnLike} onDelete={mockOnDelete} />,
    );
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(mockPosts.length);
  });

  it("should render empty list when no posts provided", () => {
    render(<List posts={[]} onLike={mockOnLike} onDelete={mockOnDelete} />);
    const articles = screen.queryAllByRole("article");
    expect(articles).toHaveLength(0);
  });
});
