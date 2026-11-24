import { FiArrowDown, FiArrowRight, FiBookOpen, FiCode, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

import TopicCard from "../../components/topicCard";
import topics from "../notes/topics.json";
import styles from "./style.module.css";

const featuredSlugs = [
    "algorithms-core-notes",
    "javascript-core-notes",
    "reactjs-core-notes",
    "system-design-core-notes",
];

function HomePage() {
    const featuredTopics = featuredSlugs
        .map((slug) => topics.find((topic) => topic.slug === slug))
        .filter(Boolean);
    const categoryCount = new Set(topics.map((topic) => topic.category)).size;

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroCopy}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> A practical reference library</span>
                    <h1>Every subject.<br /><span>One clear path.</span></h1>
                    <p>Structured notes and examples for the ideas you use to build, debug, and grow as a developer.</p>
                    <div className={styles.heroActions}>
                        <Link className={styles.primaryAction} to="/notes">Explore the notes <FiArrowRight aria-hidden="true" /></Link>
                        <a className={styles.secondaryAction} href="#featured">See what is inside <FiArrowDown aria-hidden="true" /></a>
                    </div>
                    <div className={styles.heroMeta}>
                        <span><FiCode aria-hidden="true" /> Concepts and examples</span>
                        <span><FiLayers aria-hidden="true" /> {topics.length} topic collections</span>
                    </div>
                </div>

                <aside className={styles.libraryPreview} aria-label="Notes library overview">
                    <div className={styles.previewHeader}>
                        <span className={styles.previewIcon}><FiLayers aria-hidden="true" /></span>
                        <span>Library overview<small>One home for your references</small></span>
                        <span className={styles.liveMark}><i /> Ready</span>
                    </div>
                    <div className={styles.previewStats}>
                        <div><strong>{String(topics.length).padStart(2, "0")}</strong><span>Public collections</span></div>
                        <div><strong>{String(categoryCount).padStart(2, "0")}</strong><span>Subject areas</span></div>
                    </div>
                    <div className={styles.previewTopics}>
                        {Array.from(new Set(topics.map((topic) => topic.category))).slice(0, 4).map((category) => (
                            <span key={category}>{category}</span>
                        ))}
                    </div>
                    <p>Search a topic, open its route, and keep learning without losing your place.</p>
                </aside>
            </section>

            <section className={styles.featured} id="featured">
                <div className={styles.sectionHeading}>
                    <div><span className={styles.sectionEyebrow}>Start anywhere</span><h2>Explore the collection</h2></div>
                    <Link to="/notes" className={styles.viewAll}>Browse all topics <FiArrowRight aria-hidden="true" /></Link>
                </div>
                <div className={styles.topicGrid}>
                    {featuredTopics.map((topic, index) => <TopicCard key={topic.slug} topic={topic} index={index} featured />)}
                </div>
            </section>

        </div>
    );
}

export default HomePage;
