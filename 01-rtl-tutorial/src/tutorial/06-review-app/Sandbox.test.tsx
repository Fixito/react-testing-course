import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const ratingSelect = screen.getByRole("combobox", { name: /note/i });
  const textArea = screen.getByRole("textbox", { name: /votre avis/i });
  const submitButton = screen.getByRole("button", {
    name: /envoyer/i,
  });

  return {
    emailInput,
    ratingSelect,
    textArea,
    submitButton,
  };
};

describe("Reviews App", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should renders reviews app title", () => {
    render(<Sandbox />);
    const title = screen.getByRole("heading", {
      level: 1,
      name: /application d'avis/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("should add a new review when form is submitted", async () => {
    render(<Sandbox />);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Execellent produit !");
    await user.click(submitButton);

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    const stars = screen.getByText("★".repeat(Number(5)));
    expect(stars).toBeInTheDocument();
    expect(screen.getByText("Execellent produit !")).toBeInTheDocument();
  });

  it("alternative - should add a new review when form is submitted", async () => {
    render(<Sandbox />);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    const reviews = screen.queryAllByRole("listitem");
    expect(reviews).toHaveLength(0);

    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Execellent produit !");
    await user.click(submitButton);

    expect(screen.queryAllByRole("listitem")).toHaveLength(1);
  });
});
