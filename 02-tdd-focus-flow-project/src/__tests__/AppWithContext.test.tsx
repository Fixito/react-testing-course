import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import AppWithContext from "../AppWithContext";
import FlowProvider from "../FlowContext";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /titre/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /catégorie/i }),
    submitButton: screen.getByRole("button", { name: /ajouter une tâche/i }),
  };
};

const customRenderAppWithContext = () => {
  return render(
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>,
  );
};

const addTestItem = async (user: UserEvent) => {
  const { categorySelect, descriptionInput, submitButton, titleInput } =
    getFormElements();

  await user.type(titleInput, "Nouvelle tâche");
  await user.type(descriptionInput, "Description de la tâche");
  await user.selectOptions(categorySelect, "urgent");
  await user.click(submitButton);
};

describe("AppWithContext component", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    customRenderAppWithContext();
  });

  it("should render heading and form elements", () => {
    expect(
      screen.getByRole("heading", { name: /panneau d'affichage/i }),
    ).toBeInTheDocument();

    const elements = getFormElements();

    Object.values(elements).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("should handle adding an item", async () => {
    const cardsBefore = screen.queryAllByRole("article");
    expect(cardsBefore).toHaveLength(0);

    await addTestItem(user);

    const cardsAfter = screen.queryAllByRole("article");
    expect(cardsAfter).toHaveLength(1);

    expect(screen.getByText("Nouvelle tâche")).toBeInTheDocument();
    expect(screen.getByText("Description de la tâche")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  it("should handle deleting an item", async () => {
    await addTestItem(user);

    const deleteButton = screen.getByRole("button", { name: /supprimer/i });
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);

    expect(screen.queryByText("Nouvelle tâche")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
