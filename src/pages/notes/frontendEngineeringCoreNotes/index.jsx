import { lazy, Suspense, useEffect, useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCode, FiLayers } from "react-icons/fi";
import { Link, NavLink, useParams } from "react-router-dom";

import About from "./source/src/components/about";
import styles from "./style.module.css";

const HtmlDeep = lazy(() => import("./source/src/topics/htmlDeep"));
const SemanticElements = lazy(() => import("./source/src/topics/semanticElements"));
const Accessibility = lazy(() => import("./source/src/topics/accessibility"));
const Seo = lazy(() => import("./source/src/topics/seo"));
const CssDeep = lazy(() => import("./source/src/topics/cssDeep"));
const LayoutSystems = lazy(() => import("./source/src/topics/layoutSystems"));
const Flexbox = lazy(() => import("./source/src/topics/flexbox"));
const Grid = lazy(() => import("./source/src/topics/grid"));
const ResponsiveDesign = lazy(() => import("./source/src/topics/responsiveDesign"));
const AnimationTopic = lazy(() => import("./source/src/topics/animationTopic"));
const Architecture = lazy(() => import("./source/src/topics/architecture"));
const BrowserRendering = lazy(() => import("./source/src/topics/browserRendering"));
const Dom = lazy(() => import("./source/src/topics/dom"));
const ReflowVsRepaint = lazy(() => import("./source/src/topics/reflowVsRepaint"));
const CriticalRenderingPath = lazy(() => import("./source/src/topics/criticalRenderingPath"));
const ReactDeep = lazy(() => import("./source/src/topics/reactDeep"));
const Reconciliation = lazy(() => import("./source/src/topics/reconciliation"));
const VirtualDom = lazy(() => import("./source/src/topics/virtualDom"));
const HooksInternals = lazy(() => import("./source/src/topics/hooksInternals"));
const ContextTopic = lazy(() => import("./source/src/topics/context"));
const PerformanceOptimization = lazy(() => import("./source/src/topics/performanceOptimization"));
const CodeSplitting = lazy(() => import("./source/src/topics/codeSplitting"));

const basePath = "/notes/frontend-engineering-core-notes";
const topics = [
    { slug: "html-deep", title: "HTML Deep", Component: HtmlDeep },
    { slug: "semantic-elements", title: "Semantic Elements", Component: SemanticElements },
    { slug: "accessibility", title: "Accessibility", Component: Accessibility },
    { slug: "seo", title: "SEO", Component: Seo },
    { slug: "css-deep", title: "CSS Deep", Component: CssDeep },
    { slug: "layout-systems", title: "Layout Systems", Component: LayoutSystems },
    { slug: "flexbox", title: "Flexbox", Component: Flexbox },
    { slug: "grid", title: "Grid", Component: Grid },
    { slug: "responsive-design", title: "Responsive Design", Component: ResponsiveDesign },
    { slug: "animation", title: "Animation", Component: AnimationTopic },
    { slug: "architecture", title: "Architecture", Component: Architecture },
    { slug: "browser-rendering", title: "Browser Rendering", Component: BrowserRendering },
    { slug: "dom", title: "DOM", Component: Dom },
    { slug: "reflow-vs-repaint", title: "Reflow vs Repaint", Component: ReflowVsRepaint },
    { slug: "critical-rendering-path", title: "Critical Rendering Path", Component: CriticalRenderingPath },
    { slug: "react-deep", title: "React Deep", Component: ReactDeep },
    { slug: "reconciliation", title: "Reconciliation", Component: Reconciliation },
    { slug: "virtual-dom", title: "Virtual DOM", Component: VirtualDom },
    { slug: "hooks-internals", title: "Hooks Internals", Component: HooksInternals },
    { slug: "context", title: "Context", Component: ContextTopic },
    { slug: "performance-optimization", title: "Performance Optimization", Component: PerformanceOptimization },
    { slug: "code-splitting", title: "Code Splitting", Component: CodeSplitting },
];

function FrontendEngineeringCoreNotes() {
    const { topicSlug } = useParams();
    const navigationRef = useRef(null);
    const selectedTopic = topics.find((topic) => topic.slug === topicSlug);
    const SelectedComponent = selectedTopic?.Component;

    useEffect(() => {
        navigationRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [topicSlug]);

    return (
        <div className={styles.layout}>
            <header className={styles.projectHeader}>
                <Link className={styles.backLink} to="/notes"><FiArrowLeft aria-hidden="true" /> All notes</Link>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> FRONTEND ENGINEERING</span>
                    <h1>Frontend Engineering Core Notes</h1>
                    <p>From semantic markup and browser rendering to React internals and performance.</p>
                </div>
                <span className={styles.topicCount}>{topics.length} topics</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>Frontend study guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="Frontend engineering topics">
                        <NavLink to={basePath} end className={({ isActive }) => styles.navLink + (isActive ? " " + styles.active : "")}>
                            <FiBookOpen aria-hidden="true" /><span>Overview</span>
                        </NavLink>
                        {topics.map((topic, index) => (
                            <NavLink key={topic.slug} to={basePath + "/" + topic.slug} className={({ isActive }) => styles.navLink + (isActive ? " " + styles.active : "")}>
                                <span className={styles.navNumber}>{String(index + 1).padStart(2, "0")}</span>
                                <span>{topic.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {SelectedComponent ? (
                        <>
                            <div className={styles.chapterHeading}>
                                <span><FiCode aria-hidden="true" /> TOPIC {String(topics.indexOf(selectedTopic) + 1).padStart(2, "0")}</span>
                                <h2>{selectedTopic.title}</h2>
                            </div>
                            <div className={styles.topicContent}>
                                <Suspense fallback={<p className={styles.loading} role="status">Loading topic…</p>}>
                                    <SelectedComponent />
                                </Suspense>
                            </div>
                        </>
                    ) : topicSlug ? (
                        <section className={styles.missingTopic}>
                            <span>TOPIC NOT FOUND</span>
                            <h2>This frontend engineering topic is unavailable.</h2>
                            <Link to={basePath}>Back to the notes overview <FiArrowRight aria-hidden="true" /></Link>
                        </section>
                    ) : (
                        <section className={styles.overview}>
                            <About />
                            <div className={styles.overviewHint}>
                                <FiLayers aria-hidden="true" /> Select a topic from the contents panel to open its original notes and examples.
                            </div>
                            <div className={styles.topicGrid}>
                                {topics.map((topic, index) => (
                                    <Link className={styles.topicCard} key={topic.slug} to={basePath + "/" + topic.slug}>
                                        <span>{String(index + 1).padStart(2, "0")}</span>
                                        <h3>{topic.title}</h3>
                                        <span className={styles.cardAction}>Open topic <FiArrowRight aria-hidden="true" /></span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default FrontendEngineeringCoreNotes;
