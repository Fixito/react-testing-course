import { render, screen } from "@testing-library/react";
import App from "../App";

// test est une fonction fournie par Vitest qui définit un seul cas de test.
// Elle prend deux arguments : une chaîne de caractères décrivant ce que le test doit faire et une fonction de rappel contenant le code de test proprement dit.
// Lorsque vous exécutez vos tests, chaque bloc de test s'exécute comme un test séparé, et la description permet d'identifier quel test a réussi ou échoué.
// Notez que `test` et `it` sont des alias - ils font exactement la même chose et peuvent être utilisés de manière interchangeable.

describe.skip("App component", () => {
  test("should render heading with correct text", () => {
    // Rendu du composant App
    // monte votre composant React dans un environnement de navigation simulé.
    render(<App />);

    // `screen.debug()` est une fonction qui enregistre l'état actuel du DOM virtuel dans la console. Elle vous aide à visualiser la structure du composant et à voir ce qui est rendu.

    screen.debug();

    // `screen` est un objet fourni par `@testing-library/react` qui contient des méthodes pour interroger et interagir avec le DOM virtuel.

    // `screen.getByText('Random Component')` est une fonction qui recherche un élément avec le texte "Random Component" dans le DOM virtuel.

    const heading = screen.getByText("React Testing Library");

    // Vérifie que le titre est présent dans le document
    // `expect` est une fonction d'assertion utilisée pour créer des assertions.
    // `toBeInTheDocument()` est un matcher qui vérifie si l'élément est présent dans le DOM virtuel.
    expect(heading).toBeInTheDocument();
    expect(2 + 2).toBe(4);
  });

  // eslint-disable-next-line vitest/expect-expect
  it("this empty test will pass", () => {
    // test vide - succès !
  });

  it("this empty test will pass too", () => {
    const sum = 1 + 1;
    // throw new Error("Échec forcé");
    expect(sum).toBe(2);
  });

  // TODO: Créer un test pour le paragraphe
  it("should render paragraph with correct text", () => {
    render(<App />);

    expect(screen.getByText(/vitest/i)).toBeInTheDocument();
  });
});
