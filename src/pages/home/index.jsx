import { FiArrowDown, FiArrowRight, FiBookOpen, FiCode, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

import TopicCard from "../../components/topicCard";
import topics from "../notes/topics.json";
import styles from "./style.module.css";

function HomePage() {
    const featuredTopics = topics;
    const categoryCount = new Set(topics.map((topic) => topic.category)).size;

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroCopy}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> A focused algorithm reference</span>
                    <h1>Algorithms.<br /><span>Made practical.</span></h1>
                    <p>Clear notes on core algorithms, problem-solving patterns, complexity, and practical JavaScript implementations.</p>
                    <div className={styles.heroActions}>
                        <Link className={styles.primaryAction} to="/notes">Explore the notes <FiArrowRight aria-hidden="true" /></Link>
                        <a className={styles.secondaryAction} href="#featured">See what is inside <FiArrowDown aria-hidden="true" /></a>
                    </div>
                    <div className={styles.heroMeta}>
                        <span><FiCode aria-hidden="true" /> Concepts and examples</span>
                        <span><FiLayers aria-hidden="true" /> One focused collection</span>
                    </div>
                </div>

                <aside className={styles.libraryPreview} aria-label="Notes library overview">
                    <div className={styles.previewHeader}>
                        <span className={styles.previewIcon}><FiLayers aria-hidden="true" /></span>
                        <span>Algorithms Core Notes<small>One practical reference</small></span>
                        <span className={styles.liveMark}><i /> Ready</span>
                    </div>
                    <div className={styles.previewStats}>
                        <div><strong>{String(topics.length).padStart(2, "0")}</strong><span>Core collection</span></div>
                        <div><strong>{String(categoryCount).padStart(2, "0")}</strong><span>Subject area</span></div>
                    </div>
                    <div className={styles.previewTopics}>
                        {Array.from(new Set(topics.map((topic) => topic.category))).slice(0, 4).map((category) => (
                            <span key={category}>{category}</span>
                        ))}
                    </div>
                    <p>Explore focused sections from foundations to graph algorithms.</p>
                </aside>
            </section>

            <section className={styles.featured} id="featured">
                <div className={styles.sectionHeading}>
                    <div><span className={styles.sectionEyebrow}>The collection</span><h2>Algorithms Core Notes</h2></div>
                    <Link to="/notes" className={styles.viewAll}>Open collection <FiArrowRight aria-hidden="true" /></Link>
                </div>
                <div className={styles.topicGrid}>
                    {featuredTopics.map((topic, index) => <TopicCard key={topic.slug} topic={topic} index={index} featured />)}
                </div>
            </section>

        </div>
    );
}

export default HomePage;
