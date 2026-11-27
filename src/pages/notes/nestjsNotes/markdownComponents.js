import { createElement } from "react";
import { Link } from "react-router-dom";

import chapters from "./chapters";

const basePath = "/notes/nestjs-notes";
const chaptersByFile = new Map(chapters.map((chapter) => [chapter.fileName, chapter]));

function MarkdownLink({ href = "", children, ...props }) {
    const { node, ...linkProps } = props;
    void node;

    const [filePath, hash] = href.split("#");
    const chapterFile = filePath.split("/").at(-1);
    const chapter = chaptersByFile.get(chapterFile);
    const anchor = hash ? `#${hash}` : "";

    if (/^README\.md$/i.test(chapterFile)) {
        return createElement(Link, { to: `${basePath}${anchor}`, ...linkProps }, children);
    }

    if (chapter) {
        return createElement(Link, { to: `${basePath}/${chapter.slug}${anchor}`, ...linkProps }, children);
    }

    const isExternal = /^(https?:|mailto:|tel:)/i.test(href);
    return createElement("a", {
        href,
        target: isExternal ? "_blank" : undefined,
        rel: isExternal ? "noopener noreferrer" : undefined,
        ...linkProps,
    }, children);
}

export default { a: MarkdownLink };
