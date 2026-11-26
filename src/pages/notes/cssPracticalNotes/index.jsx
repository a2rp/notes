import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCode } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import topics from "../topics.json";
import chapters, { rewriteInternalMarkdownLinks } from "./chapters.js";
import markdownComponents from "./markdownComponents.js";
import overview from "./README.md?raw";
import styles from "./style.module.css";

const basePath = "/notes/css-practical-notes";
const topic = topics.find(({ slug }) => slug === "css-practical-notes");

function CssPracticalNotes() {
    const { chapterSlug } = useParams();
    const { pathname } = useLocation();
    const navigationRef = useRef(null);
    const [loadedChapter, setLoadedChapter] = useState({ slug: "", content: null, error: false });
    const selectedIndex = chapters.findIndex((chapter) => chapter.slug === chapterSlug);
    const selectedChapter = selectedIndex >= 0 ? chapters[selectedIndex] : null;
    const markdown = chapterSlug
        ? loadedChapter.slug === chapterSlug ? loadedChapter.content : null
        : rewriteInternalMarkdownLinks(overview, "README.md");

    useEffect(() => {
        if (!selectedChapter) return undefined;

        let cancelled = false;
        selectedChapter.loadContent().then((content) => {
            if (!cancelled) setLoadedChapter({ slug: chapterSlug, content, error: false });
        }).catch(() => {
            if (!cancelled) setLoadedChapter({ slug: chapterSlug, content: null, error: true });
        });

        return () => { cancelled = true; };
    }, [chapterSlug, selectedChapter]);

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
                        <FiBookOpen aria-hidden="true" /> CSS / PRACTICAL NOTES
                    </span>
                    <h1>CSS Practical Notes</h1>
                    <p>{topic?.description}</p>
                </div>
                <span className={styles.chapterCount}>{chapters.length} reading sections</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>CSS learning curriculum</strong>
                    </div>
                        <nav ref={navigationRef} className={styles.navigation} aria-label="CSS Practical Notes sections">
                        <NavLink to={basePath} end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                            <FiBookOpen aria-hidden="true" />
                            <span>Overview</span>
                        </NavLink>
                        {chapters.map((chapter) => (
                            <NavLink key={chapter.slug} to={`${basePath}/${chapter.slug}`} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                                <span className={styles.navNumber}>{chapter.badge}</span>
                                <span>{chapter.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {selectedChapter && (
                        <div className={styles.chapterHeading}>
                            <span><FiCode aria-hidden="true" /> {selectedChapter.kindLabel.toUpperCase()} {selectedChapter.number}</span>
                            <h2>{selectedChapter.title}</h2>
                        </div>
                    )}
                    {markdown !== null ? (
                        <article className={styles.markdown}>
                            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{markdown}</Markdown>
                        </article>
                    ) : selectedChapter && (loadedChapter.slug !== chapterSlug || !loadedChapter.error) ? (
                        <section aria-live="polite"><p>Loading this CSS section…</p></section>
                    ) : (
                        <section className={styles.missingChapter}>
                            <span>CHAPTER NOT FOUND</span>
                            <h2>This CSS Practical Notes section is unavailable.</h2>
                            <Link to={basePath}>Back to the CSS notes index <FiArrowRight aria-hidden="true" /></Link>
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
        </div>
    );
}

export default CssPracticalNotes;
