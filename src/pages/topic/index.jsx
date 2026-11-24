import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowUpRight, FiBookOpen, FiGithub } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";

import Spinner from "../../components/spinner";
import topics from "../notes/topics.json";
import styles from "./style.module.css";

function TopicPage() {
    const { slug } = useParams();
    const topic = topics.find((item) => item.slug === slug);
    const [loadedContent, setLoadedContent] = useState({ slug: null, content: "", status: "loading" });

    useEffect(() => {
        if (!topic) return undefined;

        const controller = new AbortController();
        const readmeUrl = `https://raw.githubusercontent.com/a2rp/${encodeURIComponent(topic.slug)}/main/README.md`;

        fetch(readmeUrl, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Repository README is unavailable.");
                return response.text();
            })
            .then((markdown) => {
                setLoadedContent({ slug, content: markdown, status: "ready" });
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    setLoadedContent({ slug, content: "", status: "ready" });
                }
            });

        return () => controller.abort();
    }, [slug, topic]);

    const isLoading = loadedContent.slug !== slug || loadedContent.status === "loading";
    const content = loadedContent.slug === slug ? loadedContent.content : "";

    if (!topic) {
        return (
            <div className={styles.missingTopic}>
                <span>TOPIC NOT FOUND</span>
                <h1>This collection is not here.</h1>
                <Link to="/notes"><FiArrowLeft aria-hidden="true" /> Back to all notes</Link>
            </div>
        );
    }

    if (isLoading) return <Spinner />;

    const markdownComponents = {
        a({ href = "", children, ...props }) {
            const anchorProps = { ...props };
            delete anchorProps.node;
            const isRelative = href && !/^(https?:|mailto:|#|\/)/i.test(href);
            const destination = isRelative
                ? `https://github.com/a2rp/${topic.slug}/blob/main/${href.replace(/^\.\//, "")}`
                : href;
            const isExternal = /^https?:/i.test(destination);
            return <a href={destination} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} {...anchorProps}>{children}</a>;
        },
        img({ src = "", alt = "", ...props }) {
            const imageProps = { ...props };
            delete imageProps.node;
            const isRelative = src && !/^(https?:|data:|\/)/i.test(src);
            const imageSource = isRelative
                ? `https://raw.githubusercontent.com/a2rp/${topic.slug}/main/${src.replace(/^\.\//, "")}`
                : src;
            return <img src={imageSource} alt={alt} loading="lazy" {...imageProps} />;
        },
    };

    return (
        <div className={styles.page}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <Link to="/notes"><FiArrowLeft aria-hidden="true" /> Notes library</Link>
                <span>/</span>
                <span>{topic.title}</span>
            </nav>

            <header className={styles.topicHero}>
                <div>
                    <span className={styles.eyebrow}><FiBookOpen aria-hidden="true" /> {topic.category}</span>
                    <h1>{topic.title}</h1>
                    <p>{topic.description}</p>
                </div>
                <a className={styles.sourceLink} href={topic.repository} target="_blank" rel="noopener noreferrer">
                    <FiGithub aria-hidden="true" /> Source repository <FiArrowUpRight aria-hidden="true" />
                </a>
            </header>

            <article className={styles.article}>
                {content ? (
                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</Markdown>
                ) : (
                    <div className={styles.noReadme}>
                        <h2>Collection overview</h2>
                        <p>{topic.description}</p>
                        <a href={topic.repository} target="_blank" rel="noopener noreferrer">Open the repository to browse the full notes <FiArrowUpRight aria-hidden="true" /></a>
                    </div>
                )}
            </article>
        </div>
    );
}

export default TopicPage;
