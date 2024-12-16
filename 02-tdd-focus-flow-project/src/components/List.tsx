import { Item } from "../types";
import ItemCard from "./ItemCard";

interface ItemProps {
  items: Item[];
  onDelete: (id: string) => void;
}

export default function List({ items, onDelete }: ItemProps) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-xl font-semibold">Panneau d'affichage</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          return <ItemCard key={item.id} {...item} onDelete={onDelete} />;
        })}
      </div>
    </section>
  );
}
