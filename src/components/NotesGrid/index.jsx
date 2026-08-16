import { FiFileText, FiSearch } from "react-icons/fi";

import NoteCard from "../NoteCard";

import { Styled } from "./styled";

function NotesGrid({
    notes,
    searchQuery,
    selectedCategory,
    onEdit,
    onTogglePin,
    onDelete,
}) {
    const hasFilters = searchQuery.trim() !== "" || selectedCategory !== "All";

    if (notes.length === 0) {
        return (
            <Styled.EmptyState>
                <span className="emptyIcon">
                    {hasFilters ? <FiSearch /> : <FiFileText />}
                </span>

                <h3>{hasFilters ? "No matching notes" : "No notes yet"}</h3>

                <p>
                    {hasFilters
                        ? "Try changing your search text or category filter."
                        : "Create your first note and it will appear here."}
                </p>
            </Styled.EmptyState>
        );
    }

    return (
        <Styled.Wrapper>
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onTogglePin={onTogglePin}
                    onDelete={onDelete}
                />
            ))}
        </Styled.Wrapper>
    );
}

export default NotesGrid;
