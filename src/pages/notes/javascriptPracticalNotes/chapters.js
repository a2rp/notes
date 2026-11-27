import chapterMetadata from "./chapters.json";

const markdownLoaders = import.meta.glob("./**/*.md", {
    import: "default",
    query: "?raw",
});

async function loadMarkdown(chapter) {
    const path = chapter
        ? chapter.section === "guides"
            ? `./${chapter.fileName}`
            : `./${chapter.section}/${chapter.fileName}`
        : "./README.md";
    const load = markdownLoaders[path];
    return load ? load() : null;
}

export { loadMarkdown };
export default chapterMetadata.map((chapter) => ({
    ...chapter,
    title: chapter.title.replace(/^\d+\s*[-.)|:]\s*/, ""),
}));
