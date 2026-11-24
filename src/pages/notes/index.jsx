import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch, FiSliders } from "react-icons/fi";

import TopicCard from "../../components/topicCard";
import topics from "./topics.json";
import styles from "./style.module.css";





const PAGE_SIZE = 9;

function NotesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All topics");
    const [currentPage, setCurrentPage] = useState(1);
    const categories = ["All topics", ...new Set(topics.map((topic) => topic.category))];
    const filteredTopics = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        return topics.filter((topic) => {
            const matchesCategory = activeCategory === "All topics" || topic.category === activeCategory;
            const matchesSearch = !query || `${topic.title} ${topic.category} ${topic.description}`.toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory]);
    const totalPages = Math.max(1, Math.ceil(filteredTopics.length / PAGE_SIZE));
    const page = Math.min(currentPage, totalPages);
    const firstIndex = (page - 1) * PAGE_SIZE;
    const visibleTopics = filteredTopics.slice(firstIndex, firstIndex + PAGE_SIZE);

    function updateSearch(value) {
        setSearchTerm(value);
        setCurrentPage(1);
    }

    function updateCategory(category) {
        setActiveCategory(category);
        setCurrentPage(1);
    }

    function changePage(nextPage) {
        if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
        setCurrentPage(nextPage);
        document.getElementById("topic-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}><FiSliders aria-hidden="true" /> Browse by subject</span>
                <div className={styles.heroHeading}>
                    <h1>Explore the<br /><span>notes library.</span></h1>
                    <p>Find a focused collection, open its route, and jump straight into the subject you need.</p>
                </div>
                <div className={styles.libraryStats}><strong>{topics.length}</strong><span>public collections</span><i /><span>{categories.length - 1} subject areas</span></div>
            </section>

            <section className={styles.catalog}>
                <div className={styles.catalogTop}>
                    <div><span className={styles.sectionEyebrow}>The library</span><h2>Choose a topic</h2></div>
                    <span className={styles.resultCount}>{filteredTopics.length} {filteredTopics.length === 1 ? "collection" : "collections"}</span>
                </div>

                <label className={styles.searchBox}>
                    <FiSearch aria-hidden="true" />
                    <input type="search" value={searchTerm} placeholder="Search topics, tools, or concepts" aria-label="Search note topics" onChange={(event) => updateSearch(event.target.value)} />
                    {searchTerm && <button type="button" onClick={() => updateSearch("")}>Clear</button>}
                </label>

                <div className={styles.categoryFilters} aria-label="Filter topics by subject">
                    {categories.map((category) => (
                        <button key={category} type="button" className={activeCategory === category ? styles.filterActive : ""} aria-pressed={activeCategory === category} onClick={() => updateCategory(category)}>{category}</button>
                    ))}
                </div>

                <div className={styles.resultsHeader} id="topic-results">
                    <div><h3>Collections</h3><p>{filteredTopics.length === 0 ? "Try a different search or subject." : `Showing ${firstIndex + 1}–${Math.min(firstIndex + PAGE_SIZE, filteredTopics.length)} of ${filteredTopics.length}`}</p></div>
                    <span>{String(topics.length).padStart(2, "0")} TOTAL</span>
                </div>

                {visibleTopics.length ? (
                    <div className={styles.topicGrid}>
                        {visibleTopics.map((topic, index) => <TopicCard key={topic.slug} topic={topic} index={firstIndex + index} />)}
                    </div>
                ) : (
                    <div className={styles.emptyState}><FiSearch aria-hidden="true" /><h3>No matching topics</h3><p>Change the search or choose another subject.</p></div>
                )}

                {filteredTopics.length > PAGE_SIZE && (
                    <nav className={styles.pagination} aria-label="Notes library pages">
                        <button type="button" className={styles.pageArrow} disabled={page === 1} onClick={() => changePage(page - 1)}><FiChevronLeft aria-hidden="true" /><span>Previous</span></button>
                        <div className={styles.pageNumbers}>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                                <button key={number} type="button" className={page === number ? styles.pageActive : ""} aria-current={page === number ? "page" : undefined} aria-label={`Go to page ${number}`} onClick={() => changePage(number)}>{String(number).padStart(2, "0")}</button>
                            ))}
                        </div>
                        <button type="button" className={styles.pageArrow} disabled={page === totalPages} onClick={() => changePage(page + 1)}><span>Next</span><FiChevronRight aria-hidden="true" /></button>
                    </nav>
                )}
            </section>
        </div>
    );
}

export default NotesPage;
