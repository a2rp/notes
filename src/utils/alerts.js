import Swal from "sweetalert2";

const baseConfig = {
    background: "#0b0b0b",
    color: "#f5f5f5",
    confirmButtonColor: "#f5f5f5",
    cancelButtonColor: "#1a1a1a",
    reverseButtons: true,
    customClass: {
        popup: "notesSwalPopup",
        title: "notesSwalTitle",
        htmlContainer: "notesSwalText",
        confirmButton: "notesSwalConfirm",
        cancelButton: "notesSwalCancel",
    },
};

const escapeHtml = (value) => {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

export const confirmDeleteNote = async (note) => {
    const result = await Swal.fire({
        ...baseConfig,
        icon: "warning",
        iconColor: "#ef4444",
        title: "Delete this note?",
        html: `
            <div style="
                color:#8a8a8a;
                font-size:13px;
                line-height:1.7;
            ">
                <strong style="
                    display:block;
                    margin-bottom:6px;
                    color:#d4d4d4;
                ">
                    ${escapeHtml(note?.title || "Untitled Note")}
                </strong>

                This note will be permanently removed from this browser.
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Delete Note",
        cancelButtonText: "Cancel",
        focusCancel: true,
        allowOutsideClick: false,
    });

    return result.isConfirmed;
};
