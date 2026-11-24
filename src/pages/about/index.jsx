import { FiBookOpen, FiLayers, FiSearch } from "react-icons/fi";

import topics from "../notes/topics.json";
import styles from "./style.module.css";

const principles = [
    { icon: FiLayers, title: "One collection", description: "A single home for core algorithms and problem-solving patterns." },
    { icon: FiSearch, title: "Easy to navigate", description: "Move between focused sections without losing your place." },
    { icon: FiBookOpen, title: "Made for practice", description: "Review clear explanations alongside practical JavaScript examples." },
];

function AboutPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}>ABOUT THE COLLECTION</span>
                <h1>Understand algorithms.<br /><span>Build with confidence.</span></h1>
                <p>Algorithms Core Notes brings essential techniques, complexity, and practical JavaScript patterns together in one focused reference.</p>
                <div className={styles.stats}><strong>{topics.length}</strong><span>collection</span><i /><span>10 focused sections</span></div>
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
                <h2>A focused reference</h2>
                <p>Browse the core ideas, then open a section for practical explanations and examples.</p>
            </section>
        </div>
    );
}

export default AboutPage;
