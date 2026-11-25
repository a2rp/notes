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
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> A practical reference library</span>
                    <h1>Learn clearly.<br /><span>Build confidently.</span></h1>
                    <p>Focused notes and examples for algorithms, software architecture, clean code, databases, Android, Angular, ASP.NET Core, and JavaScript development.</p>
                    <div className={styles.heroActions}>
                        <Link className={styles.primaryAction} to="/notes">Explore the notes <FiArrowRight aria-hidden="true" /></Link>
                        <a className={styles.secondaryAction} href="#featured">See what is inside <FiArrowDown aria-hidden="true" /></a>
                    </div>
                    <div className={styles.heroMeta}>
                        <span><FiCode aria-hidden="true" /> Concepts and examples</span>
                        <span><FiLayers aria-hidden="true" /> {topics.length} focused collections</span>
                    </div>
                </div>

                <aside className={styles.libraryPreview} aria-label="Notes library overview">
                    <div className={styles.previewHeader}>
                        <span className={styles.previewIcon}><FiLayers aria-hidden="true" /></span>
                        <span>Notes overview<small>Focused developer references</small></span>
                        <span className={styles.liveMark}><i /> Ready</span>
                    </div>
                    <div className={styles.previewStats}>
                        <div><strong>{String(topics.length).padStart(2, "0")}</strong><span>Collections</span></div>
                        <div><strong>{String(categoryCount).padStart(2, "0")}</strong><span>Subject areas</span></div>
                    </div>
                    <div className={styles.previewTopics}>
                        {Array.from(new Set(topics.map((topic) => topic.category))).slice(0, 4).map((category) => (
                            <span key={category}>{category}</span>
                        ))}
                    </div>
                    <p>Choose a subject, open a chapter, and continue learning at your pace.</p>
                </aside>
            </section>

            <section className={styles.featured} id="featured">
                <div className={styles.sectionHeading}>
                    <div><span className={styles.sectionEyebrow}>Start anywhere</span><h2>Explore the collection</h2></div>
                    <Link to="/notes" className={styles.viewAll}>Browse all notes <FiArrowRight aria-hidden="true" /></Link>
                </div>
                <div className={styles.topicGrid}>
                    {featuredTopics.map((topic, index) => <TopicCard key={topic.slug} topic={topic} index={index} featured />)}
                </div>
            </section>

        </div>
    );
}

export default HomePage;
