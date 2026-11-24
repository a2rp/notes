import { FiBookOpen, FiLayers, FiSearch } from "react-icons/fi";

import topics from "../notes/topics.json";
import styles from "./style.module.css";

const principles = [
    { icon: FiLayers, title: "One library", description: "Browse a growing set of focused collections from one home." },
    { icon: FiSearch, title: "Easy to find", description: "Search by topic, technology, or a phrase from the collection summary." },
    { icon: FiBookOpen, title: "Made for learning", description: "Keep practical explanations and examples close to the tools they describe." },
];

function AboutPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}>ABOUT THE LIBRARY</span>
                <h1>Good notes make<br /><span>hard ideas easier.</span></h1>
                <p>This is a single home for my public developer notes: a growing set of references across software fundamentals, languages, frameworks, databases, and tools.</p>
                <div className={styles.stats}><strong>{topics.length}</strong><span>collections</span><i /><span>updated as the library grows</span></div>
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
                <h2>A living reference</h2>
                <p>Each collection keeps its own subject and examples. The library brings them together with consistent navigation, search, and routes.</p>
            </section>
        </div>
    );
}

export default AboutPage;
