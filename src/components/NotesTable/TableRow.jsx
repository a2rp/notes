import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";

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

function TableRow({ note, index, onView, onEdit, onTogglePin, onDelete }) {
    return (
        <tr className={note.pinned ? "pinnedRow" : ""}>
            <td className="serialCell">{String(index).padStart(2, "0")}</td>

            <td className="titleCell">
                <div className="titleContent">
                    <strong>{note.title || "Untitled Note"}</strong>

                    <span>{note.content || "No content added."}</span>
                </div>
            </td>

            <td className="categoryCell">
                <span className="categoryBadge">{note.category}</span>
            </td>

            <td className="tagsCell">
                {note.tags?.length > 0 ? (
                    <div className="tagList">
                        {note.tags.slice(0, 2).map((tag) => (
                            <span key={`${note.id}-${tag}`}>{tag}</span>
                        ))}

                        {note.tags.length > 2 && (
                            <span className="moreTags">
                                +{note.tags.length - 2}
                            </span>
                        )}
                    </div>
                ) : (
                    <span className="emptyValue">-</span>
                )}
            </td>

            <td className="dateCell">{formatDate(note.createdAt)}</td>

            <td className="dateCell">{formatDate(note.updatedAt)}</td>

            <td className="statusCell">
                <span
                    className={
                        note.pinned ? "statusBadge pinned" : "statusBadge"
                    }
                >
                    <MdPushPin />

                    {note.pinned ? "Pinned" : "Normal"}
                </span>
            </td>

            <td className="actionsCell">
                <div className="rowActions">
                    <button
                        type="button"
                        className="actionButton"
                        onClick={() => onView(note)}
                        aria-label="View note"
                        title="View note"
                    >
                        <FiEye />
                    </button>

                    <button
                        type="button"
                        className="actionButton"
                        onClick={() => onEdit(note)}
                        aria-label="Edit note"
                        title="Edit note"
                    >
                        <FiEdit3 />
                    </button>

                    <button
                        type="button"
                        className={`actionButton ${
                            note.pinned ? "activePin" : ""
                        }`}
                        onClick={() => onTogglePin(note.id)}
                        aria-label={note.pinned ? "Unpin note" : "Pin note"}
                        title={note.pinned ? "Unpin note" : "Pin note"}
                    >
                        <MdPushPin />
                    </button>

                    <button
                        type="button"
                        className="actionButton deleteAction"
                        onClick={() => onDelete(note)}
                        aria-label="Delete note"
                        title="Delete note"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default TableRow;
