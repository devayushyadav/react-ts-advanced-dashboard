import { createContext } from "react";

type ListContextType<T> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
};

export const ListContext = createContext<ListContextType<any> | undefined>(
  undefined
);
