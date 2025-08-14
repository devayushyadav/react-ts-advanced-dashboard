import { useMemo, useState } from "react";

type sort = "asc" | "desc";

const useSort = <T>(items: Array<T>, sortKey: keyof T) => {
  const [order, setOrder] = useState<sort>("asc");

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const aValue = String(a[sortKey] ?? "").toLowerCase();
      const bValue = String(b[sortKey] ?? "").toLowerCase();

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [items, sortKey, order]);

  const toggleOrder = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return { sortedItems, toggleOrder, order };
};

export default useSort;
