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
  return (
    <div className="flex justify-between">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pagination-btn ${
          currentPage === 1 ? "bg-gray-200" : "hover:bg-gray-200"
        }`}
      >
        Previous page
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`pagination-btn ${
            currentPage === i + 1 ? "bg-gray-700 text-white" : "border"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`pagination-btn ${
          currentPage === totalPages ? "bg-gray-200" : "hover:bg-gray-200"
        }`}
      >
        Next page
      </button>
    </div>
  );
};

export default Pagination;
