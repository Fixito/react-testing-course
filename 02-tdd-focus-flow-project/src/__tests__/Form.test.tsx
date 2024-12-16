import { render, screen } from "@testing-library/react";
import Form from "../components/Form";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /titre/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /catégorie/i }),
    submitButton: screen.getByRole("button", { name: /ajouter une tâche/i }),
  };
};

describe("Form component", () => {
  const mockOnSUbmit = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    mockOnSUbmit.mockClear();
    user = userEvent.setup();
    render(<Form onSubmit={mockOnSUbmit} />);
  });

  it("should render form with empty fields initially", () => {
    const { titleInput, categorySelect, descriptionInput } = getFormElements();

    expect(titleInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });

  it("should submit form with entered fields", async () => {
    const { categorySelect, descriptionInput, submitButton, titleInput } =
      getFormElements();

    await user.type(titleInput, "Nouvelle tâche");
    await user.type(descriptionInput, "Description de la tâche");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(mockOnSUbmit).toHaveBeenCalledWith({
      title: "Nouvelle tâche",
      description: "Description de la tâche",
      category: "urgent",
    });
  });

  it("should validate required fields", async () => {
    const { submitButton } = getFormElements();

    await user.click(submitButton);

    expect(mockOnSUbmit).not.toHaveBeenCalled();
  });

  it("should clear form after successful submission", async () => {
    const { titleInput, categorySelect, descriptionInput, submitButton } =
      getFormElements();

    await user.type(titleInput, "Nouvelle tâche");
    await user.type(descriptionInput, "Description de la tâche");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(titleInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
});
