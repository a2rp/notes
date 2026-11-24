
import {
    FiClock,
    FiCpu,
    FiShuffle,
    FiTarget,
    FiTrendingUp,
} from "react-icons/fi";

import styles from "./style.module.css";

const AboutAlgorithms = () => {
    const formattedDateTime = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    return (
        <section className={styles.page}>
            <div className={styles.headerRow}>
                <div className={styles.titleSection}>
                    <div className={styles.iconBox}>
                        <FiShuffle />
                    </div>

                    <div className={styles.titleBlock}>
                        <h2 className={styles.title}>About Algorithms</h2>

                        <p className={styles.subtitle}>
                            Patterns, correctness, and performance thinking
                        </p>
                    </div>
                </div>

                <div className={styles.pillRow}>
                    <span className={styles.pill}>
                        <FiTarget />
                        Correctness
                    </span>

                    <span className={styles.pill}>
                        <FiCpu />
                        Efficiency
                    </span>

                    <span className={styles.pill}>
                        <FiTrendingUp />
                        Patterns
                    </span>
                </div>
            </div>

            <div className={styles.contentCard}>
                <div className={styles.body}>
                    <p>
                        Algorithms are step-by-step procedures for solving
                        problems. They transform an input into an output through
                        a clear sequence of operations. A good algorithm is not
                        just one that works, but one that is correct under all
                        valid inputs and efficient under realistic constraints.
                    </p>

                    <p>
                        Algorithmic thinking is about choosing the right
                        approach. Sometimes a brute force solution works. Often
                        it does not. Patterns like binary search, sliding
                        window, two pointers, recursion, greedy, dynamic
                        programming, and graph traversal let you solve large
                        problem spaces without guessing.
                    </p>

                    <p>
                        This project is a single-page revision system for core
                        algorithms using clean JavaScript examples. Each topic
                        highlights the idea, the pattern, the time and space
                        cost, and the common mistakes. The goal is fast recall
                        and stronger decision-making during interviews and real
                        development work.
                    </p>
                </div>

                <div className={styles.metaBar}>
                    <div className={styles.metaLeft}>
                        <span className={styles.metaIcon}>
                            <FiClock />
                        </span>

                        <span className={styles.metaLabel}>Last updated</span>
                    </div>

                    <span className={styles.metaValue}>{formattedDateTime}</span>
                </div>
            </div>
        </section>
    );
};

export default AboutAlgorithms;
