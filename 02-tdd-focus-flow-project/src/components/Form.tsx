import { useState } from "react";
import { ItemWithoutID, ItemCategory } from "../types";

interface FormProps {
  onSubmit: (item: ItemWithoutID) => void;
}

const defaultState = { title: "", description: "", category: "" };

const labelStyles = "mb-2 block text-sm font-medium leading-none";
const inputStyles = "flex h-10 w-full rounded-md border px-3 py-2 text-sm";

export default function Form({ onSubmit }: FormProps) {
  const [inputs, setInputs] = useState(defaultState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, category } = inputs;
    if (!title || !description || !category) return;
    onSubmit({ ...inputs, category: inputs.category as ItemCategory });
    setInputs(defaultState);
  };

  return (
    <div className="max-w-xl">
      <h2 className="mb-2 text-xl font-semibold">Ajouter une tâche</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* title */}
        <div>
          <label htmlFor="title" className={labelStyles}>
            Titre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={inputStyles}
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* description */}
        <div>
          <label htmlFor="description" className={labelStyles}>
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className={inputStyles}
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* category */}
        <div>
          <label htmlFor="category" className={labelStyles}>
            Catégorie
          </label>
          <select
            name="category"
            id="category"
            className={inputStyles}
            value={inputs.category}
            onChange={handleChange}
            required
          >
            <option value="">--Sélectionner une catégorie--</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
            <option value="normal">Normal</option>
            <option value="low">Faible priorité</option>
          </select>
        </div>

        <button
          type="submit"
          className="h-10 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Ajouter une tâche
        </button>
      </form>
    </div>
  );
}
