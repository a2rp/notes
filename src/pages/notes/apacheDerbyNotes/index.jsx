import { useEffect, useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCode } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import chapters from "./chapters";
import markdownComponents from "./markdownComponents";
import overview from "./README.md?raw";
import styles from "./style.module.css";

const basePath = "/notes/apache-derby-notes";

function ApacheDerbyNotes() {
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
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> DATABASES AND SQL</span>
                    <h1>Apache Derby Notes</h1>
                    <p>Practical SQL, Java APIs, and operations notes for Apache Derby.</p>
                </div>
                <span className={styles.chapterCount}>{chapters.length} chapters</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>Apache Derby study guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="Apache Derby notes chapters">
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
                            <h2>This Apache Derby notes chapter is unavailable.</h2>
                            <Link to={basePath}>Back to the Apache Derby notes index <FiArrowRight aria-hidden="true" /></Link>
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
            <a className={styles.referenceLink} href="https://db.apache.org/derby/manuals/" target="_blank" rel="noopener noreferrer">
                Official Apache Derby Manuals <FiArrowRight aria-hidden="true" />
            </a>
        </div>
    );
}

export default ApacheDerbyNotes;
