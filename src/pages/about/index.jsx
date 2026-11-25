import { FiBookOpen, FiLayers, FiSearch } from "react-icons/fi";

import topics from "../notes/topics.json";
import styles from "./style.module.css";

const principles = [
    { icon: FiLayers, title: "One library", description: "Browse focused collections from one simple home." },
    { icon: FiSearch, title: "Easy to navigate", description: "Find a subject and move between its chapters." },
    { icon: FiBookOpen, title: "Made for practice", description: "Review practical explanations and examples at your pace." },
];

function AboutPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}>ABOUT THE LIBRARY</span>
                <h1>Good notes make<br /><span>hard ideas easier.</span></h1>
                <p>A home for practical developer notes across algorithms, databases, Android, JavaScript, and Angular development.</p>
                <div className={styles.stats}><strong>{topics.length}</strong><span>collections</span><i /><span>focused subjects</span></div>
            </section>

            <section className={styles.principles}>
                {principles.map(({ icon: Icon, title, description }, index) => (
                    <article key={title} className={styles.principleCard}>
                        <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                        <span className={styles.cardIcon}><Icon aria-hidden="true" /></span>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </article>
                ))}
            </section>

            <section className={styles.note}>
                <h2>A growing reference</h2>
                <p>Each collection keeps its subject, examples, and review material together in a clear route.</p>
            </section>
        </div>
    );
}

export default AboutPage;
