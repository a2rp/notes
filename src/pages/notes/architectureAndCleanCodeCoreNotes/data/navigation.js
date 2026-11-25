import {
    FiActivity,
    FiAlertTriangle,
    FiBookOpen,
    FiBox,
    FiCheckCircle,
    FiCode,
    FiEdit3,
    FiEye,
    FiFileText,
    FiFilter,
    FiGitBranch,
    FiGitMerge,
    FiHome,
    FiLayers,
    FiLink,
    FiLock,
    FiMap,
    FiPackage,
    FiRefreshCw,
    FiSettings,
    FiShield,
    FiTarget,
    FiTool,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";

export const basePath = "/notes/architecture-and-clean-code-core-notes";

export const navigationGroups = [
    {
        title: "Start",
        items: [
            {
                label: "Overview",
                path: basePath,
                icon: FiHome,
                end: true,
            },
            {
                label: "Architecture",
                path: basePath + "/architecture",
                icon: FiMap,
            },
            {
                label: "Clean Code",
                path: basePath + "/clean-code",
                icon: FiCode,
            },
        ],
    },
    {
        title: "Principles",
        items: [
            {
                label: "Design Principles",
                path: basePath + "/design-principles",
                icon: FiLayers,
            },
            {
                label: "SOLID",
                path: basePath + "/solid",
                icon: FiBox,
            },
            {
                label: "DRY",
                path: basePath + "/dry",
                icon: FiGitBranch,
            },
            {
                label: "KISS",
                path: basePath + "/kiss",
                icon: FiCheckCircle,
            },
            {
                label: "YAGNI",
                path: basePath + "/yagni",
                icon: FiTarget,
            },
            {
                label: "Separation of Concerns",
                path: basePath + "/separation-of-concerns",
                icon: FiLayers,
            },
            {
                label: "Coupling & Cohesion",
                path: basePath + "/coupling-and-cohesion",
                icon: FiLink,
            },
            {
                label: "Abstraction",
                path: basePath + "/abstraction",
                icon: FiEye,
            },
            {
                label: "Encapsulation",
                path: basePath + "/encapsulation",
                icon: FiLock,
            },
            {
                label: "Composition over Inheritance",
                path: basePath + "/composition-over-inheritance",
                icon: FiGitMerge,
            },
        ],
    },
    {
        title: "Code Quality",
        items: [
            {
                label: "Project Structure",
                path: basePath + "/project-structure",
                icon: FiBookOpen,
            },
            {
                label: "Naming",
                path: basePath + "/naming",
                icon: FiEdit3,
            },
            {
                label: "Functions",
                path: basePath + "/functions",
                icon: FiZap,
            },
            {
                label: "Code Readability",
                path: basePath + "/code-readability",
                icon: FiCode,
            },
            {
                label: "Error Handling",
                path: basePath + "/error-handling",
                icon: FiTool,
            },
            {
                label: "Validation",
                path: basePath + "/validation",
                icon: FiFilter,
            },
            {
                label: "Logging",
                path: basePath + "/logging",
                icon: FiActivity,
            },
            {
                label: "Configuration",
                path: basePath + "/configuration",
                icon: FiSettings,
            },
            {
                label: "Documentation",
                path: basePath + "/documentation",
                icon: FiFileText,
            },
            {
                label: "Refactoring",
                path: basePath + "/refactoring",
                icon: FiRefreshCw,
            },
            {
                label: "Code Smells",
                path: basePath + "/code-smells",
                icon: FiAlertTriangle,
            },
            {
                label: "Testing & Testability",
                path: basePath + "/testing",
                icon: FiShield,
            },
        ],
    },
    {
        title: "Architecture & Maintenance",
        items: [
            {
                label: "Dependency Management",
                path: basePath + "/dependency-management",
                icon: FiPackage,
            },
            {
                label: "Scalability",
                path: basePath + "/scalability",
                icon: FiTrendingUp,
            },
            {
                label: "Maintainability Checklist",
                path: basePath + "/maintainability-checklist",
                icon: FiCheckCircle,
            },
        ],
    },
];

export const flatNavigationItems = navigationGroups.flatMap(
    (group) => group.items,
);
