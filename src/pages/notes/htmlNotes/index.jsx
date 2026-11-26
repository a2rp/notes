import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCode } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import { chapters, loadPageContent, pages, rewriteInternalMarkdownLinks } from "./chapters";
import markdownComponents from "./markdownComponents";
import overview from "./README.md?raw";
import styles from "./style.module.css";

const basePath = "/notes/html-notes";

function HtmlNotes() {
    const routeSlug = useParams()["*"] ?? "";
    const { pathname } = useLocation();
    const navigationRef = useRef(null);
    const [loadedPage, setLoadedPage] = useState({ routeSlug: "", content: null, error: false });
    const selectedPage = useMemo(() => pages.find((page) => page.routeSlug === routeSlug), [routeSlug]);
    const selectedIndex = chapters.findIndex((chapter) => chapter.slug === (selectedPage?.lessonSlug || selectedPage?.slug));
    const selectedChapter = selectedIndex >= 0 ? chapters[selectedIndex] : null;
    const isOverview = routeSlug === "";
    const isMissing = !isOverview && !selectedPage;
    const activeLessonSlug = selectedPage?.lessonSlug || (selectedPage?.kind === "lesson" ? selectedPage.slug : "");
    const markdown = isOverview
        ? rewriteInternalMarkdownLinks(overview, "README.md")
        : loadedPage.routeSlug === routeSlug ? loadedPage.content : null;

    useEffect(() => {
        if (!selectedPage) return undefined;

        let cancelled = false;
        loadPageContent(selectedPage.sourcePath).then((content) => {
            if (!cancelled) setLoadedPage({ routeSlug, content, error: false });
        }).catch(() => {
            if (!cancelled) setLoadedPage({ routeSlug, content: null, error: true });
        });

        return () => { cancelled = true; };
    }, [routeSlug, selectedPage]);

    useEffect(() => {
        navigationRef.current
            ?.querySelector('[aria-current="page"]')
            ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [pathname]);

    const siblingLinks = selectedPage?.lessonSlug ? [
        { label: "Lesson", route: selectedPage.lessonSlug },
        { label: "Q&A", route: `${selectedPage.lessonSlug}/questions-and-answers` },
        { label: "Example", route: `${selectedPage.lessonSlug}/example` },
    ] : null;

    return (
        <div className={styles.layout}>
            <header className={styles.projectHeader}>
                <Link className={styles.backLink} to="/notes"><FiArrowLeft aria-hidden="true" /> All notes</Link>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> HTML / WEB FOUNDATIONS</span>
                    <h1>HTML Notes</h1>
                    <p>Practical lessons, examples, and questions for building accessible web pages.</p>
                </div>
                <span className={styles.chapterCount}>{chapters.length} lessons</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>HTML learning guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="HTML notes lessons">
                        <NavLink to={basePath} end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                            <FiBookOpen aria-hidden="true" />
                            <span>Overview</span>
                        </NavLink>
                        {chapters.map((chapter) => (
                            <NavLink
                                key={chapter.slug}
                                to={`${basePath}/${chapter.slug}`}
                                className={() => `${styles.navLink} ${activeLessonSlug === chapter.slug ? styles.active : ""}`}
                                aria-current={activeLessonSlug === chapter.slug ? "page" : undefined}
                            >
                                <span className={styles.navNumber}>{String(chapter.number).padStart(2, "0")}</span>
                                <span>{chapter.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {selectedPage && (
                        <div className={styles.chapterHeading}>
                            <span><FiCode aria-hidden="true" /> {selectedPage.kindLabel}{selectedPage.number ? ` ${String(selectedPage.number).padStart(2, "0")}` : ""}</span>
                            <h2>{selectedPage.title}</h2>
                            {siblingLinks && (
                                <nav className={styles.resourceLinks} aria-label={`${selectedPage.title} resources`}>
                                    {siblingLinks.map((item) => (
                                        <Link key={item.label} to={`${basePath}/${item.route}`} aria-current={routeSlug === item.route ? "page" : undefined}>
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            )}
                        </div>
                    )}
                    {markdown ? (
                        <article className={styles.markdown}>
                            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{markdown}</Markdown>
                        </article>
                    ) : isMissing || loadedPage.error ? (
                        <section className={styles.missingChapter}>
                            <span>HTML SECTION NOT FOUND</span>
                            <h2>This HTML notes section is unavailable.</h2>
                            <Link to={basePath}>Back to the HTML notes index <FiArrowRight aria-hidden="true" /></Link>
                        </section>
                    ) : (
                        <section aria-live="polite"><p>Loading this HTML section…</p></section>
                    )}
                    {selectedChapter && (
                        <nav className={styles.chapterNavigation} aria-label="Previous and next lessons">
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
            <a className={styles.referenceLink} href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">
                MDN HTML reference <FiArrowRight aria-hidden="true" />
            </a>
        </div>
    );
}

export default HtmlNotes;
