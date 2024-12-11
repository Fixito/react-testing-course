import { useEffect, useState } from "react";

export default function Sandbox() {
  const [showMessage, setShowMessage] = useState(false);
  const [showError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>React Testing Library exemples</h1>
      <p>Tu peux me chercher avec une expression régulière</p>
      {showError && <div role="alert">Message d'erreur</div>}
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
      {showMessage && <p>Message asynchrone</p>}
    </div>
  );
}
