import { lazy, Suspense, useEffect, useState } from "react";
import { FiArrowLeft, FiBookOpen, FiLayers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

import Sidebar from "./components/sidebar";
import { basePath } from "./data/navigation";
import styles from "./style.module.css";

const pages = {
    "": lazy(() => import("./topics/home")),
    abstraction: lazy(() => import("./topics/abstraction")),
    architecture: lazy(() => import("./topics/architecture")),
    "clean-code": lazy(() => import("./topics/cleanCode")),
    "code-readability": lazy(() => import("./topics/codeReadability")),
    "code-smells": lazy(() => import("./topics/codeSmells")),
    "composition-over-inheritance": lazy(() => import("./topics/compositionOverInheritance")),
    configuration: lazy(() => import("./topics/configuration")),
    "coupling-and-cohesion": lazy(() => import("./topics/couplingAndCohesion")),
    "dependency-management": lazy(() => import("./topics/dependencyManagement")),
    "design-principles": lazy(() => import("./topics/designPrinciples")),
    documentation: lazy(() => import("./topics/documentation")),
    dry: lazy(() => import("./topics/dry")),
    encapsulation: lazy(() => import("./topics/encapsulation")),
    "error-handling": lazy(() => import("./topics/errorHandling")),
    functions: lazy(() => import("./topics/functions")),
    kiss: lazy(() => import("./topics/kiss")),
    logging: lazy(() => import("./topics/logging")),
    "maintainability-checklist": lazy(() => import("./topics/maintainabilityChecklist")),
    naming: lazy(() => import("./topics/naming")),
    "project-structure": lazy(() => import("./topics/projectStructure")),
    refactoring: lazy(() => import("./topics/refactoring")),
    scalability: lazy(() => import("./topics/scalability")),
    "separation-of-concerns": lazy(() => import("./topics/separationOfConcerns")),
    solid: lazy(() => import("./topics/solid")),
    testing: lazy(() => import("./topics/testing")),
    validation: lazy(() => import("./topics/validation")),
    yagni: lazy(() => import("./topics/yagni")),
};

function ArchitectureAndCleanCodeNotes() {
    const { pathname } = useLocation();
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = window.localStorage.getItem("architecture-clean-code-theme");
            return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
        } catch {
            return "dark";
        }
    });
    const currentPath = pathname.replace(/\/+$/, "").slice(basePath.length).replace(/^\/+/, "");
    const Page = pages[currentPath];

    useEffect(() => {
        try {
            window.localStorage.setItem("architecture-clean-code-theme", theme);
        } catch {
            // The selected theme still works for this visit when storage is unavailable.
        }
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
    }

    return (
        <div className={styles.layout} data-theme={theme}>
            <header className={styles.collectionHeader}>
                <Link to="/notes" className={styles.backLink}><FiArrowLeft aria-hidden="true" /> All notes</Link>
                <div className={styles.identity}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> SOFTWARE ENGINEERING</span>
                    <h1>Architecture &amp; Clean Code Core Notes</h1>
                    <p>Practical guidance for building software that stays clear, maintainable, and adaptable.</p>
                </div>
                <span className={styles.topicCount}><FiLayers aria-hidden="true" /> 27 topics</span>
            </header>

            <div className={styles.collectionGrid}>
                <aside className={styles.sidebarPanel}>
                    <Sidebar theme={theme} onThemeToggle={toggleTheme} />
                </aside>
                <main className={styles.content}>
                    {Page ? (
                        <Suspense fallback={<div className={styles.loading} role="status">Loading notes…</div>}>
                            <Page />
                        </Suspense>
                    ) : (
                        <section className={styles.notFound}>
                            <span>TOPIC NOT FOUND</span>
                            <h2>That architecture topic is unavailable.</h2>
                            <Link to={basePath}>Return to the collection overview</Link>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ArchitectureAndCleanCodeNotes;
