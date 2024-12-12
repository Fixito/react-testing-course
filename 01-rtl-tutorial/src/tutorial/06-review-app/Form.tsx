import { useState } from "react";
import { Review } from "./Sandbox";

interface ReviewFormProps {
  onSubmit: (review: Review) => void;
}

const defaultState = {
  email: "",
  rating: "",
  text: "",
};

export default function Form({ onSubmit }: ReviewFormProps) {
  const [reviewInputs, setReviewInputs] = useState({
    email: "",
    rating: "",
    text: "",
  });
  const [textError, setTextError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setReviewInputs({ ...reviewInputs, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reviewInputs.text.length < 10) {
      setTextError("Votre avis doit contenir au moins 10 caractères");
      return;
    } else {
      setTextError("");
    }

    onSubmit(reviewInputs);
    setReviewInputs(defaultState);
  };

  return (
    <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
      {/* email */}
      <div>
        <label htmlFor="email" className="mb-2 block">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full rounded border p-2"
          onChange={handleChange}
          value={reviewInputs.email}
          required
        />
      </div>

      {/* rating */}
      <div>
        <label htmlFor="rating" className="mb-2 block">
          Note
        </label>
        <select
          name="rating"
          id="rating"
          className="w-full rounded border p-2"
          onChange={handleChange}
          value={reviewInputs.rating}
          required
        >
          <option value="">--Sélectionner une note--</option>
          {[1, 2, 3, 4, 5].map((num) => {
            return (
              <option key={num} value={num}>
                {num} étoile{num > 1 ? "s" : ""}
              </option>
            );
          })}
        </select>
      </div>

      {/* review */}
      <div>
        <label htmlFor="text" className="mb-2 block">
          Votre avis
        </label>
        <textarea
          name="text"
          id="text"
          rows={4}
          className="w-full rounded border p-2"
          onChange={handleChange}
          value={reviewInputs.text}
          required
        ></textarea>
      </div>

      {textError && <p className="mt-1 text-sm text-red-500">{textError}</p>}

      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Envoyer votre avis
      </button>
    </form>
  );
}
