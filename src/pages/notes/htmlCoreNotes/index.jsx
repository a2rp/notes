import App from "./content/App.jsx";
import styles from "./style.module.css";

export default function HtmlCoreNotes() {
    return (
        <div className={`${styles.routeShell} htmlCoreNotesApp`}>
            <App />
        </div>
    );
}
