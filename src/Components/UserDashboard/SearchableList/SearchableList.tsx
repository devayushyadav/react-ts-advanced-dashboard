import { motion, AnimatePresence } from "framer-motion";
import usePagination from "../../../Hooks/Pagination/usePagination";
import { useEffect, useState } from "react";
import AddOrEditData from "./AddOrEditData";
import useSearch from "../../../Hooks/Search/useSearch";
import useSort from "../../../Hooks/Sort/useSort";

type Props<T extends { id: string }> = {
  items: Array<T>;
  searchKey: keyof T /*(key of user means name | email)*/;
  renderItem: (item: T) => React.ReactNode;
  sortKey: keyof T;
  onItemClick?: (item: T) => void; // ✅ Parent handles modal
  paginationCount: number;
  localStorageKey: string;
};

const SearchableList = <T extends { id: string }>({
  items,
  searchKey,
  renderItem,
  sortKey,
  onItemClick,
  localStorageKey,
  paginationCount,
}: Props<T>) => {
  const [data, setData] = useState<Array<T>>(items);
  const { query, setQuery, filteredItems } = useSearch<T>(data, searchKey);
  const { sortedItems, toggleOrder, order } = useSort<T>(
    filteredItems,
    sortKey
  );
  const { currentPage, totalPages, paginatedItems, nextPage, prevPage } =
    usePagination<T>(sortedItems, paginationCount, query);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [data, localStorageKey]);

  // DELETE USER FUNCTION
  const deleteUser = (id: string) => {
    setData((prev) => prev.filter((user) => user.id !== id));
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
        <AddOrEditData<T> setData={setData} variant="add" />
      </div>

      {/* List with Animation */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredItems.length > 0 && (
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
                <AddOrEditData<T>
                  setData={setData}
                  variant="edit"
                  editingItem={item}
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
        )}

        {filteredItems.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              color: "#777",
            }}
          >
            <p>No results match your search</p>
            <small>Try adjusting your query or adding a new item.</small>
          </div>
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
