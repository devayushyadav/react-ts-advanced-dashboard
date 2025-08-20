import { useContext } from "react";
import { ListContext } from "./ListContextInstance";

export function useList<T>() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context as {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
  };
}
