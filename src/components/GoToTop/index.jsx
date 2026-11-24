import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

import styles from "./style.module.css";

const VISIBILITY_THRESHOLD = 360;

function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => {
            setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);
        };

        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });

        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);

    const scrollToTop = () => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth";

        window.scrollTo({ top: 0, left: 0, behavior });
    };

    if (!isVisible) return null;

    return (
        <button className={styles.button} type="button" aria-label="Scroll to top" onClick={scrollToTop}>
            <FiArrowUp aria-hidden="true" />
        </button>
    );
}

export default GoToTop;
