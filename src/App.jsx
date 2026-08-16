import { useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";

import Footer from "./components/Footer";
import Header from "./components/Header";
import NoteModal from "./components/NoteModal";
import NotesTable from "./components/NotesTable";
import NotesToolbar from "./components/NotesToolbar";
import Notifications from "./components/Notifications";
import Pagination from "./components/Pagination";
import ViewNoteModal from "./components/ViewNoteModal";

import { confirmDeleteNote } from "./utils/alerts";

import {
    createNote,
    getStoredNotes,
    removeNoteById,
    saveStoredNotes,
    toggleNotePin,
    updateNote,
} from "./utils/notesStorage";

import {
    DEFAULT_PAGE_SIZE,
    SORT_DIRECTIONS,
    filterNotes,
    processNotesTable,
} from "./utils/tableUtils";

import { Styled } from "./App.styled";

const DEFAULT_FORM = {
    title: "",
    content: "",
    category: "General",
    tags: "",
};

function App() {
    const [notes, setNotes] = useState(() => getStoredNotes());

    const [form, setForm] = useState(DEFAULT_FORM);

    const [editingNoteId, setEditingNoteId] = useState(null);

    const [viewingNote, setViewingNote] = useState(null);

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [pinnedFilter, setPinnedFilter] = useState("all");

    const [sortKey, setSortKey] = useState("updatedAt");

    const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.DESC);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    useEffect(() => {
        saveStoredNotes(notes);
    }, [notes]);

    const categories = useMemo(() => {
        const availableCategories = notes.map(
            (note) => note.category || "General",
        );

        return [
            "All",
            ...new Set([
                "General",
                "Personal",
                "Work",
                "Ideas",
                ...availableCategories,
            ]),
        ];
    }, [notes]);

    const filteredNotes = useMemo(() => {
        return filterNotes({
            notes,
            searchQuery,
            category: selectedCategory,
            pinnedFilter,
        });
    }, [notes, searchQuery, selectedCategory, pinnedFilter]);

    const tableData = useMemo(() => {
        return processNotesTable({
            notes,
            searchQuery,
            category: selectedCategory,
            pinnedFilter,
            sortKey,
            sortDirection,
            page: currentPage,
            pageSize,
        });
    }, [
        notes,
        searchQuery,
        selectedCategory,
        pinnedFilter,
        sortKey,
        sortDirection,
        currentPage,
        pageSize,
    ]);

    useEffect(() => {
        if (currentPage > tableData.totalPages) {
            setCurrentPage(tableData.totalPages);
        }
    }, [currentPage, tableData.totalPages]);

    const resetForm = () => {
        setForm(DEFAULT_FORM);
        setEditingNoteId(null);
    };

    const openAddModal = () => {
        resetForm();
        setViewingNote(null);
        setIsNoteModalOpen(true);
    };

    const closeNoteModal = () => {
        setIsNoteModalOpen(false);
        resetForm();
    };

    const handleFormChange = (field, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    };

    const handleSaveNote = () => {
        const title = form.title.trim();

        const content = form.content.trim();

        if (!title) {
            toast.warning("Please enter a note title.");

            return;
        }

        if (!content) {
            toast.warning("Please enter some note content.");

            return;
        }

        if (editingNoteId) {
            setNotes((currentNotes) =>
                currentNotes.map((note) => {
                    if (note.id !== editingNoteId) {
                        return note;
                    }

                    return updateNote(note, form);
                }),
            );

            toast.success("Note updated successfully.");
        } else {
            const newNote = createNote(form);

            setNotes((currentNotes) => [newNote, ...currentNotes]);

            toast.success("Note created successfully.");
        }

        closeNoteModal();
        setCurrentPage(1);
    };

    const handleViewNote = (note) => {
        setViewingNote(note);
    };

    const handleCloseView = () => {
        setViewingNote(null);
    };

    const handleEditNote = (note) => {
        setViewingNote(null);

        setEditingNoteId(note.id);

        setForm({
            title: note.title,
            content: note.content,
            category: note.category,
            tags: (note.tags || []).join(", "),
        });

        setIsNoteModalOpen(true);
    };

    const handleTogglePin = (noteId) => {
        let pinnedState = false;

        setNotes((currentNotes) =>
            currentNotes.map((note) => {
                if (note.id !== noteId) {
                    return note;
                }

                const updatedNote = toggleNotePin(note);

                pinnedState = updatedNote.pinned;

                return updatedNote;
            }),
        );

        toast.success(pinnedState ? "Note pinned." : "Note unpinned.");
    };

    const handleDeleteNote = async (note) => {
        const confirmed = await confirmDeleteNote(note);

        if (!confirmed) {
            return;
        }

        setNotes((currentNotes) => removeNoteById(currentNotes, note.id));

        if (editingNoteId === note.id) {
            closeNoteModal();
        }

        if (viewingNote?.id === note.id) {
            setViewingNote(null);
        }

        toast.success("Note deleted successfully.");
    };

    const handleSort = (columnKey) => {
        if (sortKey === columnKey) {
            setSortDirection((currentDirection) =>
                currentDirection === SORT_DIRECTIONS.ASC
                    ? SORT_DIRECTIONS.DESC
                    : SORT_DIRECTIONS.ASC,
            );
        } else {
            setSortKey(columnKey);

            setSortDirection(
                columnKey === "createdAt" || columnKey === "updatedAt"
                    ? SORT_DIRECTIONS.DESC
                    : SORT_DIRECTIONS.ASC,
            );
        }

        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    };

    const handlePinnedFilterChange = (value) => {
        setPinnedFilter(value);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setPinnedFilter("all");
        setCurrentPage(1);
    };

    const handlePageSizeChange = (value) => {
        setPageSize(value);
        setCurrentPage(1);
    };

    return (
        <Styled.Wrapper id="top">
            <Header totalNotes={notes.length} />

            <main>
                <NotesToolbar
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    pinnedFilter={pinnedFilter}
                    categories={categories}
                    filteredCount={filteredNotes.length}
                    totalNotes={notes.length}
                    onSearchChange={handleSearchChange}
                    onCategoryChange={handleCategoryChange}
                    onPinnedFilterChange={handlePinnedFilterChange}
                    onClearFilters={handleClearFilters}
                    onAddNote={openAddModal}
                />

                <div className="tableSection">
                    <NotesTable
                        notes={tableData.items}
                        startIndex={
                            tableData.startItem ? tableData.startItem - 1 : 0
                        }
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                        onView={handleViewNote}
                        onEdit={handleEditNote}
                        onTogglePin={handleTogglePin}
                        onDelete={handleDeleteNote}
                    />

                    <Pagination
                        currentPage={tableData.currentPage}
                        totalPages={tableData.totalPages}
                        pageSize={tableData.pageSize}
                        totalItems={tableData.totalItems}
                        startItem={tableData.startItem}
                        endItem={tableData.endItem}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={handlePageSizeChange}
                    />
                </div>
            </main>

            <Footer />

            <NoteModal
                isOpen={isNoteModalOpen}
                isEditing={Boolean(editingNoteId)}
                form={form}
                onChange={handleFormChange}
                onSave={handleSaveNote}
                onClose={closeNoteModal}
            />

            <ViewNoteModal
                isOpen={Boolean(viewingNote)}
                note={viewingNote}
                onClose={handleCloseView}
                onEdit={handleEditNote}
            />

            <Notifications />
        </Styled.Wrapper>
    );
}

export default App;
