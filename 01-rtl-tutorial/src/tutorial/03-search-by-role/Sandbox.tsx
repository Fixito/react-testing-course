import { useEffect, useState } from "react";

export default function Sandbox() {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <nav>
        <a href="/">Accueil</a>
        <a href="/about">À propos</a>
        {/* Titres */}
        <h1>Titre principal</h1>
        <h2>Sous-titre</h2>
        <img src="example.jpg" alt="Exemple" />
        {/* Boutons */}
        <button>Clique moi</button>
        <button>Envoyer</button>
        <button>Annuler</button>
        {/* Bouton d'erreur conditionnel pour montrer queryByRole */}
        {showError && <button>Erreur</button>}
        {/* Bouton async pour montrer findByRole*/}
        {showAsyncButton && <button>Bouton async</button>}
      </nav>
    </div>
  );
}
