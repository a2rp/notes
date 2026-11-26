import { useEffect } from "react";

import App from "./app/App.jsx";
import styles from "./style.module.css";

import "./app/theme.css";

function DevOpsAndCloudCoreNotes() {
    useEffect(() => () => {
        document.querySelector(".devopsNotesApp")?.removeAttribute("data-theme");
    }, []);

    return (
        <div className={styles.routeShell}>
            <App />
        </div>
    );
}

export default DevOpsAndCloudCoreNotes;
