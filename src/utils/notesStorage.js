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

        return parsedNotes.map((note) => ({
            id: note.id,
            title: note.title || "",
            content: note.content || "",
            category: note.category || "General",
            tags: Array.isArray(note.tags) ? note.tags : [],
            pinned: Boolean(note.pinned),
            createdAt: note.createdAt || new Date().toISOString(),
            updatedAt:
                note.updatedAt || note.createdAt || new Date().toISOString(),
        }));
    } catch {
        return [];
    }
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
