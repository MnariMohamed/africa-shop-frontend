import React from "react";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  page,
  onPageChange,
}) => {
  const numPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-5">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:bg-blue-300 hover:bg-palette-tertiary"
      >
        Précédente
      </button>
      {Array.from({ length: numPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          disabled={page === i + 1}
          className={`px-3 py-1 rounded-md text-sm md:text-base ${
            page === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === numPages}
        className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:bg-blue-300 hover:bg-palette-tertiary"
      >
        Suivante
      </button>
    </div>
  );
};

export default Pagination;
