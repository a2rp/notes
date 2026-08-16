import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

import { Styled } from "./styled";

function ConfirmModal({
    isOpen,
    title,
    message,
    confirmText = "Delete",
    onConfirm,
    onCancel,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <Styled.Overlay
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
        >
            <Styled.Modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
            >
                <button
                    className="closeButton"
                    type="button"
                    onClick={onCancel}
                    aria-label="Close confirmation modal"
                >
                    <FiX />
                </button>

                <span className="alertIcon">
                    <FiAlertTriangle />
                </span>

                <span className="label">Confirmation Required</span>

                <h2 id="confirm-modal-title">{title}</h2>

                <p>{message}</p>

                <div className="actions">
                    <button
                        className="cancelButton"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirmButton"
                        type="button"
                        onClick={onConfirm}
                    >
                        <FiTrash2 />
                        <span>{confirmText}</span>
                    </button>
                </div>
            </Styled.Modal>
        </Styled.Overlay>
    );
}

export default ConfirmModal;
