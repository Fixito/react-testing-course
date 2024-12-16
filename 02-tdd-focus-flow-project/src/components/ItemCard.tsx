import { Trash2 } from "lucide-react";
import { Item } from "../types";

interface ItemCardProps extends Item {
  onDelete: (id: string) => void;
}

const categoryColors = {
  urgent: "bg-red-500",
  important: "bg-yellow-500",
  normal: "bg-blue-500",
  low: "bg-green-500",
};

export default function ItemCard({
  id,
  title,
  description,
  category,
  onDelete,
}: ItemCardProps) {
  return (
    <article className="w-full rounded-lg border shadow-sm">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md"
          aria-label={`Supprimer la tâche : ${id}`}
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6 pt-2">
        <p className="mb-2 text-sm">{description}</p>
        <div
          className={`inline-block ${categoryColors[category] || "bg-gray-500"} rounded px-2 py-1 text-xs font-semibold capitalize text-white`}
        >
          {category}
        </div>
      </div>
    </article>
  );
}
