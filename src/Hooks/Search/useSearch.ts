import { useMemo, useState } from "react";

const useSearch = <T>(items: Array<T>, searchKey: keyof T) => {
  const [query, setQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return items.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(lowerQuery)
    );
  }, [items, searchKey, query]);

  return { query, setQuery, filteredItems };
};

export default useSearch;
