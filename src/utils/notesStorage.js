const STORAGE_KEY = "a2rp-notes";

export const getStoredNotes = () => {
    try {
        const storedNotes = localStorage.getItem(STORAGE_KEY);

        if (!storedNotes) {
            return [];
        }

        const parsedNotes = JSON.parse(storedNotes);

        if (!Array.isArray(parsedNotes)) {
            return [];
        }

        const now = new Date().toISOString();

        return parsedNotes
            .filter((note) =>
                note &&
                typeof note === "object" &&
                !Array.isArray(note) &&
                typeof note.id === "string" &&
                note.id.trim().length > 0,
            )
            .map((note) => {
                const createdAt = normalizeTimestamp(note.createdAt, now);

                return {
                    id: note.id,
                    title: typeof note.title === "string" ? note.title : "",
                    content: typeof note.content === "string" ? note.content : "",
                    category:
                        typeof note.category === "string" && note.category.trim()
                            ? note.category.trim()
                            : "General",
                    tags: Array.isArray(note.tags)
                        ? note.tags
                            .filter((tag) => typeof tag === "string")
                            .map((tag) => tag.trim())
                            .filter(Boolean)
                        : [],
                    pinned: note.pinned === true,
                    createdAt,
                    updatedAt: normalizeTimestamp(note.updatedAt, createdAt),
                };
            });
    } catch {
        return [];
    }
};

const normalizeTimestamp = (value, fallback) => {
    if (typeof value !== "string") {
        return fallback;
    }

    const timestamp = Date.parse(value);

    return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : fallback;
};

export const saveStoredNotes = (notes) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));

        return true;
    } catch {
        return false;
    }
};

export const createNote = ({ title, content, category, tags = [] }) => {
    const now = new Date().toISOString();

    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: title.trim(),
        content: content.trim(),
        category: category || "General",
        tags: normalizeTags(tags),
        pinned: false,
        createdAt: now,
        updatedAt: now,
    };
};

export const updateNote = (
    existingNote,
    { title, content, category, tags = [] },
) => {
    return {
        ...existingNote,
        title: title.trim(),
        content: content.trim(),
        category: category || "General",
        tags: normalizeTags(tags),
        updatedAt: new Date().toISOString(),
    };
};

export const toggleNotePin = (note) => {
    return {
        ...note,
        pinned: !note.pinned,
        updatedAt: new Date().toISOString(),
    };
};

export const normalizeTags = (tags) => {
    if (Array.isArray(tags)) {
        return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
    }

    if (typeof tags === "string") {
        return [
            ...new Set(
                tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            ),
        ];
    }

    return [];
};

export const getNoteById = (notes, noteId) => {
    return notes.find((note) => note.id === noteId) || null;
};

export const removeNoteById = (notes, noteId) => {
    return notes.filter((note) => note.id !== noteId);
};
