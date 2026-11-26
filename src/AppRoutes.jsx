import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Spinner from "./components/spinner";

const HomePage = lazy(() => import("./pages/home"));
const NotesPage = lazy(() => import("./pages/notes"));
const AlgorithmsCoreNotes = lazy(() => import("./pages/notes/algorithmsCoreNotes"));
const AndroidNotes = lazy(() => import("./pages/notes/androidNotes"));
const AngularNotes = lazy(() => import("./pages/notes/angularNotes"));
const JavaScriptNotes = lazy(() => import("./pages/notes/javaScriptNotes"));
const JavaCoreNotes = lazy(() => import("./pages/notes/javaCoreNotes"));
const JavaNotes = lazy(() => import("./pages/notes/javaNotes"));
const HtmlNotes = lazy(() => import("./pages/notes/htmlNotes"));
const FramerMotionNotes = lazy(() => import("./pages/notes/framerMotionNotes"));
const GsapNotes = lazy(() => import("./pages/notes/gsapNotes"));
const FrontendEngineeringCoreNotes = lazy(() => import("./pages/notes/frontendEngineeringCoreNotes"));
const ApacheDerbyNotes = lazy(() => import("./pages/notes/apacheDerbyNotes"));
const AspNetNotes = lazy(() => import("./pages/notes/aspNetNotes"));
const AwsNotes = lazy(() => import("./pages/notes/awsNotes"));
const BackendEngineeringCoreNotes = lazy(() => import("./pages/notes/backendEngineeringCoreNotes"));
const ArchitectureAndCleanCodeCoreNotes = lazy(() => import("./pages/notes/architectureAndCleanCodeCoreNotes"));
const CCoreNotes = lazy(() => import("./pages/notes/cCoreNotes"));
const CCppNotes = lazy(() => import("./pages/notes/cCppNotes"));
const DataStructuresCoreNotes = lazy(() => import("./pages/notes/dataStructuresCoreNotes"));
const DbmsCoreNotes = lazy(() => import("./pages/notes/dbmsCoreNotes"));
const DatabasesDeepDiveCoreNotes = lazy(() => import("./pages/notes/databasesDeepDiveCoreNotes"));
const CodeIgniterNotes = lazy(() => import("./pages/notes/codeIgniterNotes"));
const ComputerNetworksCoreNotes = lazy(() => import("./pages/notes/computerNetworksCoreNotes"));
const ComputerScienceCoreNotes = lazy(() => import("./pages/notes/computerScienceCoreNotes"));
const ComputerScienceFoundations = lazy(() => import("./pages/notes/computerScienceFoundations"));
const CssPracticalNotes = lazy(() => import("./pages/notes/cssPracticalNotes"));
const DataTablesNotes = lazy(() => import("./pages/notes/dataTablesNotes"));
const DevOpsAndCloudCoreNotes = lazy(() => import("./pages/notes/devopsAndCloudCoreNotes"));
const DockerNotes = lazy(() => import("./pages/notes/dockerNotes"));
const FastApiNotes = lazy(() => import("./pages/notes/fastApiNotes"));
const FileZillaNotes = lazy(() => import("./pages/notes/fileZillaNotes"));
const FirebaseNotes = lazy(() => import("./pages/notes/firebaseNotes"));
const FirestoreNotes = lazy(() => import("./pages/notes/firestoreNotes"));
const ExpressJsNotes = lazy(() => import("./pages/notes/expressJsNotes"));
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
                <Route path="/notes/java-core-notes" element={<JavaCoreNotes />} />
                <Route path="/notes/java-notes" element={<JavaNotes />} />
                <Route path="/notes/java-notes/:chapterSlug" element={<JavaNotes />} />
                <Route path="/notes/html-notes" element={<HtmlNotes />} />
                <Route path="/notes/html-notes/*" element={<HtmlNotes />} />
                <Route path="/notes/framer-motion-notes" element={<FramerMotionNotes />} />
                <Route path="/notes/framer-motion-notes/:chapterSlug" element={<FramerMotionNotes />} />
                <Route path="/notes/gsap-notes" element={<GsapNotes />} />
                <Route path="/notes/gsap-notes/:chapterSlug" element={<GsapNotes />} />
                <Route path="/notes/frontend-engineering-core-notes" element={<FrontendEngineeringCoreNotes />} />
                <Route path="/notes/frontend-engineering-core-notes/:topicSlug" element={<FrontendEngineeringCoreNotes />} />
                <Route path="/notes/apache-derby-notes" element={<ApacheDerbyNotes />} />
                <Route path="/notes/apache-derby-notes/:chapterSlug" element={<ApacheDerbyNotes />} />
                <Route path="/notes/asp-net-notes" element={<AspNetNotes />} />
                <Route path="/notes/asp-net-notes/:chapterSlug" element={<AspNetNotes />} />
                <Route path="/notes/aws-notes" element={<AwsNotes />} />
                <Route path="/notes/aws-notes/:chapterSlug" element={<AwsNotes />} />
                <Route path="/notes/backend-engineering-core-notes" element={<BackendEngineeringCoreNotes />} />
                <Route path="/notes/backend-engineering-core-notes/*" element={<BackendEngineeringCoreNotes />} />
                <Route path="/notes/c-core-notes" element={<CCoreNotes />} />
                <Route path="/notes/c-cpp-notes" element={<CCppNotes />} />
                <Route path="/notes/c-cpp-notes/:chapterSlug" element={<CCppNotes />} />
                <Route path="/notes/data-structures-core-notes" element={<DataStructuresCoreNotes />} />
                <Route path="/notes/dbms-core-notes/*" element={<DbmsCoreNotes />} />
                <Route path="/notes/databases-deep-dive-core-notes" element={<DatabasesDeepDiveCoreNotes />} />
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
                <Route path="/notes/fastapi-notes" element={<FastApiNotes />} />
                <Route path="/notes/fastapi-notes/:chapterSlug" element={<FastApiNotes />} />
                <Route path="/notes/filezilla-notes" element={<FileZillaNotes />} />
                <Route path="/notes/filezilla-notes/:chapterSlug" element={<FileZillaNotes />} />
                <Route path="/notes/firebase-notes" element={<FirebaseNotes />} />
                <Route path="/notes/firebase-notes/:chapterSlug" element={<FirebaseNotes />} />
                <Route path="/notes/firestore-notes" element={<FirestoreNotes />} />
                <Route path="/notes/firestore-notes/:chapterSlug" element={<FirestoreNotes />} />
                <Route path="/notes/express-js-notes" element={<ExpressJsNotes />} />
                <Route path="/notes/express-js-notes/:chapterSlug" element={<ExpressJsNotes />} />
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
