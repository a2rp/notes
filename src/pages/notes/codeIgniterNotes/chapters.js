const chapterFiles = import.meta.glob("./chapters/*.md", {
    eager: true,
    import: "default",
    query: "?raw",
});

const chapters = Object.entries(chapterFiles)
    .map(([path, content]) => {
        const fileName = path.split("/").at(-1);
        const number = Number(fileName.match(/^\d+/)?.[0] ?? 0);
        const slug = fileName.replace(/^\d+-/, "").replace(/\.md$/i, "");
        const heading = content.match(/^#\s+(.+)$/m)?.[1] ?? fileName;

        return {
            content,
            fileName,
            number,
            slug,
            title: heading.replace(/^\d+\.\s*/, ""),
        };
    })
    .sort((first, second) => first.number - second.number);

export default chapters;
