import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const AboutDbms = lazy(() => import("./components/aboutDbms"));
const DatabaseFundamentals = lazy(() => import("./topics/databaseFundamentals"));
const DataModels = lazy(() => import("./topics/dataModels"));
const ErModel = lazy(() => import("./topics/erModel"));
const RelationalModel = lazy(() => import("./topics/relationalModel"));
const SqlBasics = lazy(() => import("./topics/sqlBasics"));
const SqlQueryingEssentials = lazy(() => import("./topics/sqlQueryingEssentials"));
const JoinsAndSubqueries = lazy(() => import("./topics/joinsAndSubqueries"));
const Constraints = lazy(() => import("./topics/constraints"));
const Normalization = lazy(() => import("./topics/normalization"));
const TransactionsAndConcurrency = lazy(() => import("./topics/transactionsAndConcurrency"));
const Indexing = lazy(() => import("./topics/indexing"));
const StorageAndArchitecture = lazy(() => import("./topics/storageAndArchitecture"));
const QueryProcessingOptimization = lazy(() => import("./topics/queryProcessingOptimization"));
const NoSqlBasics = lazy(() => import("./topics/nosqlBasics"));
const DistributedDatabases = lazy(() => import("./topics/distributedDatabases"));
const SecurityInDbms = lazy(() => import("./topics/securityInDbms"));
const BackupAndRecovery = lazy(() => import("./topics/backupAndRecovery"));

const items = [
    ["overview", "Overview", AboutDbms],
    ["database-fundamentals", "Fundamentals", DatabaseFundamentals],
    ["data-models", "Data models", DataModels],
    ["er-model", "ER model", ErModel],
    ["relational-model", "Relational model", RelationalModel],
    ["sql-basics", "SQL basics", SqlBasics],
    ["sql-querying", "SQL querying", SqlQueryingEssentials],
    ["joins-and-subqueries", "Joins and subqueries", JoinsAndSubqueries],
    ["constraints", "Constraints", Constraints],
    ["normalization", "Normalization", Normalization],
    ["transactions", "Transactions", TransactionsAndConcurrency],
    ["indexing", "Indexing", Indexing],
    ["storage-architecture", "Storage and architecture", StorageAndArchitecture],
    ["query-optimization", "Query optimization", QueryProcessingOptimization],
    ["nosql-basics", "NoSQL basics", NoSqlBasics],
    ["distributed-databases", "Distributed databases", DistributedDatabases],
    ["security", "Database security", SecurityInDbms],
    ["backup-recovery", "Backup and recovery", BackupAndRecovery],
];

export { items };

function Loader() {
    return (
        <div className="routeLoader" role="status">
            <FiLoader />
            <span>Loading notes...</span>
        </div>
    );
}

export default function AppRoutes() {
    const location = useLocation();

    return (
        <Suspense key={location.pathname} fallback={<Loader />}>
            <Routes>
                <Route index element={<Navigate to="overview" replace />} />
                {items.map(([path, , Component]) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                <Route path="*" element={<Navigate to="overview" replace />} />
            </Routes>
        </Suspense>
    );
}
