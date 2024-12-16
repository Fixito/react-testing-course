import { Item } from "../types";

interface ItemProps {
  items: Item[];
  onDelete: (id: string) => void;
}

export default function List({ items, onDelete }: ItemProps) {
  console.log(items);

  return <div>List</div>;
}
