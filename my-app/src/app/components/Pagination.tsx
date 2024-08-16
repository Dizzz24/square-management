interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
      <span className="text-gray-500">Showing {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, totalPages * 10)} Data Customers</span>
      <div className="flex space-x-2">
        <button
          className={`p-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {currentPage > 2 && totalPages > 3 && (
          <>
            <button
              className="p-2 bg-gray-200 text-gray-600 rounded"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {currentPage > 3 && (
              <span className="p-2 text-gray-600">...</span>
            )}
          </>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
          .map(page => (
            <button
              key={page}
              className={`p-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        {currentPage < totalPages - 2 && totalPages > 3 && (
          <>
            {currentPage < totalPages - 1 && (
              <span className="p-2 text-gray-600">...</span>
            )}
            <button
              className="p-2 bg-gray-200 text-gray-600 rounded"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className={`p-2 ${currentPage === totalPages ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
