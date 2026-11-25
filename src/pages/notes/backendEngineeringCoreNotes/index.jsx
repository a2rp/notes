import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
    FiActivity,
    FiArrowLeft,
    FiArrowRight,
    FiBookOpen,
    FiChevronDown,
    FiCode,
    FiDatabase,
    FiLayers,
    FiLock,
    FiServer,
    FiShield,
} from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

import { basePath, sections, topicCount } from "./chapters";
import styles from "./style.module.css";

const NodeInternals = lazy(() => import("./topics/nodeInternals"));
const EventLoop = lazy(() => import("./topics/eventLoop"));
const Streams = lazy(() => import("./topics/streams"));
const Buffers = lazy(() => import("./topics/buffers"));
const ApiDesign = lazy(() => import("./topics/apiDesign"));
const RestPrinciples = lazy(() => import("./topics/apiDesign/restPrinciples"));
const Versioning = lazy(() => import("./topics/apiDesign/versioning"));
const StatusCodes = lazy(() => import("./topics/statusCodes"));
const Authentication = lazy(() => import("./topics/authentication"));
const Jwt = lazy(() => import("./topics/authentication/jwt"));
const Cookies = lazy(() => import("./topics/authentication/cookies"));
const OAuth = lazy(() => import("./topics/authentication/oauth"));
const Security = lazy(() => import("./topics/security"));
const Xss = lazy(() => import("./topics/security/xss"));
const Csrf = lazy(() => import("./topics/security/csrf"));
const RateLimiting = lazy(() => import("./topics/rateLimiting"));
const Hashing = lazy(() => import("./topics/hashing"));
const Caching = lazy(() => import("./topics/caching"));
const Redis = lazy(() => import("./topics/redis"));
const Cdn = lazy(() => import("./topics/cdn"));
const LoggingAndMonitoring = lazy(() => import("./topics/loggingAndMonitoring"));
const StructuredLogs = lazy(() => import("./topics/observability/structuredLogs"));
const ErrorTracking = lazy(() => import("./topics/errorTracking"));

const contentByPath = {
    "node-internals": () => <><NodeInternals /><EventLoop /><Streams /><Buffers /></>,
    "node-internals/event-loop": () => <EventLoop />,
    "node-internals/timers": () => <NodeInternals focusKey="timers" />,
    "node-internals/microtasks": () => <NodeInternals focusKey="microVsMacro" />,
    "node-internals/streams": () => <Streams />,
    "node-internals/buffers": () => <Buffers />,
    "node-internals/backpressure": () => <NodeInternals focusKey="backpressure" />,
    "node-internals/cluster-workers": () => <NodeInternals focusKey="clusterWorkers" />,

    "api-design": () => <><ApiDesign /><RestPrinciples /><Versioning /><StatusCodes /></>,
    "api-design/rest-principles": () => <RestPrinciples />,
    "api-design/versioning": () => <Versioning />,
    "api-design/status-codes": () => <StatusCodes />,

    authentication: () => <><Authentication /><Jwt /><Cookies /><OAuth /></>,
    "authentication/jwt": () => <Jwt />,
    "authentication/cookies": () => <Cookies />,
    "authentication/oauth": () => <OAuth />,

    security: () => <><Security /><Xss /><Csrf /><RateLimiting /><Hashing /></>,
    "security/xss": () => <Xss />,
    "security/csrf": () => <Csrf />,
    "security/rate-limiting": () => <RateLimiting />,
    "security/hashing": () => <Hashing />,
    "security/validation": () => <Security focusKey="validation" />,
    "security/headers": () => <Security focusKey="headers" />,

    performance: () => <><Caching /><Redis /><Cdn /></>,
    "performance/caching": () => <Caching />,
    "performance/redis": () => <Redis />,
    "performance/cdn": () => <Cdn />,

    observability: () => <><LoggingAndMonitoring /><StructuredLogs /><ErrorTracking /></>,
    "observability/logging-and-monitoring": () => <LoggingAndMonitoring />,
    "observability/structured-logs": () => <StructuredLogs />,
    "observability/error-tracking": () => <ErrorTracking />,
};

const sectionIcons = {
    "node-internals": FiServer,
    "api-design": FiCode,
    authentication: FiLock,
    security: FiShield,
    performance: FiDatabase,
    observability: FiActivity,
};

