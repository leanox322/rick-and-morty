import { FC } from "react";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  let startPage = Math.max(currentPage - 2, 1);
  if (currentPage > totalPages - 2) {
    startPage = Math.max(totalPages - 4, 1);
  }

  let endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className="flex justify-between">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`btn-primary ${
          currentPage === 1 ? "bg-gray-200" : "hover:bg-gray-200"
        }`}
      >
        Previous page
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          onClick={() => onPageChange(startPage + i)}
          className={`btn-primary ${
            currentPage === startPage + i ? "bg-gray-700 text-white" : "border"
          }`}
        >
          {startPage + i}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`btn-primary ${
          currentPage === totalPages ? "bg-gray-200" : "hover:bg-gray-200"
        }`}
      >
        Next page
      </button>
    </div>
  );
};

export default Pagination;
