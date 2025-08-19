import { useState, useMemo } from "react";

function usePagination<T>(items: T[], initialPageSize: number = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // Ensure currentPage never exceeds totalPages
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const nextPage = () => setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  const prevPage = () => setCurrentPage((p) => (p > 1 ? p - 1 : p));
  const goToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(1, page), totalPages));

  return {
    currentPage: safePage,
    totalPages,
    paginatedItems,
    pageSize,
    setPageSize,
    setCurrentPage: goToPage,
    nextPage,
    prevPage,
  };
}

export default usePagination;
