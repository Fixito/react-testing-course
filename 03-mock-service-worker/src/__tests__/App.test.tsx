import { render, screen, within } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import App from "../App";
import { getFormElements } from "./Form.test";
import {
  createErrorHandler,
  deleteErrorHandler,
  getErrorHandler,
  posts,
  updateErrorHandler,
} from "../mocks/handler";
import server from "../mocks/server";

describe("App component", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render the App component", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /gestionnaire de postes/i }),
    ).toBeInTheDocument();
  });

  it("should fetch posts on mount", async () => {
    render(<App />);
    expect(await screen.findByText(/premier poste/i)).toBeInTheDocument();
    expect(await screen.findByText(/second poste/i)).toBeInTheDocument();
  });

  it("should create a new post", async () => {
    render(<App />);
    const { submitBtn, titleInput } = getFormElements();
    await user.type(titleInput, "Nouveau poste");
    await user.click(submitBtn);
    expect(await screen.findByText(/nouveau poste/i)).toBeInTheDocument();
  });

  it("should update a post", async () => {
    render(<App />);
    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);
    expect(await screen.findByText(`👍 ${posts[0].likes}`)).toBeInTheDocument();
  });

  it("should delete a post", async () => {
    render(<App />);
    const initialPosts = await screen.findAllByRole("article");
    expect(initialPosts).toHaveLength(3);
    const lastPost = initialPosts[2];
    const deleteBtn = within(lastPost).getByRole("button", {
      name: /supprimer/i,
    });
    await user.click(deleteBtn);
    const postsAfterDelete = await screen.findAllByRole("article");
    expect(postsAfterDelete).toHaveLength(2);
  });

  it("should show error message when fetching posts fails", async () => {
    server.use(...getErrorHandler);
    render(<App />);
    expect(
      await screen.findByText(/échec lors de la récupération des postes/i),
    ).toBeInTheDocument();
  });

  it("should show error message when creating a post fails", async () => {
    server.use(...createErrorHandler);
    render(<App />);
    const { submitBtn, titleInput } = getFormElements();
    await user.type(titleInput, "Nouveau poste");
    await user.click(submitBtn);
    expect(
      await screen.findByText(/échec lors de la création du poste/i),
    ).toBeInTheDocument();
  });

  it("should show error mesage when updating a post fails", async () => {
    server.use(...updateErrorHandler);
    render(<App />);
    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);
    screen.debug();
    expect(
      await screen.findByText(/échec lors de la mise à jour du poste/i),
    ).toBeInTheDocument();
  });

  it("should show error mesage when deleting a post fails", async () => {
    server.use(...deleteErrorHandler);
    render(<App />);
    const allPosts = await screen.findAllByRole("article");
    const firstPost = allPosts[0];
    const deleteBtn = within(firstPost).getByRole("button", {
      name: /supprimer/i,
    });
    await user.click(deleteBtn);
    expect(
      await screen.findByText(/échec lors de la suppression du poste/i),
    ).toBeInTheDocument();
  });
});
