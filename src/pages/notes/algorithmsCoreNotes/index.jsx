import { FiBookOpen, FiChevronRight, FiCode, FiGrid, FiLayers, FiMaximize2, FiRotateCw, FiSearch, FiTarget, FiTrendingUp } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./style.module.css";

const basePath = "/notes/algorithms-core-notes";

const sections = [
    { label: "Overview", path: basePath, icon: FiBookOpen, end: true },
    { label: "Foundation Layer", path: `${basePath}/foundation`, icon: FiTrendingUp },
    { label: "Searching", path: `${basePath}/searching`, icon: FiSearch },
    { label: "Sorting", path: `${basePath}/sorting`, icon: FiGrid },
    { label: "Recursion Patterns", path: `${basePath}/recursion-patterns`, icon: FiRotateCw },
    { label: "Sliding Window", path: `${basePath}/sliding-window`, icon: FiMaximize2 },
    { label: "Stack & Queue", path: `${basePath}/stack-queue`, icon: FiLayers },
    { label: "Greedy", path: `${basePath}/greedy`, icon: FiTarget },
    { label: "Dynamic Programming", path: `${basePath}/dynamic-programming`, icon: FiCode },
    { label: "Graph Algorithms", path: `${basePath}/graph-algorithms`, icon: FiChevronRight },
];

function AlgorithmsCoreNotes() {
    return (
        <div className={styles.layout}>
            <header className={styles.projectHeader}>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}>NOTES COLLECTION</span>
                    <h1>Algorithms Core Notes</h1>
                    <p>Practical algorithm revision notes and JavaScript patterns.</p>
                </div>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>Algorithm topics</strong>
                    </div>
                    <nav className={styles.navigation} aria-label="Algorithm topics">
                        {sections.map(({ label, path, icon: Icon, end }) => (
                            <NavLink key={path} to={path} end={end} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                                <Icon aria-hidden="true" />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AlgorithmsCoreNotes;
