import { FiFileText } from "react-icons/fi";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

import { Styled } from "./styled";

function NotesTable({
    notes,
    startIndex,
    sortKey,
    sortDirection,
    onSort,
    onView,
    onEdit,
    onTogglePin,
    onDelete,
}) {
    if (notes.length === 0) {
        return (
            <Styled.EmptyState>
                <span className="emptyIcon">
                    <FiFileText />
                </span>

                <h3>No notes found</h3>

                <p>Create a new note or adjust your search and filters.</p>
            </Styled.EmptyState>
        );
    }

    return (
        <Styled.Wrapper>
            <div className="tableScroller">
                <table>
                    <TableHeader
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={onSort}
                    />

                    <tbody>
                        {notes.map((note, index) => (
                            <TableRow
                                key={note.id}
                                note={note}
                                index={startIndex + index + 1}
                                onView={onView}
                                onEdit={onEdit}
                                onTogglePin={onTogglePin}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Styled.Wrapper>
    );
}

export default NotesTable;
