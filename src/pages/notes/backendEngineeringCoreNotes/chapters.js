export const basePath = "/notes/backend-engineering-core-notes";

export const sections = [
    {
        slug: "node-internals",
        title: "Node Internals",
        description: "Event loop, timers, streams, buffers, backpressure, and runtime scaling.",
        topics: [
            { slug: "event-loop", title: "Event Loop" },
            { slug: "timers", title: "Timers" },
            { slug: "microtasks", title: "Microtasks" },
            { slug: "streams", title: "Streams" },
            { slug: "buffers", title: "Buffers" },
            { slug: "backpressure", title: "Backpressure" },
            { slug: "cluster-workers", title: "Cluster and Workers" },
        ],
    },
    {
        slug: "api-design",
        title: "API Design",
        description: "Design REST resources, version contracts, and communicate outcomes with HTTP status codes.",
        topics: [
            { slug: "rest-principles", title: "REST Principles" },
            { slug: "versioning", title: "Versioning" },
            { slug: "status-codes", title: "Status Codes" },
        ],
    },
    {
        slug: "authentication",
        title: "Authentication",
        description: "Understand identity, token formats, browser cookies, and OAuth flows.",
        topics: [
            { slug: "jwt", title: "JWT" },
            { slug: "cookies", title: "Cookies" },
            { slug: "oauth", title: "OAuth" },
        ],
    },
    {
        slug: "security",
        title: "Security",
        description: "Protect web applications with practical input, browser, and API controls.",
        topics: [
            { slug: "xss", title: "Cross-Site Scripting (XSS)" },
            { slug: "csrf", title: "Cross-Site Request Forgery (CSRF)" },
            { slug: "rate-limiting", title: "Rate Limiting" },
            { slug: "hashing", title: "Password Hashing" },
            { slug: "validation", title: "Input Validation" },
            { slug: "headers", title: "Security Headers" },
        ],
    },
    {
        slug: "performance",
        title: "Performance",
        description: "Improve latency and throughput with caching, Redis, and content delivery networks.",
        topics: [
            { slug: "caching", title: "Caching" },
            { slug: "redis", title: "Redis" },
            { slug: "cdn", title: "CDN" },
        ],
    },
    {
        slug: "observability",
        title: "Observability",
        description: "Make production behavior diagnosable through logs, monitoring, and error tracking.",
        topics: [
            { slug: "logging-and-monitoring", title: "Logging and Monitoring" },
            { slug: "structured-logs", title: "Structured Logs" },
            { slug: "error-tracking", title: "Error Tracking" },
        ],
    },
];

export const topicCount = sections.reduce((count, section) => count + section.topics.length, 0);