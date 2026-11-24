import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./style.module.css";

function NotFoundPage() {
    return (
        <main className={styles.page}>
            <span>404 · PAGE NOT FOUND</span>
            <h1>This page isn’t<br />in the library.</h1>
            <p>The link may have changed, or the collection may not be available.</p>
            <Link to="/"><FiArrowLeft aria-hidden="true" /> Return home</Link>
        </main>
    );
}

export default NotFoundPage;
