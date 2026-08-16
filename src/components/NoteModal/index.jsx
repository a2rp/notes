import { useEffect, useRef } from "react";

import { FiSave, FiTag, FiX } from "react-icons/fi";

import { Styled } from "./styled";

const categories = ["General", "Personal", "Work", "Ideas"];

function NoteModal({ isOpen, isEditing, form, onChange, onSave, onClose }) {
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const timeout = setTimeout(() => {
            titleInputRef.current?.focus();
        }, 80);

        return () => {
            clearTimeout(timeout);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                onSave();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose, onSave]);

    if (!isOpen) {
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
                aria-labelledby="note-modal-title"
            >
                <div className="modalHeader">
                    <div>
                        <span className="sectionLabel">
                            {isEditing ? "Edit Note" : "New Note"}
                        </span>

                        <h2 id="note-modal-title">
                            {isEditing
                                ? "Update your note"
                                : "Create a new note"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="closeButton"
                        onClick={onClose}
                        aria-label="Close note modal"
                        title="Close"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="formGrid">
                    <div className="field fullWidth">
                        <label htmlFor="note-title">Title</label>

                        <input
                            ref={titleInputRef}
                            id="note-title"
                            type="text"
                            value={form.title}
                            placeholder="Enter note title..."
                            maxLength={120}
                            onChange={(event) =>
                                onChange("title", event.target.value)
                            }
                        />
                    </div>

                    <div className="field fullWidth">
                        <label htmlFor="note-content">Content</label>

                        <textarea
                            id="note-content"
                            rows={10}
                            value={form.content}
                            placeholder="Write your note..."
                            onChange={(event) =>
                                onChange("content", event.target.value)
                            }
                        />

                        <span className="characterCount">
                            {form.content.length} characters
                        </span>
                    </div>

                    <div className="field">
                        <label htmlFor="note-category">Category</label>

                        <select
                            id="note-category"
                            value={form.category}
                            onChange={(event) =>
                                onChange("category", event.target.value)
                            }
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="note-tags">Tags</label>

                        <div className="inputWithIcon">
                            <FiTag />

                            <input
                                id="note-tags"
                                type="text"
                                value={form.tags}
                                placeholder="project, work, idea"
                                onChange={(event) =>
                                    onChange("tags", event.target.value)
                                }
                            />
                        </div>

                        <span className="fieldHint">
                            Separate multiple tags with commas.
                        </span>
                    </div>
                </div>

                <div className="modalFooter">
                    <span className="shortcutHint">Ctrl + Enter to save</span>

                    <div className="footerActions">
                        <button
                            type="button"
                            className="cancelButton"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="saveButton"
                            onClick={onSave}
                        >
                            <FiSave />

                            <span>
                                {isEditing ? "Update Note" : "Save Note"}
                            </span>
                        </button>
                    </div>
                </div>
            </Styled.Modal>
        </Styled.Overlay>
    );
}

export default NoteModal;
