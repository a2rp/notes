import { createElement } from "react";
import { Link } from "react-router-dom";

const basePath = "/notes/css-practical-notes";

function MarkdownLink({ href = "", children, ...props }) {
    const { node, ...linkProps } = props;
    void node;

    if (href.startsWith(basePath)) {
        return createElement(Link, { to: href, ...linkProps }, children);
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