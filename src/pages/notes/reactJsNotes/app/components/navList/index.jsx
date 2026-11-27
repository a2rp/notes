import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Styled } from "./styled";
import { MdClear } from "react-icons/md";

const STORAGE_KEY = "navSearch";

const NavListCore = () => {
    const navRef = useRef(null);
    const wrapperRef = useRef(null);
    const searchInputRef = useRef(null);
    const { pathname } = useLocation();

    // Restore persisted search
    const [search, setSearch] = useState(() => {
        try {
            return sessionStorage.getItem(STORAGE_KEY) ?? "";
        } catch {
            return "";
        }
    });

    // Keep the active NavLink centered/visible in the sidebar
    useEffect(() => {
        const el = navRef.current?.querySelector("a.active");
        if (!el) return;
        const id = requestAnimationFrame(() => {
            try {
                el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
            } catch {
                el.scrollIntoView();
            }
        });
        return () => cancelAnimationFrame(id);
    }, [pathname]);

    // Keyboard shortcuts: Cmd/Ctrl+K focus, Esc clear, Enter open first result
    useEffect(() => {
        function onKey(e) {
            const isMetaK = (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K");
            if (isMetaK) {
                e.preventDefault();
                searchInputRef.current?.focus();
                searchInputRef.current?.select();
                return;
            }
            if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
                setSearch("");
                return;
            }
            if (e.key === "Enter" && document.activeElement === searchInputRef.current) {
                const first = wrapperRef.current?.querySelector('a:not([data-hidden="true"])');
                if (first) {
                    first.click(); // navigate
                }
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Apply filter to links + section headers whenever search changes
    useEffect(() => {
        // persist search
        try {
            sessionStorage.setItem(STORAGE_KEY, search);
        } catch { /* Session storage may be unavailable. */ }

        const root = wrapperRef.current;
        if (!root) return;

        const q = search.trim().toLowerCase();
        const tokens = q.length ? q.split(/\s+/).filter(Boolean) : [];

        const links = Array.from(root.querySelectorAll("a[href]"));


        // Filter links
        links.forEach((a) => {
            const label = (a.textContent || "").toLowerCase();
            const title = (a.getAttribute("title") || "").toLowerCase();
            const hay = `${label} ${title}`;

            const isMatch =
                tokens.length === 0 ||
                tokens.every((t) => hay.includes(t));

            a.setAttribute("data-hidden", isMatch ? "false" : "true");

        });

        // Hide/show section headings that have zero visible links until next h3
        const headers = Array.from(root.querySelectorAll("h3.title"));
        headers.forEach((h) => {
            let hasVisible = false;
            let node = h.nextElementSibling;
            while (node && node.tagName !== "H3") {
                if (node.tagName === "A" && node.getAttribute("data-hidden") === "false") {
                    hasVisible = true;
                    break;
                }
                node = node.nextElementSibling;
            }
            h.setAttribute("data-hidden", hasVisible ? "false" : "true");
        });


    }, [search]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const clearSearch = () => setSearch("");

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    return (
        <Styled.Nav ref={navRef} aria-label="JavaScript Core navigation">
            <div className="searchWraper">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search topics (Ctrl + K)"
                    value={search}
                    onChange={handleSearchChange}
                    aria-label="Search topics"
                    aria-controls="navlinksWrapper"
                />
                {search.trim().length > 0 && (
                    <div className="clearIconWrapper" onClick={clearSearch} role="button" aria-label="Clear search" title="Clear">
                        <MdClear size={20} />
                    </div>
                )}
            </div>

            <div className="navlinksWrapper" id="navlinksWrapper" ref={wrapperRef}>
                <NavLink to="/notes/reactjs-notes/home" title="Home" className={"home"}>Home</NavLink>

                <h3 className="title">Intro</h3>
                <NavLink to="/notes/reactjs-notes/intro/what-is-react" title="What Is React ???">What Is React ???</NavLink>
                <NavLink to="/notes/reactjs-notes/intro/spa-vs-mpa" title="SPA vs MPA">SPA vs MPA</NavLink>
                <NavLink to="/notes/reactjs-notes/intro/project-setup" title="Project Setup">Project Setup</NavLink>
                <NavLink to="/notes/reactjs-notes/intro/vite-basics" title="Vite Basics">Vite Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/intro/env-files" title=".env Files">.env Files</NavLink>
                <NavLink to="/notes/reactjs-notes/intro/pkg-scripts" title="PKG Scripts">PKG Scripts</NavLink>
                <NavLink to="/notes/reactjs-notes/intro/debugging" title="Debugging">Debugging</NavLink>

                {/* JSX & Rendering */}
                <h3 className="title">JSX &amp; Rendering</h3>
                <NavLink to="/notes/reactjs-notes/jsx/jsx-basics" title="JSX Basics">JSX Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/jsx/attrs-spread" title="Attributes & Spread">Attributes &amp; Spread</NavLink>
                <NavLink to="/notes/reactjs-notes/jsx/fragments" title="Fragments">Fragments</NavLink>
                <NavLink to="/notes/reactjs-notes/jsx/conditional" title="Conditional Rendering">Conditional Rendering</NavLink>
                <NavLink to="/notes/reactjs-notes/jsx/lists-keys" title="Lists & Keys">Lists &amp; Keys</NavLink>
                <NavLink to="/notes/reactjs-notes/jsx/reconciliation" title="Reconciliation">Reconciliation</NavLink>
                <NavLink to="/notes/reactjs-notes/jsx/render-cycle" title="Render Cycle">Render Cycle</NavLink>

                {/* Components */}
                <h3 className="title">Components</h3>
                <NavLink to="/notes/reactjs-notes/components/fn-components" title="Function Components">Function Components</NavLink>
                <NavLink to="/notes/reactjs-notes/components/props" title="Props">Props</NavLink>
                <NavLink to="/notes/reactjs-notes/components/children" title="Children">Children</NavLink>
                <NavLink to="/notes/reactjs-notes/components/composition" title="Composition">Composition</NavLink>
                <NavLink to="/notes/reactjs-notes/components/controlled-vs-uncontrolled" title="Controlled vs Uncontrolled">Controlled vs Uncontrolled</NavLink>
                <NavLink to="/notes/reactjs-notes/components/presentational-vs-container" title="Presentational vs Container">Presentational vs Container</NavLink>

                {/* State & Data Flow */}
                <h3 className="title">State &amp; Data Flow</h3>
                <NavLink to="/notes/reactjs-notes/state/useState-basics" title="useState Basics">useState Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/state/batching" title="Batching">Batching</NavLink>
                <NavLink to="/notes/reactjs-notes/state/lift-state" title="Lift State">Lift State</NavLink>
                <NavLink to="/notes/reactjs-notes/state/derived-state" title="Derived State">Derived State</NavLink>
                <NavLink to="/notes/reactjs-notes/state/state-colocation" title="State Colocation">State Colocation</NavLink>
                <NavLink to="/notes/reactjs-notes/state/immutable-updates" title="Immutable Updates">Immutable Updates</NavLink>

                {/* Core Hooks */}
                <h3 className="title">Core Hooks</h3>
                <NavLink to="/notes/reactjs-notes/hooks-core/useState" title="useState">useState</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-core/useEffect" title="useEffect">useEffect</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-core/useRef" title="useRef">useRef</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-core/useMemo" title="useMemo">useMemo</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-core/useCallback" title="useCallback">useCallback</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-core/useContext" title="useContext">useContext</NavLink>

                {/* Advanced Hooks */}
                <h3 className="title">Advanced Hooks</h3>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useReducer" title="useReducer">useReducer</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useLayoutEffect" title="useLayoutEffect">useLayoutEffect</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/forwardRef" title="forwardRef">forwardRef</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useImperativeHandle" title="useImperativeHandle">useImperativeHandle</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useId" title="useId">useId</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useSyncExternalStore" title="useSyncExternalStore">useSyncExternalStore</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useTransition" title="useTransition">useTransition</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/useDeferredValue" title="useDeferredValue">useDeferredValue</NavLink>
                <NavLink to="/notes/reactjs-notes/hooks-adv/custom-hooks" title="Custom Hooks">Custom Hooks</NavLink>

                {/* DOM & Events */}
                <h3 className="title">DOM &amp; Events</h3>
                <NavLink to="/notes/reactjs-notes/dom-events/synthetic-events" title="Synthetic Events">Synthetic Events</NavLink>
                <NavLink to="/notes/reactjs-notes/dom-events/event-bubbling" title="Event Bubbling & Capturing">Event Bubbling</NavLink>
                <NavLink to="/notes/reactjs-notes/dom-events/focus-management" title="Focus Management">Focus Management</NavLink>
                <NavLink to="/notes/reactjs-notes/dom-events/scroll-management" title="Scroll Management">Scroll Management</NavLink>
                <NavLink to="/notes/reactjs-notes/dom-events/portals" title="Portals">Portals</NavLink>
                <NavLink to="/notes/reactjs-notes/dom-events/measure-layout" title="Measure &amp; Layout">Measure &amp; Layout</NavLink>

                {/* Forms & Validation */}
                <h3 className="title">Forms &amp; Validation</h3>
                <NavLink to="/notes/reactjs-notes/forms/controlled" title="Controlled Inputs">Controlled Inputs</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/uncontrolled" title="Uncontrolled Inputs">Uncontrolled Inputs</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/debounced-inputs" title="Debounced Inputs">Debounced Inputs</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/html5-validation" title="HTML5 Validation">HTML5 Validation</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/custom-validation" title="Custom Validation">Custom Validation</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/react-hook-form" title="React Hook Form">React Hook Form</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/formik" title="Formik">Formik</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/schema-yup-zod" title="Schema Validation (Yup/Zod)">Schema (Yup/Zod)</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/file-upload" title="File Upload">File Upload</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/drag-drop" title="Drag &amp; Drop">Drag &amp; Drop</NavLink>
                <NavLink to="/notes/reactjs-notes/forms/forms-a11y" title="Forms Accessibility (a11y)">Forms Accessibility</NavLink>

                {/* Styling */}
                <h3 className="title">Styling</h3>
                <NavLink to="/notes/reactjs-notes/styling/global-css" title="Global CSS">Global CSS</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/css-modules" title="CSS Modules">CSS Modules</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/styled-components" title="styled-components">styled-components</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/themes" title="Themes">Themes</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/tokens" title="Design Tokens">Design Tokens</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/css-variables" title="CSS Variables">CSS Variables</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/responsive" title="Responsive Design">Responsive Design</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/container-queries" title="Container Queries">Container Queries</NavLink>
                <NavLink to="/notes/reactjs-notes/styling/icons" title="Icons">Icons</NavLink>

                {/* Routing */}
                <h3 className="title">Routing</h3>
                <NavLink to="/notes/reactjs-notes/routing/router-basics" title="Router Basics">Router Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/nested-routes" title="Nested Routes">Nested Routes</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/layout-routes" title="Layout Routes">Layout Routes</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/route-params" title="Route Params">Route Params</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/search-params" title="Search Params">Search Params</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/lazy-routes" title="Lazy Routes">Lazy Routes</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/protected-routes" title="Protected Routes">Protected Routes</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/scroll-restore" title="Scroll Restore">Scroll Restore</NavLink>
                <NavLink to="/notes/reactjs-notes/routing/not-found-redirect" title="Not Found & Redirect">Not Found &amp; Redirect</NavLink>

                {/* Suspense & Code Split */}
                <h3 className="title">Suspense &amp; Code Split</h3>
                <NavLink to="/notes/reactjs-notes/suspense-split/react-lazy" title="React.lazy">React.lazy</NavLink>
                <NavLink to="/notes/reactjs-notes/suspense-split/suspense-boundary" title="Suspense Boundary">&lt;Suspense&gt; Boundary</NavLink>
                <NavLink to="/notes/reactjs-notes/suspense-split/route-splitting" title="Route Splitting">Route Splitting</NavLink>
                <NavLink to="/notes/reactjs-notes/suspense-split/preloading" title="Preloading">Preloading</NavLink>

                {/* Data Fetching & Caching */}
                <h3 className="title">Data Fetching &amp; Caching</h3>
                <NavLink to="/notes/reactjs-notes/data/fetch-basics" title="Fetch Basics">Fetch Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/data/abort-controller" title="AbortController">AbortController</NavLink>
                <NavLink to="/notes/reactjs-notes/data/loading-error-states" title="Loading & Error States">Loading &amp; Error States</NavLink>
                <NavLink to="/notes/reactjs-notes/data/swr-basics" title="SWR Basics">SWR Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/data/tanstack-query" title="TanStack Query">TanStack Query</NavLink>
                <NavLink to="/notes/reactjs-notes/data/cache-keys" title="Cache Keys">Cache Keys</NavLink>
                <NavLink to="/notes/reactjs-notes/data/invalidation" title="Invalidation">Invalidation</NavLink>
                <NavLink to="/notes/reactjs-notes/data/infinite-scroll" title="Infinite Scroll">Infinite Scroll</NavLink>
                <NavLink to="/notes/reactjs-notes/data/optimistic-updates" title="Optimistic Updates">Optimistic Updates</NavLink>
                <NavLink to="/notes/reactjs-notes/data/websockets-sse" title="WebSockets & SSE">WebSockets &amp; SSE</NavLink>

                {/* State Management */}
                <h3 className="title">State Management</h3>
                <NavLink to="/notes/reactjs-notes/state-mgmt/context-vs-store" title="Context vs Store">Context vs Store</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/redux-toolkit" title="Redux Toolkit">Redux Toolkit</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/rtk-query" title="RTK Query">RTK Query</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/zustand" title="Zustand">Zustand</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/jotai" title="Jotai">Jotai</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/recoil" title="Recoil">Recoil</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/xstate" title="XState">XState</NavLink>
                <NavLink to="/notes/reactjs-notes/state-mgmt/persistence" title="Persistence">Persistence</NavLink>

                {/* Performance */}
                <h3 className="title">Performance</h3>
                <NavLink to="/notes/reactjs-notes/perf/rerender-triggers" title="Re-render Triggers">Re-render Triggers</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/keys-strategy" title="Keys Strategy">Keys Strategy</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/memoization" title="Memoization">Memoization</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/defer-work" title="Defer Work">Defer Work</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/web-workers" title="Web Workers">Web Workers</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/virtualization" title="List Virtualization">Virtualization</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/image-optim" title="Image Optimization">Image Optimization</NavLink>
                <NavLink to="/notes/reactjs-notes/perf/profiler" title="React Profiler">Profiler</NavLink>

                {/* Errors */}
                <h3 className="title">Errors</h3>
                <NavLink to="/notes/reactjs-notes/errors/error-boundaries" title="Error Boundaries">Error Boundaries</NavLink>
                <NavLink to="/notes/reactjs-notes/errors/data-errors" title="Data Errors">Data Errors</NavLink>
                <NavLink to="/notes/reactjs-notes/errors/fallback-ui" title="Fallback UI">Fallback UI</NavLink>
                <NavLink to="/notes/reactjs-notes/errors/retries" title="Retries & Backoff">Retries</NavLink>
                <NavLink to="/notes/reactjs-notes/errors/logging-monitoring" title="Logging & Monitoring">Logging & Monitoring</NavLink>

                {/* Internationalization (i18n) */}
                <h3 className="title">Internationalization (i18n)</h3>
                <NavLink to="/notes/reactjs-notes/i18n/i18n-basics" title="i18n Basics">i18n Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/i18n/react-i18next" title="react-i18next">react-i18next</NavLink>
                <NavLink to="/notes/reactjs-notes/i18n/formatjs" title="FormatJS">FormatJS</NavLink>
                <NavLink to="/notes/reactjs-notes/i18n/plurals-dates-numbers" title="Plurals, Dates & Numbers">Plurals, Dates &amp; Numbers</NavLink>
                <NavLink to="/notes/reactjs-notes/i18n/rtl-support" title="RTL Support">RTL Support</NavLink>

                {/* Animations */}
                <h3 className="title">Animations</h3>
                <NavLink to="/notes/reactjs-notes/animations/css-transitions" title="CSS Transitions">CSS Transitions</NavLink>
                <NavLink to="/notes/reactjs-notes/animations/css-animations" title="CSS Keyframe Animations">CSS Animations</NavLink>
                <NavLink to="/notes/reactjs-notes/animations/framer-motion" title="Framer Motion">Framer Motion</NavLink>
                <NavLink to="/notes/reactjs-notes/animations/scroll-effects" title="Scroll-based Effects">Scroll Effects</NavLink>
                <NavLink to="/notes/reactjs-notes/animations/anim-perf" title="Animation Performance">Animation Performance</NavLink>

                {/* TypeScript */}
                <h3 className="title">TypeScript</h3>
                <NavLink to="/notes/reactjs-notes/typescript/tsx-basics" title="TSX Basics">TSX Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/typing-props" title="Typing Props">Typing Props</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/typing-children" title="Typing Children">Typing Children</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/typing-refs" title="Typing Refs">Typing Refs</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/typing-hooks" title="Typing Hooks">Typing Hooks</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/typing-context" title="Typing Context">Typing Context</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/typing-reducers" title="Typing Reducers">Typing Reducers</NavLink>
                <NavLink to="/notes/reactjs-notes/typescript/generics" title="Generics">Generics</NavLink>

                {/* Testing */}
                <h3 className="title">Testing</h3>
                <NavLink to="/notes/reactjs-notes/testing/rtl-basics" title="RTL Basics">RTL Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/jest-basics" title="Jest Basics">Jest Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/async-tests" title="Async Tests">Async Tests</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/hooks-tests" title="Hooks Tests">Hooks Tests</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/router-tests" title="Router Tests">Router Tests</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/msw" title="MSW (Mock Service Worker)">MSW</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/e2e-cypress" title="E2E  -  Cypress">E2E  -  Cypress</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/e2e-playwright" title="E2E  -  Playwright">E2E  -  Playwright</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/a11y-tests" title="Accessibility (a11y) Tests">a11y Tests</NavLink>
                <NavLink to="/notes/reactjs-notes/testing/snapshots" title="Snapshots">Snapshots</NavLink>

                {/* SSR & RSC */}
                <h3 className="title">SSR &amp; RSC</h3>
                <NavLink to="/notes/reactjs-notes/ssr-rsc/ssr-vs-ssg-vs-isr" title="SSR vs SSG vs ISR">SSR vs SSG vs ISR</NavLink>
                <NavLink to="/notes/reactjs-notes/ssr-rsc/hydration" title="Hydration">Hydration</NavLink>
                <NavLink to="/notes/reactjs-notes/ssr-rsc/streaming" title="Streaming">Streaming</NavLink>
                <NavLink to="/notes/reactjs-notes/ssr-rsc/rsc-basics" title="React Server Components (RSC) Basics">RSC Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/ssr-rsc/seo-meta" title="SEO & Meta">SEO &amp; Meta</NavLink>

                {/* Build & DX */}
                <h3 className="title">Build &amp; DX</h3>
                <NavLink to="/notes/reactjs-notes/build-dx/vite-config" title="Vite Config">Vite Config</NavLink>
                <NavLink to="/notes/reactjs-notes/build-dx/aliases" title="Aliases">Aliases</NavLink>
                <NavLink to="/notes/reactjs-notes/build-dx/eslint-prettier" title="ESLint & Prettier">ESLint &amp; Prettier</NavLink>
                <NavLink to="/notes/reactjs-notes/build-dx/storybook" title="Storybook">Storybook</NavLink>
                <NavLink to="/notes/reactjs-notes/build-dx/bundle-analyze" title="Bundle Analyze">Bundle Analyze</NavLink>
                <NavLink to="/notes/reactjs-notes/build-dx/monorepo" title="Monorepo">Monorepo</NavLink>

                {/* Security */}
                <h3 className="title">Security</h3>
                <NavLink to="/notes/reactjs-notes/security/xss" title="XSS (Cross-Site Scripting)">XSS</NavLink>
                <NavLink to="/notes/reactjs-notes/security/sanitize-html" title="Sanitize HTML">Sanitize HTML</NavLink>
                <NavLink to="/notes/reactjs-notes/security/tokens-storage" title="Tokens Storage">Tokens Storage</NavLink>
                <NavLink to="/notes/reactjs-notes/security/cors-cookies" title="CORS & Cookies">CORS & Cookies</NavLink>
                <NavLink to="/notes/reactjs-notes/security/auth-basics" title="Auth Basics">Auth Basics</NavLink>
                <NavLink to="/notes/reactjs-notes/security/supply-chain" title="Supply Chain Security">Supply Chain</NavLink>

                {/* Networking */}
                <h3 className="title">Networking</h3>
                <NavLink to="/notes/reactjs-notes/networking/rest-patterns" title="REST Patterns">REST Patterns</NavLink>
                <NavLink to="/notes/reactjs-notes/networking/graphql-clients" title="GraphQL Clients">GraphQL Clients</NavLink>
                <NavLink to="/notes/reactjs-notes/networking/websockets" title="WebSockets">WebSockets</NavLink>
                <NavLink to="/notes/reactjs-notes/networking/file-uploads" title="File Uploads">File Uploads</NavLink>
                <NavLink to="/notes/reactjs-notes/networking/offline-sync" title="Offline Sync">Offline Sync</NavLink>

                {/* PWA */}
                <h3 className="title">PWA</h3>
                <NavLink to="/notes/reactjs-notes/pwa/service-worker" title="Service Worker">Service Worker</NavLink>
                <NavLink to="/notes/reactjs-notes/pwa/caching-strategies" title="Caching Strategies">Caching Strategies</NavLink>
                <NavLink to="/notes/reactjs-notes/pwa/app-manifest" title="App Manifest">App Manifest</NavLink>
                <NavLink to="/notes/reactjs-notes/pwa/offline-fallback" title="Offline Fallback">Offline Fallback</NavLink>
                <NavLink to="/notes/reactjs-notes/pwa/push-notifs" title="Push Notifications">Push Notifications</NavLink>

                {/* Architecture & Patterns */}
                <h3 className="title">Architecture &amp; Patterns</h3>
                <NavLink to="/notes/reactjs-notes/architecture/compound-components" title="Compound Components">Compound Components</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/render-props" title="Render Props">Render Props</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/provider-pattern" title="Provider Pattern">Provider Pattern</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/state-reducer" title="State Reducer">State Reducer</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/headless-components" title="Headless Components">Headless Components</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/slots" title="Slots">Slots</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/feature-folders" title="Feature Folders">Feature Folders</NavLink>
                <NavLink to="/notes/reactjs-notes/architecture/api-design" title="API Design">API Design</NavLink>

                {/* Reusable Components */}
                <h3 className="title">Reusable Components</h3>
                <NavLink to="/notes/reactjs-notes/components-lib/modal" title="Modal">Modal</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/drawer" title="Drawer">Drawer</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/tooltip" title="Tooltip">Tooltip</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/popover" title="Popover">Popover</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/menu" title="Menu">Menu</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/dropdown" title="Dropdown">Dropdown</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/combobox" title="Combobox">Combobox</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/tabs" title="Tabs">Tabs</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/accordion" title="Accordion">Accordion</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/table" title="Table">Table</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/list" title="List">List</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/toast" title="Toast">Toast</NavLink>
                <NavLink to="/notes/reactjs-notes/components-lib/pagination" title="Pagination">Pagination</NavLink>

                {/* External Integrations */}
                <h3 className="title">External Integrations</h3>
                <NavLink to="/notes/reactjs-notes/integrations/charts" title="Charts">Charts</NavLink>
                <NavLink to="/notes/reactjs-notes/integrations/maps" title="Maps">Maps</NavLink>
                <NavLink to="/notes/reactjs-notes/integrations/payments" title="Payments">Payments</NavLink>
                <NavLink to="/notes/reactjs-notes/integrations/auth-providers" title="Auth Providers">Auth Providers</NavLink>
                <NavLink to="/notes/reactjs-notes/integrations/media-audio-video" title="Media Â· Audio/Video">Media Â· Audio/Video</NavLink>
                <NavLink to="/notes/reactjs-notes/integrations/canvas-webgl" title="Canvas & WebGL">Canvas &amp; WebGL</NavLink>
                <NavLink to="/notes/reactjs-notes/integrations/workers" title="Workers (Web/Service)">Workers</NavLink>

                {/* Tooling Around React */}
                <h3 className="title">Tooling Around React</h3>
                <NavLink to="/notes/reactjs-notes/tooling/devtools" title="DevTools">DevTools</NavLink>
                <NavLink to="/notes/reactjs-notes/tooling/vscode-setup" title="VS Code Setup">VS Code Setup</NavLink>
                <NavLink to="/notes/reactjs-notes/tooling/snippets" title="Snippets">Snippets</NavLink>
                <NavLink to="/notes/reactjs-notes/tooling/lint-rules" title="Lint Rules">Lint Rules</NavLink>
                <NavLink to="/notes/reactjs-notes/tooling/code-metrics" title="Code Metrics">Code Metrics</NavLink>

                {/* Deployment */}
                <h3 className="title">Deployment</h3>
                <NavLink to="/notes/reactjs-notes/deploy/gh-pages" title="GitHub Pages">GitHub Pages</NavLink>
                <NavLink to="/notes/reactjs-notes/deploy/vercel" title="Vercel">Vercel</NavLink>
                <NavLink to="/notes/reactjs-notes/deploy/netlify" title="Netlify">Netlify</NavLink>
                <NavLink to="/notes/reactjs-notes/deploy/cf-pages" title="Cloudflare Pages">Cloudflare Pages</NavLink>
                <NavLink to="/notes/reactjs-notes/deploy/env-per-env" title="Env per Environment">Env per Environment</NavLink>
                <NavLink to="/notes/reactjs-notes/deploy/cache-control" title="Cache-Control">Cache-Control</NavLink>
                <NavLink to="/notes/reactjs-notes/deploy/prod-monitoring" title="Production Monitoring">Production Monitoring</NavLink>

                {/* Modern React */}
                <h3 className="title">Modern React</h3>
                <NavLink to="/notes/reactjs-notes/modern/concurrent-model" title="Concurrent Model">Concurrent Model</NavLink>
                <NavLink to="/notes/reactjs-notes/modern/transitions" title="Transitions">Transitions</NavLink>
                <NavLink to="/notes/reactjs-notes/modern/suspense-for-data" title="Suspense for Data">Suspense for Data</NavLink>
                <NavLink to="/notes/reactjs-notes/modern/migrating-legacy" title="Migrating Legacy Apps">Migrating Legacy</NavLink>
                <NavLink to="/notes/reactjs-notes/modern/deprecations" title="Deprecations">Deprecations</NavLink>

                {/* Anti-Patterns */}
                <h3 className="title">Anti-Patterns</h3>
                <NavLink to="/notes/reactjs-notes/anti/over-context" title="Over-Context">Over-Context</NavLink>
                <NavLink to="/notes/reactjs-notes/anti/over-memo" title="Over-Memo">Over-Memo</NavLink>
                <NavLink to="/notes/reactjs-notes/anti/refs-as-state" title="Refs as State">Refs as State</NavLink>
                <NavLink to="/notes/reactjs-notes/anti/derived-state-pitfalls" title="Derived State Pitfalls">Derived State Pitfalls</NavLink>
                <NavLink to="/notes/reactjs-notes/anti/effect-for-fetching" title="Effect for Fetching">Effect for Fetching</NavLink>
                <NavLink to="/notes/reactjs-notes/anti/mega-components" title="Mega Components">Mega Components</NavLink>

                {/* Docs & Collaboration */}
                <h3 className="title">Docs &amp; Collaboration</h3>
                <NavLink to="/notes/reactjs-notes/docs/good-readme" title="Good README">Good README</NavLink>
                <NavLink to="/notes/reactjs-notes/docs/adrs" title="Architectural Decision Records (ADRs)">ADRs</NavLink>
                <NavLink to="/notes/reactjs-notes/docs/storybook-mdx" title="Storybook + MDX">Storybook + MDX</NavLink>
                <NavLink to="/notes/reactjs-notes/docs/pr-reviews" title="PR Reviews">PR Reviews</NavLink>
                <NavLink to="/notes/reactjs-notes/docs/conventions" title="Conventions">Conventions</NavLink>

            </div>

            {/* Minimal CSS hook: hide elements with data-hidden="true" if your Styled.Nav doesn't already */}
            <style>{`
        [data-hidden="true"] { display: none !important; }
      `}</style>
        </Styled.Nav>
    );
};

export default NavListCore;
