import chapterIndex from "./chapterIndex.json";

const basePath = "/notes/css-practical-notes";
const chapterFiles = import.meta.glob("./content/**/*.md", {
    import: "default",
    query: "?raw",
});
const slugsByPath = new Map(chapterIndex.map(({ sourcePath, slug }) => [sourcePath, slug]));

function resolveRelativePath(sourcePath, targetPath) {
    const parts = sourcePath.split("/").slice(0, -1);

    for (const part of targetPath.split("/")) {
        if (!part || part === ".") continue;
        if (part === "..") parts.pop();
        else parts.push(part);
    }

    return parts.join("/");
}

export function rewriteInternalMarkdownLinks(markdown, sourcePath) {
    return markdown.replace(/\]\(([^\s)]+)([^)]*)\)/g, (match, href, suffix) => {
        if (/^(https?:|mailto:|tel:|#)/i.test(href)) return match;

        const [targetPath, hash] = href.split("#");
        const resolvedPath = resolveRelativePath(sourcePath, targetPath);
        const targetSlug = slugsByPath.get(resolvedPath);

        if (/^README\.md$/i.test(resolvedPath)) {
            return `](${basePath}${hash ? `#${hash}` : ""}${suffix})`;
        }

        if (!targetSlug) return match;
        return `](${basePath}/${targetSlug}${hash ? `#${hash}` : ""}${suffix})`;
    });
}

const chapters = chapterIndex.map((chapter) => ({
    ...chapter,
    loadContent: async () => {
        const load = chapterFiles[`./content/${chapter.sourcePath}`];
        if (!load) throw new Error(`Missing CSS notes file: ${chapter.sourcePath}`);
        const markdown = await load();
        return rewriteInternalMarkdownLinks(markdown, chapter.sourcePath);
    },
}));

export default chapters;