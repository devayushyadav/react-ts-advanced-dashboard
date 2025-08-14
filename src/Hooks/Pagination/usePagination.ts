import { useEffect, useMemo, useState } from "react";

const usePagination = <T>(
  items: Array<T>,
  itemsPerPage: number,
  query: string
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  return {
    currentPage,
    nextPage,
    totalPages,
    prevPage,
    goToPage,
    paginatedItems,
  };
};

export default usePagination;
