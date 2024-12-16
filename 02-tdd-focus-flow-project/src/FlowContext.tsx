import { createContext, ReactNode, useContext, useState } from "react";
import { Item, ItemWithoutID } from "./types";

interface FlowContextType {
  items: Item[];
  handleAddItem: (item: ItemWithoutID) => void;
  handleDeleteItem: (id: string) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export default function FlowProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (newItem: ItemWithoutID) => {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return (
    <FlowContext.Provider value={{ items, handleAddItem, handleDeleteItem }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlowContext() {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error("useFlowContext must be used within a FlowProvider");
  }

  return context;
}
