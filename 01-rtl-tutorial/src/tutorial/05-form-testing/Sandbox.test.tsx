import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByRole("textbox", { name: /email/i }),
    passwordInputElement: screen.getByLabelText("Mot de passe"),
    confirmPasswordInputElement: screen.getByLabelText(
      /confirmer le mot de passe/i,
    ),
    submitButton: screen.getByRole("button", { name: /se connecter/i }),
  };

  return elements;
};

describe("05-form-testing", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  it("should be intialized with empty fields", () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
  });

  it("should be able to fill the form", async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(emailInputElement, "test@gmail.com");
    expect(emailInputElement).toHaveValue("test@gmail.com");

    await user.type(passwordInputElement, "secret");
    expect(passwordInputElement).toHaveValue("secret");

    await user.type(confirmPasswordInputElement, "secret");
    expect(confirmPasswordInputElement).toHaveValue("secret");
  });

  it("should display an error message when email is invalid", async () => {
    const { emailInputElement, submitButton } = getFormElements();

    expect(screen.queryByText(/email invalide/i)).not.toBeInTheDocument();

    await user.type(emailInputElement, "test");
    await user.click(submitButton);

    expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
  });

  it("should display an error message when password is less than 5 characters", async () => {
    const { passwordInputElement, emailInputElement, submitButton } =
      getFormElements();

    expect(
      screen.queryByText(
        /le mot de passe doit contenir au moins 5 caractères/i,
      ),
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "abcd");
    await user.click(submitButton);

    expect(
      screen.getByText(/le mot de passe doit contenir au moins 5 caractères/i),
    ).toBeInTheDocument();
  });

  it("should display an error message when passwords don't match", async () => {
    const {
      emailInputElement,
      confirmPasswordInputElement,
      passwordInputElement,
      submitButton,
    } = getFormElements();

    expect(
      screen.queryByText(/les mots de passe ne correspondent pas/i),
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "azerty");
    await user.click(submitButton);

    expect(
      screen.getByText(/les mots de passe ne correspondent pas/i),
    ).toBeInTheDocument();
  });

  it("should display no errors and clear fields when valid inputs", async () => {
    const {
      emailInputElement,
      confirmPasswordInputElement,
      passwordInputElement,
      submitButton,
    } = getFormElements();

    expect(screen.queryByText(/email invalide/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /le mot de passe doit contenir au moins 5 caractères/i,
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/les mots de passe ne correspondent pas/i),
    ).not.toBeInTheDocument();

    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "secret");
    await user.click(submitButton);

    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
  });
});
