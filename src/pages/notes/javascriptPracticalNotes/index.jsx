import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCode } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import chapters, { loadMarkdown } from "./chapters";
import markdownComponents from "./markdownComponents";
import styles from "./style.module.css";

const basePath = "/notes/javascript-practical-notes";
const sections = [
    { slug: "lessons", label: "Lessons" },
    { slug: "qnas", label: "Q&A" },
    { slug: "examples", label: "Examples" },
    { slug: "guides", label: "Quick guides" },
];

function JavaScriptPracticalNotes() {
    const { section, contentSlug } = useParams();
    const { pathname } = useLocation();
    const navigationRef = useRef(null);
    const [loadedContent, setLoadedContent] = useState({ key: "", content: null });
    const activeSection = sections.find((item) => item.slug === section) ?? sections[0];
    const sectionChapters = chapters.filter((chapter) => chapter.section === activeSection.slug);
    const selectedIndex = sectionChapters.findIndex((chapter) => chapter.slug === contentSlug);
    const selectedChapter = selectedIndex >= 0 ? sectionChapters[selectedIndex] : null;
    const markdownKey = section && contentSlug ? `${section}/${contentSlug}` : "overview";
    const markdown = loadedContent.key === markdownKey ? loadedContent.content : null;

    useEffect(() => {
        const isOverview = !section && !contentSlug;
        if (!isOverview && !selectedChapter) return undefined;

        let cancelled = false;
        loadMarkdown(isOverview ? null : selectedChapter).then((content) => {
            if (!cancelled) setLoadedContent({ key: markdownKey, content });
        });

        return () => {
            cancelled = true;
        };
    }, [section, contentSlug, selectedChapter, markdownKey]);

    useEffect(() => {
        navigationRef.current
            ?.querySelector('[aria-current="page"]')
            ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [pathname]);

    const sectionCount = (slug) => chapters.filter((chapter) => chapter.section === slug).length;
    const routeFor = (item) => `${basePath}/${item.section}/${item.slug}`;
    const relatedChapter = (kind) => chapters.find(
        (chapter) => chapter.section === kind && chapter.fileName === selectedChapter?.fileName,
    );

    return (
        <div className={styles.layout}>
            <header className={styles.projectHeader}>
                <Link className={styles.backLink} to="/notes"><FiArrowLeft aria-hidden="true" /> All notes</Link>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> JAVASCRIPT / PRACTICAL CURRICULUM</span>
                    <h1>JavaScript Practical Notes</h1>
                    <p>145 lessons with companion Q&amp;A, runnable examples, and quick reference guides.</p>
                </div>
                <span className={styles.chapterCount}>145 lessons</span>
            </header>

            <nav className={styles.sectionNavigation} aria-label="JavaScript curriculum sections">
                <Link to={basePath} className={!section ? styles.active : ""}><FiBookOpen aria-hidden="true" /> Overview</Link>
                {sections.map((item) => {
                    const firstChapter = chapters.find((chapter) => chapter.section === item.slug);
                    const target = firstChapter ? routeFor(firstChapter) : basePath;
                    return (
                        <Link key={item.slug} to={target} className={section === item.slug ? styles.active : ""}>
                            {item.label}<span>{sectionCount(item.slug)}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>{activeSection.label.toUpperCase()}</span>
                        <strong>JavaScript study guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label={`${activeSection.label} navigation`}>
                        {sectionChapters.map((chapter) => (
                            <NavLink key={chapter.fileName} to={routeFor(chapter)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
                                <span className={styles.navNumber}>{chapter.number ? String(chapter.number).padStart(3, "0") : <FiBookOpen aria-hidden="true" />}</span>
                                <span>{chapter.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {selectedChapter && (
                        <div className={styles.chapterHeading}>
                            <span><FiCode aria-hidden="true" /> {activeSection.label.toUpperCase()} {String(selectedChapter.number).padStart(3, "0")}</span>
                            <h2>{selectedChapter.title}</h2>
                        </div>
                    )}
                    {markdown ? (
                        <article className={styles.markdown}>
                            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{markdown}</Markdown>
                        </article>
                    ) : section && !selectedChapter ? (
                        <section className={styles.missingChapter}>
                            <span>CONTENT NOT FOUND</span>
                            <h2>This JavaScript curriculum page is unavailable.</h2>
                            <Link to={basePath}>Back to the curriculum overview <FiArrowRight aria-hidden="true" /></Link>
                        </section>
                    ) : (
                        <section className={styles.missingChapter} aria-live="polite">
                            <span>LOADING CONTENT</span>
                            <h2>Opening the selected notes...</h2>
                        </section>
                    )}
                    {selectedChapter && (
                        <>
                            {selectedChapter.section === "lessons" && (
                                <nav className={styles.chapterNavigation} aria-label="Companion study materials">
                                    {[["qnas", "Open Q&A"], ["examples", "Open example"]].map(([kind, label]) => {
                                        const companion = relatedChapter(kind);
                                        return companion ? <Link key={kind} to={routeFor(companion)}><FiCode aria-hidden="true" /><span>{label}</span><FiArrowRight aria-hidden="true" /></Link> : null;
                                    })}
                                </nav>
                            )}
                            <nav className={styles.chapterNavigation} aria-label="Previous and next chapters">
                                <Link to={selectedIndex === 0 ? basePath : routeFor(sectionChapters[selectedIndex - 1])}>
                                    <FiArrowLeft aria-hidden="true" />
                                    <span>{selectedIndex === 0 ? "Curriculum overview" : sectionChapters[selectedIndex - 1].title}</span>
                                </Link>
                                {selectedIndex < sectionChapters.length - 1 && (
                                    <Link to={routeFor(sectionChapters[selectedIndex + 1])}>
                                        <span>{sectionChapters[selectedIndex + 1].title}</span>
                                        <FiArrowRight aria-hidden="true" />
                                    </Link>
                                )}
                            </nav>
                        </>
                    )}
                </main>
            </div>
            <a className={styles.referenceLink} href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" target="_blank" rel="noopener noreferrer">
                Official JavaScript Guide <FiArrowRight aria-hidden="true" />
            </a>
        </div>
    );
}

export default JavaScriptPracticalNotes;
