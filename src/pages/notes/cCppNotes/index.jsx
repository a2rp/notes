import { useEffect, useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCode } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import topics from "../topics.json";
import chapters from "./chapters";
import markdownComponents from "./markdownComponents";
import overview from "./README.md?raw";
import styles from "./style.module.css";

const basePath = "/notes/c-cpp-notes";
const topic = topics.find(({ slug }) => slug === "c-cpp-notes");

function CCppNotes() {
    const { chapterSlug } = useParams();
    const { pathname } = useLocation();
    const navigationRef = useRef(null);
    const selectedIndex = chapters.findIndex((chapter) => chapter.slug === chapterSlug);
    const selectedChapter = selectedIndex >= 0 ? chapters[selectedIndex] : null;
    const markdown = chapterSlug ? selectedChapter?.content : overview;

    useEffect(() => {
        navigationRef.current
            ?.querySelector('[aria-current="page"]')
            ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [pathname]);

    return (
        <div className={styles.layout}>
            <header className={styles.projectHeader}>
                <Link className={styles.backLink} to="/notes"><FiArrowLeft aria-hidden="true" /> All notes</Link>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> C17 AND C++20</span>
                    <h1>C and C++ Study Notes</h1>
                    <p>Language fundamentals, memory, modern C++, examples, and review questions.</p>
                </div>
                <span className={styles.chapterCount}>{chapters.length} chapters</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>C and C++ study guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="C and C++ notes chapters">
                        <NavLink to={basePath} end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                            <FiBookOpen aria-hidden="true" />
                            <span>Overview</span>
                        </NavLink>
                        {chapters.map((chapter) => (
                            <NavLink key={chapter.slug} to={`${basePath}/${chapter.slug}`} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                                <span className={styles.navNumber}>{String(chapter.number).padStart(2, "0")}</span>
                                <span>{chapter.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {selectedChapter && (
                        <div className={styles.chapterHeading}>
                            <span><FiCode aria-hidden="true" /> CHAPTER {String(selectedChapter.number).padStart(2, "0")}</span>
                            <h2>{selectedChapter.title}</h2>
                        </div>
                    )}
                    {markdown ? (
                        <article className={styles.markdown}>
                            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{markdown}</Markdown>
                        </article>
                    ) : (
                        <section className={styles.missingChapter}>
                            <span>CHAPTER NOT FOUND</span>
                            <h2>This C and C++ notes chapter is unavailable.</h2>
                            <Link to={basePath}>Back to the C and C++ notes index <FiArrowRight aria-hidden="true" /></Link>
                        </section>
                    )}
                    {selectedChapter && (
                        <nav className={styles.chapterNavigation} aria-label="Previous and next chapters">
                            <Link to={selectedIndex === 0 ? basePath : `${basePath}/${chapters[selectedIndex - 1].slug}`}>
                                <FiArrowLeft aria-hidden="true" />
                                <span>{selectedIndex === 0 ? "Notes index" : chapters[selectedIndex - 1].title}</span>
                            </Link>
                            {selectedIndex < chapters.length - 1 && (
                                <Link to={`${basePath}/${chapters[selectedIndex + 1].slug}`}>
                                    <span>{chapters[selectedIndex + 1].title}</span>
                                    <FiArrowRight aria-hidden="true" />
                                </Link>
                            )}
                        </nav>
                    )}
                </main>
            </div>
            <a className={styles.repositoryLink} href={topic.repository} target="_blank" rel="noopener noreferrer">View C and C++ Notes on GitHub <FiArrowRight aria-hidden="true" /></a>
        </div>
    );
}

export default CCppNotes;
