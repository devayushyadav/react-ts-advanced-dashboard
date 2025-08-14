import usePagination from "./usePagination";
import useSearch from "./useSearch";
import useSort from "./useSort";

type User = {
  name: string;
  email: string;
};

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
  const { query, setQuery, filteredItems } = useSearch(items, searchKey);

  const { sortedItems, toggleOrder, order } = useSort(filteredItems, sortKey);

  const { currentPage, totalPages, paginatedItems, nextPage, prevPage } =
    usePagination(sortedItems, 3);

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      {/* Search Box */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search by ${String(searchKey)}...`}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button onClick={toggleOrder} style={{ marginBottom: "10px" }}>
        Sort by {String(sortKey)} ({order})
      </button>

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {paginatedItems.map((item, index) => (
          <li
            key={index}
            style={{ padding: "4px 0" }}
            onClick={() => onItemClick?.(item)}
          >
            {renderItem(item)}
          </li>
        ))}
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
