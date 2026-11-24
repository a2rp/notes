import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu, FiSearch, FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

import topics from "../../pages/notes/topics.json";
import styles from "./style.module.css";

function Header() {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTopicsOpen, setIsTopicsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [topicsExpanded, setTopicsExpanded] = useState(pathname.startsWith("/notes"));
    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    const menuPanelRef = useRef(null);
    const topicMenuRef = useRef(null);
    const dropdownRef = useRef(null);
    const menuTopicsListRef = useRef(null);
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const visibleTopics = topics
        .filter((topic) => !normalizedSearch || `${topic.title} ${topic.category}`.toLowerCase().includes(normalizedSearch));
    const selectedTopicSlug = topics.find(({ slug }) => {
        const topicPath = `/notes/${slug}`;
        return pathname === topicPath || pathname.startsWith(`${topicPath}/`);
    })?.slug;
    const matches = (label) => !normalizedSearch || label.toLowerCase().includes(normalizedSearch);
    const showHome = matches("Home");
    const showAbout = matches("About");
    const showContact = matches("Contact");
    const showNotes = matches("Notes") || visibleTopics.length > 0;
    const activeTopics = normalizedSearch ? true : topicsExpanded;
    const linkClassName = styles.primaryLink;

    useEffect(() => {
        if (!isTopicsOpen) return undefined;

        function handlePointerDown(event) {
            if (!topicMenuRef.current?.contains(event.target)) setIsTopicsOpen(false);
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") setIsTopicsOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isTopicsOpen]);

    useEffect(() => {
        if (!isTopicsOpen) return;

        dropdownRef.current
            ?.querySelector('[data-selected-topic="true"]')
            ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, [isTopicsOpen, pathname]);

    useEffect(() => {
        if (!isMenuOpen || !activeTopics) return;

        menuTopicsListRef.current
            ?.querySelector('[data-selected-topic="true"]')
            ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, [activeTopics, isMenuOpen, normalizedSearch, pathname]);

    useLayoutEffect(() => {
        if (!isMenuOpen) return undefined;

        const menuButton = menuButtonRef.current;
        const previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                return;
            }

            if (event.key !== "Tab") return;
            const elements = menuPanelRef.current?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
            const first = elements?.[0];
            const last = elements?.[elements.length - 1];
            if (!menuPanelRef.current?.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? last : first)?.focus();
            } else if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.documentElement.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            menuButton?.focus();
        };
    }, [isMenuOpen]);

    function closeMenu() {
        setIsMenuOpen(false);
        setSearchTerm("");
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <NavLink to="/" end className={styles.brand} aria-label="Notes home">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                    <span>Notes</span>
                </NavLink>

                <div className={styles.headerActions}>
                    <nav className={styles.primaryNavigation} aria-label="Main navigation">
                        <NavLink to="/" end className={linkClassName}>Home</NavLink>
                        <NavLink to="/about" className={linkClassName}>About</NavLink>
                        <NavLink to="/contact" className={linkClassName}>Contact</NavLink>
                        <div ref={topicMenuRef} className={`${styles.topicMenu} ${pathname.startsWith("/notes") ? styles.topicMenuActive : ""} ${isTopicsOpen ? styles.topicMenuOpen : ""}`}>
                            <NavLink to="/notes" className={linkClassName}>Notes</NavLink>
                            <button className={styles.topicMenuToggle} type="button" aria-label="Show note topics" aria-expanded={isTopicsOpen} onClick={() => setIsTopicsOpen((open) => !open)}>
                                <FiChevronDown aria-hidden="true" />
                            </button>
                            <div ref={dropdownRef} className={styles.primaryDropdown} hidden={!isTopicsOpen}>
                                {topics.map((topic) => (
                                    <NavLink key={topic.slug} to={`/notes/${topic.slug}`} data-selected-topic={topic.slug === selectedTopicSlug ? "true" : undefined} className={styles.dropdownLink} onClick={() => setIsTopicsOpen(false)}>{topic.title}</NavLink>
                                ))}
                            </div>
                        </div>
                    </nav>
                    <button ref={menuButtonRef} className={styles.menuButton} type="button" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="site-navigation-menu" onClick={() => { setIsTopicsOpen(false); setSearchTerm(""); setIsMenuOpen((open) => !open); }}>
                        {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className={styles.menuOverlay} role="presentation" onClick={closeMenu}>
                    <section ref={menuPanelRef} id="site-navigation-menu" className={styles.menuPanel} role="dialog" aria-modal="true" aria-label="Site navigation" onClick={(event) => event.stopPropagation()}>
                        <div className={styles.menuHeader}>
                            <span className={styles.menuTitle}>Explore</span>
                            <button ref={closeButtonRef} className={styles.closeButton} type="button" aria-label="Close menu" onClick={closeMenu}><FiX aria-hidden="true" /></button>
                        </div>
                        <label className={styles.menuSearch}>
                            <FiSearch aria-hidden="true" />
                            <input type="search" value={searchTerm} placeholder="Search pages and topics" aria-label="Search pages and topics" autoComplete="off" onChange={(event) => setSearchTerm(event.target.value)} />
                        </label>
                        <nav className={styles.menuList} aria-label="Site links">
                            {showHome && <NavLink to="/" end className={styles.navLink} onClick={closeMenu}>Home</NavLink>}
                            {showAbout && <NavLink to="/about" className={styles.navLink} onClick={closeMenu}>About</NavLink>}
                            {showContact && <NavLink to="/contact" className={styles.navLink} onClick={closeMenu}>Contact</NavLink>}
                            {showNotes && (
                                <div className={styles.menuTopics}>
                                    <div className={styles.menuTopicsRow}>
                                        <NavLink to="/notes" className={styles.navLink} onClick={closeMenu}>Notes library</NavLink>
                                        <button className={styles.submenuToggle} type="button" aria-label={activeTopics ? "Collapse topics" : "Expand topics"} aria-expanded={activeTopics} onClick={() => setTopicsExpanded((expanded) => !expanded)}><FiChevronDown aria-hidden="true" /></button>
                                    </div>
                                    <div ref={menuTopicsListRef} className={styles.menuSubList} hidden={!activeTopics}>
                                        {visibleTopics.map((topic) => <NavLink key={topic.slug} to={`/notes/${topic.slug}`} data-selected-topic={topic.slug === selectedTopicSlug ? "true" : undefined} className={styles.menuSubLink} onClick={closeMenu}>{topic.title}</NavLink>)}
                                    </div>
                                </div>
                            )}
                            {normalizedSearch && !showHome && !showAbout && !showContact && !showNotes && <p className={styles.menuEmptyState}>No matching pages or topics.</p>}
                        </nav>
                    </section>
                </div>
            )}
        </header>
    );
}

export default Header;
