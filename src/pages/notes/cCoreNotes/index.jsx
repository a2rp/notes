import { useEffect, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import AboutC from "./aboutC";
import AdvancedConcepts from "./topics/advancedConcepts";
import Arrays from "./topics/arrays";
import BasicSyntax from "./topics/basicSyntax";
import BestPractices from "./topics/bestPractices";
import BitManipulation from "./topics/bitManipulation";
import CControlFlow from "./topics/cControlFlow";
import CFunctions from "./topics/cFunctions";
import CIntroduction from "./topics/cIntroduction";
import CStringTopic from "./topics/cStringTopic";
import CVsCpp from "./topics/cVsCpp";
import DataStructuresUsingC from "./topics/dataStructuresUsingC";
import DynamicMemoryAllocation from "./topics/dynamicMemoryAllocation";
import FileHandling from "./topics/fileHandling";
import Operators from "./topics/operators";
import Pointers from "./topics/pointers";
import Preprocessor from "./topics/preprocessor";
import StructuresAndUnions from "./topics/structuresAndUnions";
import styles from "./style.module.css";

const topics = [
    ["about", "About C", AboutC],
    ["intro", "C Introduction", CIntroduction],
    ["syntax", "Basic Syntax", BasicSyntax],
    ["operators", "Operators", Operators],
    ["flow", "Control Flow", CControlFlow],
    ["functions", "Functions", CFunctions],
    ["arrays", "Arrays", Arrays],
    ["strings", "C Strings", CStringTopic],
    ["pointers", "Pointers", Pointers],
    ["structures", "Structures and Unions", StructuresAndUnions],
    ["memory", "Dynamic Memory", DynamicMemoryAllocation],
    ["files", "File Handling", FileHandling],
    ["preprocessor", "Preprocessor", Preprocessor],
    ["bits", "Bit Manipulation", BitManipulation],
    ["advanced", "Advanced Concepts", AdvancedConcepts],
    ["data-structures", "Data Structures", DataStructuresUsingC],
    ["c-cpp", "C vs C++", CVsCpp],
    ["best-practices", "Best Practices", BestPractices],
];

function CCoreNotes() {
    const [activeTopic, setActiveTopic] = useState("about");
    const navigationRef = useRef(null);
    const ActiveTopic = topics.find(([id]) => id === activeTopic)?.[2] || AboutC;

    useEffect(() => {
        navigationRef.current
            ?.querySelector('[aria-current="page"]')
            ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [activeTopic]);

    return (
        <main className={styles.page}>
            <header className={styles.hero}>
                <Link className={styles.backLink} to="/notes">
                    <FiArrowLeft aria-hidden="true" /> All notes
                </Link>
                <span className={styles.eyebrow}>PROGRAMMING FOUNDATIONS</span>
                <h1>C Core Notes</h1>
                <p>Practical revision notes covering C fundamentals, memory, data structures, and safe coding practices.</p>
                <span className={styles.topicCount}>{topics.length - 1} study topics</span>
            </header>

            <div className={styles.workspace}>
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarLabel}>Study guide</p>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="C notes topics">
                        {topics.map(([id, label]) => (
                            <button
                                key={id}
                                type="button"
                                className={`${styles.topicButton} ${activeTopic === id ? styles.active : ""}`}
                                aria-current={activeTopic === id ? "page" : undefined}
                                onClick={() => setActiveTopic(id)}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <section className={styles.content} aria-live="polite">
                    <ActiveTopic />
                </section>
            </div>
        </main>
    );
}

export default CCoreNotes;
