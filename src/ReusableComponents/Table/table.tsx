import React from "react";
import styled from "styled-components";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  sortKey: keyof T;
  order: "asc" | "desc";
  onItemClick?: (item: T) => void;
  toggleOrder: (key: keyof T) => void;
  renderActions?: (item: T) => React.ReactNode;
  selectedIds?: Set<string>;
  toggleSelect?: (id: string) => void;
};

const Table = <T extends { id: string }>({
  columns,
  data,
  sortKey,
  order,
  toggleOrder,
  renderActions,
  onItemClick,
  selectedIds,
  toggleSelect,
}: TableProps<T>) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
      }}
    >
      <thead>
        <tr>
          {toggleSelect && <StyledTableHeader>Select</StyledTableHeader>}
          {columns.map((col) => (
            <StyledTableHeader
              key={String(col.key)}
              onClick={() => toggleOrder(col.key)}
            >
              {col.label}{" "}
              {sortKey === col.key ? (order === "asc" ? "▲" : "▼") : ""}
            </StyledTableHeader>
          ))}
          {renderActions && <StyledTableHeader>Actions</StyledTableHeader>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id} onClick={() => onItemClick?.(item)}>
              {toggleSelect && (
                <td
                  onClick={(e) => e.stopPropagation()} // prevent bubbling
                  style={{ padding: "8px" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds?.has(item.id) ?? false}
                    onChange={() => toggleSelect?.(item.id)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "8px",
                  }}
                >
                  {String(item[col.key])}
                </td>
              ))}
              {renderActions && (
                <td
                  style={{ padding: "8px" }}
                  onClick={(e) => e.stopPropagation()} // stop bubbling for actions
                >
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (renderActions ? 1 : 0)}>
              <div
                style={{ textAlign: "center", padding: "1rem", color: "#999" }}
              >
                No results found
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;

const StyledTableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 8px;
  cursor: pointer;
  text-align: center;
`;
