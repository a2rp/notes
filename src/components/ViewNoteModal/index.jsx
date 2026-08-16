import { FiCalendar, FiEdit3, FiHash, FiTag, FiX } from "react-icons/fi";

import { MdPushPin } from "react-icons/md";

import { Styled } from "./styled";

const formatDate = (dateValue) => {
    if (!dateValue) {
        return "-";
    }

    const date = new Date(dateValue);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

function ViewNoteModal({ isOpen, note, onClose, onEdit }) {
    if (!isOpen || !note) {
        return null;
    }

    return (
        <Styled.Overlay
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <Styled.Modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="view-note-title"
            >
                <div className="modalHeader">
                    <div className="headerContent">
                        <div className="metaRow">
                            <span className="categoryBadge">
                                <FiTag />
                                {note.category}
                            </span>

                            {note.pinned && (
                                <span className="pinnedBadge">
                                    <MdPushPin />
                                    Pinned
                                </span>
                            )}
                        </div>

                        <h2 id="view-note-title">
                            {note.title || "Untitled Note"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="closeButton"
                        onClick={onClose}
                        aria-label="Close note"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="modalBody">
                    <div className="contentBlock">
                        <span className="sectionLabel">Note Content</span>

                        <div className="noteContent">
                            {note.content || "No content added."}
                        </div>
                    </div>

                    {note.tags?.length > 0 && (
                        <div className="contentBlock">
                            <span className="sectionLabel">Tags</span>

                            <div className="tagList">
                                {note.tags.map((tag) => (
                                    <span key={`${note.id}-${tag}`}>
                                        <FiHash />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="metadataGrid">
                        <div className="metadataItem">
                            <span className="metadataIcon">
                                <FiCalendar />
                            </span>

                            <div>
                                <span>Created</span>

                                <strong>{formatDate(note.createdAt)}</strong>
                            </div>
                        </div>

                        <div className="metadataItem">
                            <span className="metadataIcon">
                                <FiEdit3 />
                            </span>

                            <div>
                                <span>Last Updated</span>

                                <strong>{formatDate(note.updatedAt)}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modalFooter">
                    <button
                        type="button"
                        className="closeAction"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        className="editAction"
                        onClick={() => onEdit(note)}
                    >
                        <FiEdit3 />
                        <span>Edit Note</span>
                    </button>
                </div>
            </Styled.Modal>
        </Styled.Overlay>
    );
}

export default ViewNoteModal;
