export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const SORT_DIRECTIONS = {
    ASC: "asc",
    DESC: "desc",
};

const normalizeText = (value) => {
    return String(value || "")
        .trim()
        .toLowerCase();
};

const getSortableValue = (note, key) => {
    if (key === "title") {
        return normalizeText(note.title);
    }

    if (key === "category") {
        return normalizeText(note.category);
    }

    if (key === "createdAt") {
        return new Date(note.createdAt).getTime();
    }

    if (key === "updatedAt") {
        return new Date(note.updatedAt).getTime();
    }

    if (key === "pinned") {
        return note.pinned ? 1 : 0;
    }

    return normalizeText(note[key]);
};

export const filterNotes = ({ notes, searchQuery, category, pinnedFilter }) => {
    const normalizedSearch = normalizeText(searchQuery);

    return notes.filter((note) => {
        const matchesCategory =
            !category || category === "All" || note.category === category;

        const matchesPinned =
            pinnedFilter === "all" ||
            (pinnedFilter === "pinned" && note.pinned) ||
            (pinnedFilter === "unpinned" && !note.pinned);

        const searchableContent = [
            note.title,
            note.content,
            note.category,
            ...(note.tags || []),
        ]
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !normalizedSearch || searchableContent.includes(normalizedSearch);

        return matchesCategory && matchesPinned && matchesSearch;
    });
};

export const sortNotes = ({ notes, sortKey, sortDirection }) => {
    const directionMultiplier = sortDirection === SORT_DIRECTIONS.ASC ? 1 : -1;

    return [...notes].sort((a, b) => {
        const aValue = getSortableValue(a, sortKey);

        const bValue = getSortableValue(b, sortKey);

        if (aValue < bValue) {
            return -1 * directionMultiplier;
        }

        if (aValue > bValue) {
            return 1 * directionMultiplier;
        }

        return 0;
    });
};

export const paginateNotes = ({ notes, page, pageSize }) => {
    const safePageSize =
        Number(pageSize) > 0 ? Number(pageSize) : DEFAULT_PAGE_SIZE;

    const totalItems = notes.length;

    const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

    const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);

    const startIndex = (currentPage - 1) * safePageSize;

    const endIndex = startIndex + safePageSize;

    return {
        items: notes.slice(startIndex, endIndex),
        currentPage,
        pageSize: safePageSize,
        totalItems,
        totalPages,
        startItem: totalItems === 0 ? 0 : startIndex + 1,
        endItem: Math.min(endIndex, totalItems),
    };
};

export const getPaginationPages = ({ currentPage, totalPages }) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};

export const processNotesTable = ({
    notes,
    searchQuery = "",
    category = "All",
    pinnedFilter = "all",
    sortKey = "updatedAt",
    sortDirection = SORT_DIRECTIONS.DESC,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
}) => {
    const filteredNotes = filterNotes({
        notes,
        searchQuery,
        category,
        pinnedFilter,
    });

    const sortedNotes = sortNotes({
        notes: filteredNotes,
        sortKey,
        sortDirection,
    });

    return paginateNotes({
        notes: sortedNotes,
        page,
        pageSize,
    });
};
