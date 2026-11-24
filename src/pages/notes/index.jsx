import { FiArrowRight, FiBookOpen, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

import TopicCard from "../../components/topicCard";
import topics from "./topics.json";
import styles from "./style.module.css";

function NotesPage() {
    const categories = new Set(topics.map((topic) => topic.category));

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> Notes library</span>
                <div className={styles.heroHeading}>
                    <h1>Focused notes.<br /><span>Clear next steps.</span></h1>
                    <p>Pick a collection to explore practical explanations, examples, and reference material.</p>
                </div>
                <div className={styles.libraryStats}>
                    <strong>{String(topics.length).padStart(2, "0")}</strong><span>collections</span><i />
                    <strong>{String(categories.size).padStart(2, "0")}</strong><span>subjects</span>
                </div>
            </section>

            <section className={styles.catalog}>
                <div className={styles.catalogTop}>
                    <div><span className={styles.sectionEyebrow}>Start anywhere</span><h2>Explore the collection</h2></div>
                    <Link to="/" className={styles.homeLink}>Back home <FiArrowRight aria-hidden="true" /></Link>
                </div>
                <div className={styles.collectionMeta}><FiLayers aria-hidden="true" /><span>Each note has its own chapters and examples.</span></div>
                <div className={styles.topicGrid}>
                    {topics.map((topic, index) => <TopicCard key={topic.slug} topic={topic} index={index} />)}
                </div>
            </section>
        </div>
    );
}

export default NotesPage;
