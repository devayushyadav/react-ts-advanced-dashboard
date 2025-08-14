import { useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
};

const useSearch = ( items : Array<User>, searchKey : "name" | "email") => {
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
