import { FiArrowUpRight, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./style.module.css";

function TopicCard({ topic, index = 0, featured = false }) {
    return (
        <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
            <div className={styles.cardTop}>
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.cardIcon}><FiBookOpen aria-hidden="true" /></span>
                <span className={styles.category}>{topic.category}</span>
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <Link className={styles.cardLink} to={`/notes/${topic.slug}`}>
                Open notes <FiArrowUpRight aria-hidden="true" />
            </Link>
        </article>
    );
}

export default TopicCard;
