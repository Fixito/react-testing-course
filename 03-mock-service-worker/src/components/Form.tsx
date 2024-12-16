import { ChangeEvent, FormEvent, useState } from "react";

interface FormProps {
  onSubmit: (data: { title: string; likes: number }) => Promise<void>;
}

export default function Form({ onSubmit }: FormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, likes: 0 });
    setTitle("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label htmlFor="title" className="sr-only">
        Titre
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleChange}
        placeholder="Entre le titre du poste"
        className="mr-2 w-64 rounded border p-2"
        required
      />
      <button
        type="submit"
        className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
      >
        Ajouter un poste
      </button>
    </form>
  );
}
