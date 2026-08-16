import { FiFilter, FiPlus, FiSearch, FiX } from "react-icons/fi";

import { Styled } from "./styled";

function NotesToolbar({
    searchQuery,
    selectedCategory,
    pinnedFilter,
    categories,
    filteredCount,
    totalNotes,
    onSearchChange,
    onCategoryChange,
    onPinnedFilterChange,
    onClearFilters,
    onAddNote,
}) {
    const hasFilters =
        searchQuery.trim() !== "" ||
        selectedCategory !== "All" ||
        pinnedFilter !== "all";

    return (
        <Styled.Wrapper>
            <div className="toolbarHeader">
                <div>
                    <span className="sectionLabel">Notes Library</span>

                    <h1>Manage your notes</h1>

                    <p>
                        Search, organize, sort and manage your saved notes from
                        one place.
                    </p>
                </div>

                <button className="addButton" type="button" onClick={onAddNote}>
                    <FiPlus />
                    <span>Add Note</span>
                </button>
            </div>

            <div className="toolbarBody">
                <div className="searchBox">
                    <FiSearch />

                    <input
                        type="search"
                        value={searchQuery}
                        placeholder="Search title, content, tags or category..."
                        aria-label="Search notes"
                        onChange={(event) => onSearchChange(event.target.value)}
                    />

                    {searchQuery && (
                        <button
                            type="button"
                            className="clearSearch"
                            onClick={() => onSearchChange("")}
                            aria-label="Clear search"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                <div className="filterBox">
                    <FiFilter />

                    <select
                        value={selectedCategory}
                        aria-label="Filter by category"
                        onChange={(event) =>
                            onCategoryChange(event.target.value)
                        }
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filterBox">
                    <FiFilter />

                    <select
                        value={pinnedFilter}
                        aria-label="Filter by pin status"
                        onChange={(event) =>
                            onPinnedFilterChange(event.target.value)
                        }
                    >
                        <option value="all">All Status</option>

                        <option value="pinned">Pinned</option>

                        <option value="unpinned">Normal</option>
                    </select>
                </div>

                {hasFilters && (
                    <button
                        className="clearFiltersButton"
                        type="button"
                        onClick={onClearFilters}
                    >
                        <FiX />
                        <span>Clear</span>
                    </button>
                )}
            </div>

            <div className="toolbarFooter">
                <div className="resultCount">
                    <strong>{filteredCount}</strong>

                    <span>of {totalNotes} notes</span>
                </div>

                <div className="toolbarHint">
                    Click table headers to sort columns
                </div>
            </div>
        </Styled.Wrapper>
    );
}

export default NotesToolbar;
