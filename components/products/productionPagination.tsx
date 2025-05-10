import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ProductPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
                &lt;
            </button>
            {getPageNumbers().map((page, idx) =>
                typeof page === "number" ? (
                    <button
                        key={idx}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 border rounded ${
                            currentPage === page
                                ? "bg-gray-100 border-gray-400 font-semibold"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={idx} className="px-2 text-gray-500">
                        ...
                    </span>
                )
            )}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
                &gt;
            </button>
        </div>
    );
};

export default ProductPagination;
