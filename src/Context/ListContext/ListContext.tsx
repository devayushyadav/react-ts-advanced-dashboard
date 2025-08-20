import { useState, type ReactNode } from "react";
import { ListContext } from "./ListContextInstance";

export function ListProvider<T>({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: T[];
}) {
  const [data, setData] = useState<T[]>(initialData);

  return (
    <ListContext.Provider value={{ data, setData }}>
      {children}
    </ListContext.Provider>
  );
}
