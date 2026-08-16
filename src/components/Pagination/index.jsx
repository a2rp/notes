import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { PAGE_SIZE_OPTIONS, getPaginationPages } from "../../utils/tableUtils";

import { Styled } from "./styled";

function Pagination({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    startItem,
    endItem,
    onPageChange,
    onPageSizeChange,
}) {
    const pages = getPaginationPages({
        currentPage,
        totalPages,
    });

    return (
        <Styled.Wrapper>
            <div className="resultInfo">
                <span>Showing</span>

                <strong>
                    {startItem}-{endItem}
                </strong>

                <span>of</span>

                <strong>{totalItems}</strong>

                <span>notes</span>
            </div>

            <div className="paginationControls">
                <button
                    type="button"
                    className="navigationButton"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    aria-label="Previous page"
                    title="Previous page"
                >
                    <FiChevronLeft />
                </button>

                <div className="pageNumbers">
                    {pages.map((page, index) => {
                        if (page === "...") {
                            return (
                                <span
                                    className="ellipsis"
                                    key={`ellipsis-${index}`}
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                type="button"
                                key={page}
                                className={
                                    page === currentPage
                                        ? "pageButton active"
                                        : "pageButton"
                                }
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className="navigationButton"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    aria-label="Next page"
                    title="Next page"
                >
                    <FiChevronRight />
                </button>
            </div>

            <div className="pageSize">
                <label htmlFor="rows-per-page">Rows</label>

                <select
                    id="rows-per-page"
                    value={pageSize}
                    onChange={(event) =>
                        onPageSizeChange(Number(event.target.value))
                    }
                >
                    {PAGE_SIZE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </Styled.Wrapper>
    );
}

export default Pagination;
