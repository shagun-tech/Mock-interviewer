import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const windowSize = 3;

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Calculate the start and end of the window
  const startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const endPage = Math.min(totalPages, startPage + windowSize - 1);

  return (
    <>
      <Pagination className={""}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className=""
              onClick={handlePreviousPage}
            />
          </PaginationItem>

          {/* Render pagination window */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const page = startPage + index;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  className=""
                  onClick={() => setCurrentPage(page)}
                  active={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {endPage < totalPages && (
            <>
              <PaginationEllipsis>...</PaginationEllipsis>
              <PaginationItem>
                <PaginationLink
                  className=""
                  onClick={() => setCurrentPage(totalPages)}
                  active={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              className=""
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default PaginationSection;