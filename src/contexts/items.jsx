import { createContext } from "react";

export const ItemsContext = createContext({
  items: [],
  setItems: () => {},
});
export const ItemEditContext = createContext({
  editItem: null,
  setEditItem: () => {},
});
