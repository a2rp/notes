import { FiArrowRight, FiArrowUpRight, FiBookOpen, FiCode, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

import TopicCard from "../../components/topicCard";
import topics from "./topics.json";
import styles from "./style.module.css";

function NotesPage() {
    const topic = topics[0];

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> A focused algorithm reference</span>
                <div className={styles.heroHeading}>
                    <h1>Algorithms.<br /><span>Made practical.</span></h1>
                    <p>{topic.description}</p>
                </div>
                <div className={styles.libraryStats}><strong>01</strong><span>core collection</span><i /><span>10 focused sections</span></div>
            </section>

            <section className={styles.catalog}>
                <div className={styles.catalogTop}>
                    <div><span className={styles.sectionEyebrow}>The collection</span><h2>Algorithms Core Notes</h2></div>
                    <Link to={`/notes/${topic.slug}`} className={styles.openLink}>Open notes <FiArrowRight aria-hidden="true" /></Link>
                </div>
                <div className={styles.collectionMeta}>
                    <span><FiCode aria-hidden="true" /> Core concepts and examples</span>
                    <span><FiLayers aria-hidden="true" /> JavaScript implementations</span>
                    <a href={topic.repository} target="_blank" rel="noopener noreferrer">Repository <FiArrowUpRight aria-hidden="true" /></a>
                </div>
                <div className={styles.topicGrid}>
                    <TopicCard topic={topic} index={0} />
                </div>
            </section>
        </div>
    );
}

export default NotesPage;
