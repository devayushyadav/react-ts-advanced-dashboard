import React, { useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handleJump = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange?.(inputPage);
    }
  };

  return (
    <div
      style={{
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {/* Prev/Next */}
      <button onClick={onPrev} disabled={currentPage === 1}>
        Prev
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>

      {/* Jump to Page */}
      {onPageChange && (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(Number(e.target.value))}
            style={{ width: "60px", padding: "4px" }}
          />
          <button onClick={handleJump}>Go</button>
        </div>
      )}

      {/* Page Size Selector */}
      {onPageSizeChange && (
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ padding: "4px" }}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Pagination;
