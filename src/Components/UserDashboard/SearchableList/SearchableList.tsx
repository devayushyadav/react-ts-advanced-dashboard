import { motion, AnimatePresence } from "framer-motion";
import usePagination from "./usePagination";
import useSearch from "./useSearch";
import useSort from "./useSort";
import { useState } from "react";
import AddUser from "./Adduser";
import type { User } from "../Types/Types";

type Props = {
  items: Array<User>;
  searchKey: keyof User /*(key of user means name | email)*/;
  renderItem: (item: User) => React.ReactNode;
  sortKey: keyof User;
  onItemClick?: (item: User) => void; // ✅ Parent handles modal
};

const SearchableList = ({
  items,
  searchKey,
  renderItem,
  sortKey,
  onItemClick,
}: Props) => {
  const [users, setUsers] = useState<Array<User>>(items);
  const { query, setQuery, filteredItems } = useSearch(users, searchKey);
  const { sortedItems, toggleOrder, order } = useSort(filteredItems, sortKey);
  const { currentPage, totalPages, paginatedItems, nextPage, prevPage } =
    usePagination(sortedItems, 3);

  return (
    <div
      className="searchable-list"
      style={{ maxWidth: "300px", margin: "auto" }}
    >
      {/* Search Box */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search by ${String(searchKey)}...`}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {/* Sort Button */}
        <button onClick={toggleOrder}>
          Sort by {String(sortKey)} ({order})
        </button>
        <AddUser setUsers={setUsers} />
      </div>

      {/* List with Animation */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <AnimatePresence mode="popLayout">
          {paginatedItems.map((item) => (
            <motion.li
              key={item.email}
              style={{ padding: "4px 0", cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onClick={() => onItemClick?.(item)}
              onKeyDown={(e) => e.key === "Enter" && onItemClick?.(item)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderItem(item)}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchableList;
