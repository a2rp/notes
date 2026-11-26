import { useEffect, useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiTable } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import topics from "../topics.json";
import chapters from "./chapters.js";
import markdownComponents from "./markdownComponents.js";
import overview from "./README.md?raw";
import styles from "./style.module.css";

const basePath = "/notes/datatables-notes";
const topic = topics.find(({ slug }) => slug === "datatables-notes");

function ComputerNetworksCoreNotes() {
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
                <Link className={styles.backLink} to="/notes">
                    <FiArrowLeft aria-hidden="true" /> All notes
                </Link>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}>
                        <FiBookOpen aria-hidden="true" /> DATATABLES / STUDY GUIDE
                    </span>
                    <h1>DataTables Study Notes</h1>
                    <p>{topic?.description}</p>
                </div>
                <span className={styles.chapterCount}>{chapters.length} chapters</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>Computer networks study guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="DataTables Study Notes chapters">
                        <NavLink to={basePath} end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                            <FiBookOpen aria-hidden="true" />
                            <span>Overview</span>
                        </NavLink>
                        {chapters.map((chapter) => (
                            <NavLink key={chapter.slug} to={`${basePath}/${chapter.slug}`} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                                <span className={styles.navNumber}>{String(chapter.number).padStart(2, "0")}</span>
                                <span>{chapter.title.replace(/^\d+\.\s*/, "")}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {selectedChapter && (
                        <div className={styles.chapterHeading}>
                            <span><FiTable aria-hidden="true" /> CHAPTER {String(selectedChapter.number).padStart(2, "0")}</span>
                            <h2>{selectedChapter.title.replace(/^\d+\.\s*/, "")}</h2>
                        </div>
                    )}
                    {markdown ? (
                        <article className={styles.markdown}>
                            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{markdown}</Markdown>
                        </article>
                    ) : (
                        <section className={styles.missingChapter}>
                            <span>CHAPTER NOT FOUND</span>
                            <h2>This DataTables chapter is unavailable.</h2>
                            <Link to={basePath}>Back to the DataTables notes index <FiArrowRight aria-hidden="true" /></Link>
                        </section>
                    )}
                    {selectedChapter && (
                        <nav className={styles.chapterNavigation} aria-label="Previous and next chapters">
                            <Link to={selectedIndex === 0 ? basePath : `${basePath}/${chapters[selectedIndex - 1].slug}`}>
                                <FiArrowLeft aria-hidden="true" />
                                <span>{selectedIndex === 0 ? "Notes index" : chapters[selectedIndex - 1].title.replace(/^\d+\.\s*/, "")}</span>
                            </Link>
                            {selectedIndex < chapters.length - 1 && (
                                <Link to={`${basePath}/${chapters[selectedIndex + 1].slug}`}>
                                    <span>{chapters[selectedIndex + 1].title.replace(/^\d+\.\s*/, "")}</span>
                                    <FiArrowRight aria-hidden="true" />
                                </Link>
                            )}
                        </nav>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ComputerNetworksCoreNotes;
