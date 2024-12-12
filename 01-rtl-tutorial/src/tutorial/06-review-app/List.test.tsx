import { render, screen } from "@testing-library/react";
import List from "./List";
import { Review } from "./Sandbox";

const mockReviews: Review[] = [
  { email: "test@example.com", rating: "4", text: "Super produit !" },
  {
    email: "user@example.com",
    rating: "5",
    text: "Excellent produit.",
  },
];

describe("List component", () => {
  it("shoud render heading", () => {
    render(<List reviews={[]} />);
    expect(screen.getByRole("heading", { name: /avis/i })).toBeInTheDocument();
  });

  it("shoud display 'Aucun avis pour l'instant' when reviews array is empty", () => {
    render(<List reviews={[]} />);
    expect(screen.getByText("Aucun avis pour l'instant")).toBeInTheDocument();
  });

  it("shoud render reviews correctly when provided", () => {
    render(<List reviews={mockReviews} />);

    mockReviews.forEach((review: Review) => {
      const { email, rating, text } = review;

      expect(screen.getByText(email)).toBeInTheDocument();
      const stars = screen.getByText("★".repeat(Number(rating)));
      expect(stars).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
