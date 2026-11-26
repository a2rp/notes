import overview from "./README.md?raw";

const basePath = "/notes/html-notes";
const contentFiles = import.meta.glob("./content/**/*.md", {
    import: "default",
    query: "?raw",
});

function getSourcePath(path) {
    return path.replace(/^\.\/content\//, "");
}

function getFileName(sourcePath) {
    return sourcePath.split("/").at(-1);
}

function getSlug(sourcePath) {
    return getFileName(sourcePath).replace(/^\d+-/, "").replace(/\.md$/i, "");
}

const lessonTitles = new Map(
    [...overview.matchAll(/^\|\s*(\d+)\s*\|\s*\[([^\]]+)\]\((lessons\/[^)]+)\)/gm)]
        .map(([, , title, sourcePath]) => [sourcePath, title]),
);

export const chapters = Object.keys(contentFiles)
    .map(getSourcePath)
    .filter((sourcePath) => sourcePath.startsWith("lessons/"))
    .map((sourcePath) => {
        const number = Number(getFileName(sourcePath).match(/^\d+/)?.[0] ?? 0);
        const slug = getSlug(sourcePath);
        const title = lessonTitles.get(sourcePath) ?? slug.replaceAll("-", " ");

        return { number, slug, sourcePath, title };
    })
    .sort((first, second) => first.number - second.number);

const chaptersBySlug = new Map(chapters.map((chapter) => [chapter.slug, chapter]));
const guideEntries = [
    { kind: "reference", kindLabel: "QUICK REFERENCE", lessonSlug: "", number: 0, routeSlug: "summary", slug: "summary", sourcePath: "html-summary.md", title: "HTML Summary" },
    { kind: "reference", kindLabel: "QUICK REFERENCE", lessonSlug: "", number: 0, routeSlug: "keywords", slug: "keywords", sourcePath: "html-keywords.md", title: "HTML Keywords and Syntax Terms" },
    { kind: "reference", kindLabel: "QUICK REFERENCE", lessonSlug: "", number: 0, routeSlug: "elements-reference", slug: "elements-reference", sourcePath: "elements-reference.md", title: "HTML Elements Reference" },
    { kind: "reference", kindLabel: "QUESTION INDEX", lessonSlug: "", number: 0, routeSlug: "questions-and-answers", slug: "questions-and-answers", sourcePath: "qnas/README.md", title: "HTML Questions and Answers" },
];

export const pages = [
    ...chapters.map((chapter) => ({
        ...chapter,
        kind: "lesson",
        kindLabel: "LESSON",
        lessonSlug: chapter.slug,
        routeSlug: chapter.slug,
    })),
    ...Object.keys(contentFiles)
        .map(getSourcePath)
        .filter((sourcePath) => /^(qnas|examples)\/\d+-/.test(sourcePath))
        .map((sourcePath) => {
            const isQna = sourcePath.startsWith("qnas/");
            const slug = getSlug(sourcePath);
            const lesson = chaptersBySlug.get(slug);
            const kind = isQna ? "qna" : "example";

            return {
                kind,
                kindLabel: isQna ? "QUESTIONS AND ANSWERS" : "CODE EXAMPLE",
                lessonSlug: lesson?.slug ?? "",
                number: lesson?.number ?? 0,
                routeSlug: `${slug}/${isQna ? "questions-and-answers" : "example"}`,
                slug,
                sourcePath,
                title: lesson?.title ?? slug.replaceAll("-", " "),
            };
        }),
    ...guideEntries,
];

const routesBySourcePath = new Map(pages.map((page) => [page.sourcePath, page.routeSlug]));

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
        if (/^README\.md$/i.test(resolvedPath)) return `](${basePath}${hash ? `#${hash}` : ""}${suffix})`;

        const routeSlug = routesBySourcePath.get(resolvedPath);
        if (!routeSlug) return match;
        return `](${basePath}/${routeSlug}${hash ? `#${hash}` : ""}${suffix})`;
    });
}

export function loadPageContent(sourcePath) {
    const load = contentFiles[`./content/${sourcePath}`];
    if (!load) return Promise.reject(new Error(`Missing HTML notes file: ${sourcePath}`));
    return load().then((markdown) => rewriteInternalMarkdownLinks(markdown, sourcePath));
}
