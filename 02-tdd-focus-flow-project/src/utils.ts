import { useState } from "react";
import { Item, ItemWithoutID } from "./types";

export const useFlowManager = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (newItem: ItemWithoutID) => {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return { items, handleAddItem, handleDeleteItem };
};
