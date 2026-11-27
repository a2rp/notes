import { createElement } from "react";
import { Link } from "react-router-dom";

import chapters from "./chapters";

const basePath = "/notes/javascript-practical-notes";
const chaptersByFile = new Map(chapters.map((chapter) => [`${chapter.section}/${chapter.fileName}`, chapter]));

function MarkdownLink({ href = "", children, ...props }) {
    const { node, ...linkProps } = props;
    void node;

    const [filePath, hash] = href.split("#");
    const parts = filePath.replace(/^\.\//, "").split("/");
    const fileName = parts.at(-1);
    const section = parts.length > 1 ? parts.at(-2) : "guides";
    const chapter = chaptersByFile.get(`${section}/${fileName}`);
    const anchor = hash ? `#${hash}` : "";

    if (/^README\.md$/i.test(fileName)) {
        return createElement(Link, { to: `${basePath}${anchor}`, ...linkProps }, children);
    }

    if (chapter) {
        return createElement(Link, { to: `${basePath}/${chapter.section}/${chapter.slug}${anchor}`, ...linkProps }, children);
    }

    const isExternal = /^(https?:|mailto:|tel:)/i.test(href);

    return createElement("a", {
        href,
        target: isExternal ? "_blank" : undefined,
        rel: isExternal ? "noopener noreferrer" : undefined,
        ...linkProps,
    }, children);
}

const markdownComponents = { a: MarkdownLink };

export default markdownComponents;
