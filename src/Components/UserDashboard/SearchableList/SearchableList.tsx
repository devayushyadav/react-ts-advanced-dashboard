import usePagination from "../../../Hooks/Pagination/usePagination";
import { useEffect, useState } from "react";
import AddOrEditData from "./AddOrEditData";
import useSearch from "../../../Hooks/Search/useSearch";
import useSort from "../../../Hooks/Sort/useSort";
import Table from "../../../ReusableComponents/Table/table";

type Props<T extends { id: string }> = {
  items: Array<T>;
  searchKey: keyof T;
  sortKey: keyof T;
  onItemClick?: (item: T) => void;
  paginationCount: number;
  localStorageKey: string;
};

const SearchableList = <T extends { id: string }>({
  items,
  searchKey,
  sortKey,
  localStorageKey,
  paginationCount,
  onItemClick,
}: Props<T>) => {
  const [data, setData] = useState<Array<T>>(items);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

  // DELETE SINGLE
  const deleteUser = (id: string) => {
    setData((prev) => prev.filter((user) => user.id !== id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // DELETE MULTIPLE
  const deleteSelected = () => {
    setData((prev) => prev.filter((user) => !selectedIds.has(user.id)));
    setSelectedIds(new Set());
  };

  // TOGGLE SELECTION
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const allSelected =
    paginatedItems.length > 0 && selectedIds.size === paginatedItems.length;

  return (
    <div
      className="searchable-list"
      style={{
        maxWidth: "600px",
        width: "100vh",
        margin: "auto",
      }}
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
          justifyContent: "space-between",
        }}
      >
        {selectedIds.size > 0 && (
          <button
            style={{
              background: "#f44336",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={deleteSelected}
          >
            Delete Selected ({selectedIds.size})
          </button>
        )}

        <AddOrEditData<T> setData={setData} variant="add" />
      </div>

      <Table<T>
        data={paginatedItems}
        sortKey={sortKey}
        order={order}
        toggleOrder={toggleOrder}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        renderActions={(item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
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
          </div>
        )}
        onItemClick={onItemClick}
        columns={[
          { key: "name" as keyof T, label: "Name" },
          { key: "email" as keyof T, label: "Email" },
        ]}
        allSelected={allSelected}
      />

      {/* Pagination Controls */}
      <div style={{ margin: "40px auto" }}>
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
