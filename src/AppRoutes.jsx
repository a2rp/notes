import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Spinner from "./components/spinner";

const HomePage = lazy(() => import("./pages/home"));
const NotesPage = lazy(() => import("./pages/notes"));
const AlgorithmsCoreNotes = lazy(() => import("./pages/notes/algorithmsCoreNotes"));
const AndroidNotes = lazy(() => import("./pages/notes/androidNotes"));
const AngularNotes = lazy(() => import("./pages/notes/angularNotes"));
const JavaScriptNotes = lazy(() => import("./pages/notes/javaScriptNotes"));
const ApacheDerbyNotes = lazy(() => import("./pages/notes/apacheDerbyNotes"));
const AspNetNotes = lazy(() => import("./pages/notes/aspNetNotes"));
const BackendEngineeringCoreNotes = lazy(() => import("./pages/notes/backendEngineeringCoreNotes"));
const ArchitectureAndCleanCodeCoreNotes = lazy(() => import("./pages/notes/architectureAndCleanCodeCoreNotes"));
const CCoreNotes = lazy(() => import("./pages/notes/cCoreNotes"));
const CCppNotes = lazy(() => import("./pages/notes/cCppNotes"));
const CodeIgniterNotes = lazy(() => import("./pages/notes/codeIgniterNotes"));
const ComputerNetworksCoreNotes = lazy(() => import("./pages/notes/computerNetworksCoreNotes"));
const ComputerScienceCoreNotes = lazy(() => import("./pages/notes/computerScienceCoreNotes"));
const ComputerScienceFoundations = lazy(() => import("./pages/notes/computerScienceFoundations"));
const CssPracticalNotes = lazy(() => import("./pages/notes/cssPracticalNotes"));
const DataTablesNotes = lazy(() => import("./pages/notes/dataTablesNotes"));
const DevOpsAndCloudCoreNotes = lazy(() => import("./pages/notes/devopsAndCloudCoreNotes"));
const DockerNotes = lazy(() => import("./pages/notes/dockerNotes"));
const ChakraUiNotes = lazy(() => import("./pages/notes/chakraUiNotes"));
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
                <Route path="/notes/angular-notes" element={<AngularNotes />} />
                <Route path="/notes/angular-notes/:chapterSlug" element={<AngularNotes />} />
                <Route path="/notes/javascript-notes" element={<JavaScriptNotes />} />
                <Route path="/notes/javascript-notes/:chapterSlug" element={<JavaScriptNotes />} />
                <Route path="/notes/apache-derby-notes" element={<ApacheDerbyNotes />} />
                <Route path="/notes/apache-derby-notes/:chapterSlug" element={<ApacheDerbyNotes />} />
                <Route path="/notes/asp-net-notes" element={<AspNetNotes />} />
                <Route path="/notes/asp-net-notes/:chapterSlug" element={<AspNetNotes />} />
                <Route path="/notes/backend-engineering-core-notes" element={<BackendEngineeringCoreNotes />} />
                <Route path="/notes/backend-engineering-core-notes/*" element={<BackendEngineeringCoreNotes />} />
                <Route path="/notes/c-core-notes" element={<CCoreNotes />} />
                <Route path="/notes/c-cpp-notes" element={<CCppNotes />} />
                <Route path="/notes/c-cpp-notes/:chapterSlug" element={<CCppNotes />} />
                <Route path="/notes/codeigniter-notes" element={<CodeIgniterNotes />} />
                <Route path="/notes/codeigniter-notes/:chapterSlug" element={<CodeIgniterNotes />} />
                <Route path="/notes/computer-networks-core-notes" element={<ComputerNetworksCoreNotes />} />
                <Route path="/notes/computer-networks-core-notes/:chapterSlug" element={<ComputerNetworksCoreNotes />} />
                <Route path="/notes/computer-science-core-notes" element={<ComputerScienceCoreNotes />} />
                <Route path="/notes/computer-science-core-notes/:chapterSlug" element={<ComputerScienceCoreNotes />} />
                <Route path="/notes/computer-science-foundations" element={<ComputerScienceFoundations />} />
                <Route path="/notes/computer-science-foundations/:chapterSlug" element={<ComputerScienceFoundations />} />
                <Route path="/notes/css-practical-notes" element={<CssPracticalNotes />} />
                <Route path="/notes/css-practical-notes/:chapterSlug" element={<CssPracticalNotes />} />
                <Route path="/notes/datatables-notes" element={<DataTablesNotes />} />
                <Route path="/notes/datatables-notes/:chapterSlug" element={<DataTablesNotes />} />
                <Route path="/notes/devops-and-cloud-core-notes/*" element={<DevOpsAndCloudCoreNotes />} />
                <Route path="/notes/devops-and-cloud-core-notes" element={<Navigate to="/notes/devops-and-cloud-core-notes/overview" replace />} />
                <Route path="/notes/docker-notes" element={<DockerNotes />} />
                <Route path="/notes/docker-notes/:chapterSlug" element={<DockerNotes />} />
                <Route path="/notes/chakra-ui-notes" element={<ChakraUiNotes />} />
                <Route path="/notes/chakra-ui-notes/:chapterSlug" element={<ChakraUiNotes />} />
                <Route path="/notes/architecture-and-clean-code-core-notes/*" element={<ArchitectureAndCleanCodeCoreNotes />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
