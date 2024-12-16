import Form from "../components/Form";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

export const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /titre/i }),
    submitBtn: screen.getByRole("button", { name: /ajouter un poste/i }),
  };
};

describe("Form component", () => {
  const mockOnSubmit = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
    render(<Form onSubmit={mockOnSubmit} />);
  });

  it("should render correctly", () => {
    const { titleInput, submitBtn } = getFormElements();
    expect(titleInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it("should update input value on change", async () => {
    const { titleInput } = getFormElements();
    await user.type(titleInput, "test");
    expect(titleInput).toHaveValue("test");
  });

  it("should require title input before submission", async () => {
    const { submitBtn } = getFormElements();
    await user.click(submitBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits the form with correct data", async () => {
    const { titleInput, submitBtn } = getFormElements();
    await user.type(titleInput, "test");
    await user.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith({ title: "test", likes: 0 });
  });

  it("should clear input after submission", async () => {
    const { titleInput, submitBtn } = getFormElements();
    await user.type(titleInput, "test");
    await user.click(submitBtn);
    expect(titleInput).toHaveValue("");
  });
});