function Overview() {
    return (
        <section className={styles.overview}>
            <span className={styles.eyebrow}><FiLayers aria-hidden="true" /> PRACTICAL BACKEND STUDY GUIDE</span>
            <h2>Understand the systems<br /><span>behind every request.</span></h2>
            <p className={styles.overviewIntro}>
                A focused guide to how Node.js runs work, how reliable APIs are designed,
                and how backend systems are secured, scaled, and operated.
            </p>

            <div className={styles.stats}>
                <div><strong>{String(sections.length).padStart(2, "0")}</strong><span>core sections</span></div>
                <div><strong>{String(topicCount).padStart(2, "0")}</strong><span>focused topics</span></div>
                <div><strong>01</strong><span>learning path</span></div>
            </div>

            <div className={styles.sectionGrid}>
                {sections.map((section, index) => {
                    const Icon = sectionIcons[section.slug];
                    return (
                        <Link className={styles.sectionCard} key={section.slug} to={basePath + "/" + section.slug}>
                            <span className={styles.cardTop}>
                                <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                                <Icon aria-hidden="true" />
                                <span>{String(section.topics.length).padStart(2, "0")} topics</span>
                            </span>
                            <h3>{section.title}</h3>
                            <p>{section.description}</p>
                            <span className={styles.cardAction}>Explore section <FiArrowRight aria-hidden="true" /></span>
                        </Link>
                    );
                })}
            </div>

            <div className={styles.studyPath}>
                <span className={styles.eyebrow}>SUGGESTED STUDY PATH</span>
                <p>Start with the Node.js runtime, then move through API contracts and identity. Continue into security, performance, and production observability.</p>
            </div>
        </section>
    );
}

function BackendEngineeringCoreNotes() {
    const { pathname } = useLocation();
    const navigationRef = useRef(null);
    const currentPath = pathname.replace(/\/+$/, "").slice(basePath.length).replace(/^\/+/, "");
    const currentSection = sections.find((section) => currentPath === section.slug || currentPath.startsWith(section.slug + "/"));
    const selectedTopic = currentSection?.topics.find((topic) => currentPath === currentSection.slug + "/" + topic.slug);
    const [expandedSection, setExpandedSection] = useState(currentSection?.slug || null);
    const content = currentPath ? contentByPath[currentPath] : null;

    useEffect(() => {
        navigationRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [currentPath]);

    return (
        <div className={styles.layout}>
            <header className={styles.projectHeader}>
                <Link className={styles.backLink} to="/notes"><FiArrowLeft aria-hidden="true" /> All notes</Link>
                <div className={styles.projectIdentity}>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> BACKEND SYSTEMS</span>
                    <h1>Backend Engineering Core Notes</h1>
                    <p>Runtime fundamentals, reliable APIs, security, performance, and production operations.</p>
                </div>
                <span className={styles.chapterCount}>{topicCount} topics <i /> {sections.length} sections</span>
            </header>

            <div className={styles.body}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <span>CONTENTS</span>
                        <strong>Backend study guide</strong>
                    </div>
                    <nav ref={navigationRef} className={styles.navigation} aria-label="Backend engineering topics">
                        <NavLink to={basePath} end className={({ isActive }) => styles.navLink + (isActive ? " " + styles.active : "")}>
                            <FiBookOpen aria-hidden="true" /><span>Overview</span>
                        </NavLink>
                        {sections.map((section) => {
                            const Icon = sectionIcons[section.slug];
                            const isExpanded = expandedSection === section.slug;
                            return (
                                <div className={styles.navGroup} key={section.slug}>
                                    <div className={styles.navRow}>
                                        <NavLink
                                            to={basePath + "/" + section.slug}
                                            end
                                            className={({ isActive }) => styles.navLink + " " + styles.sectionLink + (isActive ? " " + styles.active : "")}
                                        >
                                            <Icon aria-hidden="true" /><span>{section.title}</span>
                                        </NavLink>
                                        <button
                                            className={styles.toggleButton}
                                            type="button"
                                            aria-label={(isExpanded ? "Collapse " : "Expand ") + section.title}
                                            aria-expanded={isExpanded}
                                            onClick={() => setExpandedSection((value) => value === section.slug ? null : section.slug)}
                                        >
                                            <FiChevronDown aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className={styles.subList} hidden={!isExpanded}>
                                        {section.topics.map((topic, index) => {
                                            const to = basePath + "/" + section.slug + "/" + topic.slug;
                                            return (
                                                <NavLink
                                                    key={topic.slug}
                                                    to={to}
                                                    className={({ isActive }) => styles.subLink + (isActive ? " " + styles.active : "")}
                                                >
                                                    <span className={styles.navNumber}>{String(index + 1).padStart(2, "0")}</span>
                                                    <span>{topic.title}</span>
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </nav>
                    <p className={styles.sidebarHint}>Pick a section and open a topic to explore the notes.</p>
                </aside>

                <main className={styles.content}>
                    {!currentPath ? (
                        <Overview />
                    ) : content ? (
                        <>
                            <div className={styles.chapterHeading}>
                                <span><FiCode aria-hidden="true" /> {currentSection?.title || "BACKEND ENGINEERING"}</span>
                                <h2>{selectedTopic?.title || currentSection?.title || "Backend engineering notes"}</h2>
                                {selectedTopic && <p>{currentSection?.description}</p>}
                            </div>
                            <Suspense fallback={<div className={styles.loading} role="status">Loading note content…</div>}>
                                {content()}
                            </Suspense>
                        </>
                    ) : (
                        <section className={styles.missingChapter}>
                            <span>TOPIC NOT FOUND</span>
                            <h2>This backend engineering topic is unavailable.</h2>
                            <Link to={basePath}>Back to the notes overview <FiArrowRight aria-hidden="true" /></Link>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default BackendEngineeringCoreNotes;