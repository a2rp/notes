import styles from "./style.module.css";

function Spinner() {
    return (
        <div className={styles.loading} role="status" aria-label="Loading page">
            <span className={styles.spinner} aria-hidden="true" />
            <span className={styles.screenReaderText}>Loading page</span>
        </div>
    );
}

export default Spinner;
