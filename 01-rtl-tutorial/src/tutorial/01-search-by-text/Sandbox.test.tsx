import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("01-searcb-by-text", () => {
  it("demonstrate different query methods", async () => {
    render(<Sandbox />);

    //* getBy...
    // Lève une erreur si l'élément n'est pas trouvé
    // Retourne un seul élément
    // Utilisé lorsque l'élément doit exister

    //* 1. getByText
    // const heading = screen.getByText("React Testing Library exemples");
    // expect(heading).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();

    //* queryBy...
    // Retourne null si l'élément n'est pas trouvé
    // Retourne un seul élément
    // Utilisé lorsque l'on teste que l'élément ne doit PAS exister

    //* 2. queryByText
    const errorMessage = screen.queryByText(/message d'erreur/i);

    expect(errorMessage).not.toBeInTheDocument();

    const items = screen.getAllByText(/item/i);
    expect(items).toHaveLength(4);

    //* findBy...
    // Returne une Promesse
    // Réessaie jusqu'à ce que l'élément soit trouvé ou jusqu'à ce qu'il n'y ait plus de délai
    // Utilisé pour les éléments asynchrones

    //* 3. findByText
    const asyncMessage = await screen.findByText(/message asynchrone/i);
    expect(asyncMessage).toBeInTheDocument();
  });
});
