import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import items from "./routes";

function Loader() {
    return (
        <div className="routeLoader" role="status" aria-live="polite">
            <FiLoader aria-hidden="true" />
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
