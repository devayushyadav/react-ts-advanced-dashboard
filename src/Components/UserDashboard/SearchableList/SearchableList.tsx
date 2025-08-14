import { motion, AnimatePresence } from "framer-motion";
import usePagination from "./usePagination";
import useSearch from "./useSearch";
import useSort from "./useSort";
import { useState } from "react";
import AddOrEdituser from "./AddOrEdituser";
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

  // DELETE USER FUNCTION
  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

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
        <AddOrEdituser setUsers={setUsers} variant="add" />
      </div>

      {/* List with Animation */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredItems.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item) => (
              <motion.li
                key={item.id}
                style={{
                  padding: "6px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onItemClick?.(item)}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => onItemClick?.(item)}
                >
                  {renderItem(item)}
                </span>
                <AddOrEdituser
                  setUsers={setUsers}
                  variant="edit"
                  editingUser={item}
                />
                <button
                  style={{
                    background: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteUser(item.id)}
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        ) : (
          <div>No result found</div>
        )}
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
