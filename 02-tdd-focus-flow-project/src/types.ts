export type ItemCategory = "urgent" | "important" | "normal" | "low";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
}

export type ItemWithoutID = Omit<Item, "id">;
