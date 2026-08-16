import { FiEdit3, FiHash, FiTrash2 } from "react-icons/fi";

import { Styled } from "./styled";
import { MdPushPin } from "react-icons/md";

const formatDate = (dateValue) => {
    const date = new Date(dateValue);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

function NoteCard({ note, onEdit, onTogglePin, onDelete }) {
    return (
        <Styled.Wrapper className={note.pinned ? "pinned" : ""}>
            <div className="cardTop">
                <div className="meta">
                    <span className="category">{note.category}</span>

                    {note.pinned && (
                        <span className="pinnedLabel">
                            <MdPushPin />
                            Pinned
                        </span>
                    )}
                </div>

                <div className="actions">
                    <button
                        type="button"
                        className="iconButton"
                        onClick={() => onTogglePin(note.id)}
                        aria-label={note.pinned ? "Unpin note" : "Pin note"}
                        title={note.pinned ? "Unpin note" : "Pin note"}
                    >
                        <MdPushPin />
                    </button>

                    <button
                        type="button"
                        className="iconButton"
                        onClick={() => onEdit(note)}
                        aria-label="Edit note"
                        title="Edit note"
                    >
                        <FiEdit3 />
                    </button>

                    <button
                        type="button"
                        className="iconButton deleteButton"
                        onClick={() => onDelete(note)}
                        aria-label="Delete note"
                        title="Delete note"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>

            <div className="content">
                <h3>{note.title || "Untitled Note"}</h3>

                <p>{note.content || "No content added."}</p>
            </div>

            {note.tags?.length > 0 && (
                <div className="tags">
                    {note.tags.map((tag) => (
                        <span key={`${note.id}-${tag}`}>
                            <FiHash />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="cardBottom">
                <span>Updated {formatDate(note.updatedAt)}</span>
            </div>
        </Styled.Wrapper>
    );
}

export default NoteCard;
