import { render, screen } from "@testing-library/react";
import Form from "./Form";
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

describe("Form component", () => {
  const mockOnSubmit = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
  });

  it("should render form elements correctly", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    expect(emailInput).toHaveValue("");
    expect(ratingSelect).toHaveValue("");
    expect(textArea).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  it("should display error message when reviews is too short", async () => {
    render(<Form onSubmit={mockOnSubmit} />);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "azerty");
    await user.click(submitButton);

    expect(
      screen.getByText(/votre avis doit contenir au moins 10 caractères/i),
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should submit form with valid data", async () => {
    render(<Form onSubmit={mockOnSubmit} />);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.selectOptions(ratingSelect, "5");
    await userEvent.type(textArea, "Excellent produit, je recommande !");
    await userEvent.click(submitButton);

    expect(
      screen.queryByText(/votre avis doit contenir au moins 10 caractères/i),
    ).not.toBeInTheDocument();
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      rating: "5",
      text: "Excellent produit, je recommande !",
    });
  });
});
