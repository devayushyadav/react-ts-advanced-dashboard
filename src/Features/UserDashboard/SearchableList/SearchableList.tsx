import { useEffect, useState } from "react";
import AddOrEditData from "./AddOrEditData";
import useSearch from "../../../Hooks/Search/useSearch";
import useSort from "../../../Hooks/Sort/useSort";
import Table from "../../../ReusableComponents/Table/table";
import SearchBox from "../../../ReusableComponents/SearchBox/SearchBox";
import Pagination from "../../../ReusableComponents/Pagination/Pagination";
import usePagination from "../../../Hooks/Pagination/usePagination";

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

  const {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination<T>(sortedItems, paginationCount);

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

  // inside SearchableList

  // TOGGLE ALL SELECTION (for current page)
  const toggleSelectAll = () => {
    if (allSelected) {
      // unselect all on current page
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        paginatedItems.forEach((item) => newSet.delete(item.id));
        return newSet;
      });
    } else {
      // select all on current page
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        paginatedItems.forEach((item) => newSet.add(item.id));
        return newSet;
      });
    }
  };

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
      <SearchBox
        query={query}
        setQuery={setQuery}
        placeholder={`Search by ${String(searchKey)}...`}
        styles={{}}
      />

      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AddOrEditData<T> setData={setData} variant="add" />

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
      </div>

      <Table<T>
        data={paginatedItems}
        sortKey={sortKey}
        order={order}
        toggleOrder={toggleOrder}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default SearchableList;
