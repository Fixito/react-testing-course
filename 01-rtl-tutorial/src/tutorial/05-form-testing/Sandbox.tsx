import { useState } from "react";
import validator from "validator";

const defaultState = { email: "", password: "", confirmPassword: "" };

const labelStyles = "text-grey-700 block font-medium";
const inputStyles = "border-gray-300 w-full rounded-md border px-3 py-2";
const buttonsStyles =
  "w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600";

export default function Sandbox() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupInput({ ...signupInput, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      return setError("Email invalide");
    }

    if (!validator.isLength(signupInput.password, { min: 5 })) {
      return setError("Le mot de passe doit contenir au moins 5 caractères");
    }

    if (signupInput.password !== signupInput.confirmPassword) {
      return setError("Les mots de passe ne correspondent pas");
    }

    setError("");
    setSignupInput(defaultState);
  };

  return (
    <div className="container mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* email */}
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className={inputStyles}
            onChange={handleChange}
            value={signupInput.email}
          />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password" className={labelStyles}>
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={inputStyles}
            onChange={handleChange}
            value={signupInput.password}
          />
        </div>

        {/* confirm password */}
        <div>
          <label htmlFor="confirmPassword" className={labelStyles}>
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={inputStyles}
            onChange={handleChange}
            value={signupInput.confirmPassword}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button className={buttonsStyles}>Se connecter</button>
      </form>
    </div>
  );
}
