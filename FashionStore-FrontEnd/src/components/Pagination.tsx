import React from "react";


interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalPages, currentPage, onPageChange } = props;

  const pageNumbers: number[] = [];

  if (totalPages > 1) {
    // Thêm các số trang trước và sau trang hiện tại
    if (currentPage > 2) pageNumbers.push(currentPage - 2);
    if (currentPage > 1) pageNumbers.push(currentPage - 1);
    pageNumbers.push(currentPage); // Thêm trang hiện tại
    if (currentPage < totalPages) pageNumbers.push(currentPage + 1);
    if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 2);
  }

  return (
    <>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {/* Render các số trang */}
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
