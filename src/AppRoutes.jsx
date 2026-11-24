import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Spinner from "./components/spinner";

const HomePage = lazy(() => import("./pages/home"));
const NotesPage = lazy(() => import("./pages/notes"));
const AlgorithmsCoreNotes = lazy(() => import("./pages/notes/algorithmsCoreNotes"));
const AndroidNotes = lazy(() => import("./pages/notes/androidNotes"));
const AlgorithmsOverview = lazy(() => import("./pages/notes/algorithmsCoreNotes/overview"));
const AlgorithmsFoundation = lazy(() => import("./pages/notes/algorithmsCoreNotes/foundationLayer"));
const AlgorithmsSearching = lazy(() => import("./pages/notes/algorithmsCoreNotes/searching"));
const AlgorithmsSorting = lazy(() => import("./pages/notes/algorithmsCoreNotes/sorting"));
const AlgorithmsRecursion = lazy(() => import("./pages/notes/algorithmsCoreNotes/recursionPatterns"));
const AlgorithmsSlidingWindow = lazy(() => import("./pages/notes/algorithmsCoreNotes/slidingWindow"));
const AlgorithmsStackQueue = lazy(() => import("./pages/notes/algorithmsCoreNotes/stackQueueBasedProblems"));
const AlgorithmsGreedy = lazy(() => import("./pages/notes/algorithmsCoreNotes/greedy"));
const AlgorithmsDynamicProgramming = lazy(() => import("./pages/notes/algorithmsCoreNotes/dynamicProgramming"));
const AlgorithmsGraph = lazy(() => import("./pages/notes/algorithmsCoreNotes/graphAlgorithms"));
const AboutPage = lazy(() => import("./pages/about"));
const ContactPage = lazy(() => import("./pages/contact"));
const NotFoundPage = lazy(() => import("./pages/not-found"));

function AppRoutes() {
    const location = useLocation();

    return (
        <Suspense fallback={<Spinner />} key={location.pathname}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/notes/algorithms-core-notes" element={<AlgorithmsCoreNotes />}>
                    <Route index element={<AlgorithmsOverview />} />
                    <Route path="foundation" element={<AlgorithmsFoundation />} />
                    <Route path="searching" element={<AlgorithmsSearching />} />
                    <Route path="sorting" element={<AlgorithmsSorting />} />
                    <Route path="recursion-patterns" element={<AlgorithmsRecursion />} />
                    <Route path="sliding-window" element={<AlgorithmsSlidingWindow />} />
                    <Route path="stack-queue" element={<AlgorithmsStackQueue />} />
                    <Route path="greedy" element={<AlgorithmsGreedy />} />
                    <Route path="dynamic-programming" element={<AlgorithmsDynamicProgramming />} />
                    <Route path="graph-algorithms" element={<AlgorithmsGraph />} />
                </Route>
                <Route path="/notes/android-notes" element={<AndroidNotes />} />
                <Route path="/notes/android-notes/:chapterSlug" element={<AndroidNotes />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
