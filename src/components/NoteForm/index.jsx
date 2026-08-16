import { FiCheck, FiEdit3, FiTag, FiX } from "react-icons/fi";

import { Styled } from "./styled";

const categories = ["General", "Personal", "Work", "Ideas"];

function NoteForm({ form, isEditing, onChange, onSave, onCancel }) {
    return (
        <Styled.Wrapper>
            <div className="formHeader">
                <div>
                    <span className="label">
                        {isEditing ? "Edit Note" : "Create Note"}
                    </span>

                    <h2>
                        {isEditing
                            ? "Update your note"
                            : "Capture something important"}
                    </h2>
                </div>

                <span className="formIcon">
                    <FiEdit3 />
                </span>
            </div>

            <div className="formBody">
                <div className="field">
                    <label htmlFor="note-title">Title</label>

                    <input
                        id="note-title"
                        type="text"
                        value={form.title}
                        placeholder="Give your note a title..."
                        maxLength={120}
                        onChange={(event) =>
                            onChange("title", event.target.value)
                        }
                    />
                </div>

                <div className="field">
                    <label htmlFor="note-content">Content</label>

                    <textarea
                        id="note-content"
                        value={form.content}
                        placeholder="Write your note here..."
                        rows={8}
                        onChange={(event) =>
                            onChange("content", event.target.value)
                        }
                    />

                    <span className="characterCount">
                        {form.content.length} characters
                    </span>
                </div>

                <div className="formRow">
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
                                placeholder="project, idea, work"
                                onChange={(event) =>
                                    onChange("tags", event.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="formActions">
                {isEditing && (
                    <button
                        className="cancelButton"
                        type="button"
                        onClick={onCancel}
                    >
                        <FiX />
                        <span>Cancel</span>
                    </button>
                )}

                <button className="saveButton" type="button" onClick={onSave}>
                    <FiCheck />

                    <span>{isEditing ? "Update Note" : "Save Note"}</span>
                </button>
            </div>
        </Styled.Wrapper>
    );
}

export default NoteForm;
