// src/topics/databaseFundamentals/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiDatabase,
    FiInfo,
    FiLayers,
    FiFileText,
    FiShield,
    FiSettings,
} from "react-icons/fi";

const DatabaseFundamentals = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "databaseFundamentals",
            title: "Database Fundamentals",
            sub: "Data, database, DBMS, why we use it, file system vs DBMS, data independence, and 3 schema architecture.",
        };
    }, []);

    return (
        <Styled.Wrapper id={meta.id}>
            <button
                type="button"
                className={`head ${open ? "open" : ""}`}
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-controls={`${meta.id}-content`}
            >
                <div className="left">
                    <span className="icon">
                        <FiDatabase />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Basics</span>
                        </div>
                        <p className="sub">{meta.sub}</p>
                    </div>
                </div>

                <span className="chev">
                    <FiChevronDown />
                </span>
            </button>

            <div
                id={`${meta.id}-content`}
                className={`content ${open ? "show" : ""}`}
            >
                <div className="inner">
                    <div className="grid">
                        {/* What is data */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiInfo />
                                </span>
                                <h3 className="h3">What is data</h3>
                            </div>

                            <p className="p">
                                <b>Data</b> is raw facts and values that can be
                                stored and processed. It can be numbers, text,
                                dates, images, clicks, sensor readings, or any
                                measurable information.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Examples</div>
                                <ul className="exList">
                                    <li>"Ashish"</li>
                                    <li>98</li>
                                    <li>"2026-03-01"</li>
                                    <li>"Order placed"</li>
                                </ul>
                            </div>

                            <p className="note">
                                Data becomes useful when it is organized and
                                connected to meaning, then it becomes
                                information.
                            </p>
                        </div>

                        {/* What is database */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">What is database</h3>
                            </div>

                            <p className="p">
                                A <b>database</b> is an organized collection of
                                related data stored so it can be searched,
                                updated, and managed efficiently.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Examples</div>
                                <ul className="exList">
                                    <li>Student records for a school</li>
                                    <li>
                                        Orders and customers for an eCommerce
                                        app
                                    </li>
                                    <li>Transactions for a banking system</li>
                                </ul>
                            </div>

                            <p className="note">
                                A database is the data. DBMS is the software
                                that manages it.
                            </p>
                        </div>

                        {/* DBMS */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiDatabase />
                                </span>
                                <h3 className="h3">DBMS full form</h3>
                            </div>

                            <p className="p">
                                <b>DBMS</b> stands for{" "}
                                <b>Database Management System</b>. It is
                                software that helps you create, store, retrieve,
                                update, and secure data in a database.
                            </p>

                            <div className="mini">
                                <span className="pill">Store</span>
                                <span className="dash">-</span>
                                <span className="pill">Query</span>
                                <span className="dash">-</span>
                                <span className="pill">Update</span>
                                <span className="dash">-</span>
                                <span className="pill">Secure</span>
                            </div>

                            <p className="note">
                                Popular DBMS examples: MySQL, PostgreSQL,
                                Oracle, SQL Server.
                            </p>
                        </div>

                        {/* Why DBMS */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSettings />
                                </span>
                                <h3 className="h3">Why DBMS is needed</h3>
                            </div>

                            <ul className="list">
                                <li>
                                    Store large data reliably and access it fast
                                </li>
                                <li>
                                    Handle multiple users at the same time
                                    safely
                                </li>
                                <li>
                                    Reduce duplication and keep data consistent
                                </li>
                                <li>Provide security and access control</li>
                                <li>Provide backup and recovery</li>
                            </ul>

                            <p className="note">
                                Without a DBMS, apps become fragile when data
                                grows and multiple users start writing together.
                            </p>
                        </div>

                        {/* File system vs DBMS */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFileText />
                                </span>
                                <h3 className="h3">File system vs DBMS</h3>
                            </div>

                            <div className="compare">
                                <div className="row head">
                                    <div>File system</div>
                                    <div>DBMS</div>
                                </div>

                                <div className="row">
                                    <div>
                                        Data stored in separate files like CSV,
                                        text, or custom formats
                                    </div>
                                    <div>
                                        Data stored with structure like tables,
                                        relationships, indexes
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Searching and updates become manual or
                                        slow when data grows
                                    </div>
                                    <div>
                                        SQL and query engine makes searching and
                                        updates efficient
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Concurrency is hard, risk of overwriting
                                        changes
                                    </div>
                                    <div>
                                        Transactions and locking handle
                                        concurrent users safely
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Weak security model, hard to control
                                        access properly
                                    </div>
                                    <div>
                                        Roles and permissions control who can
                                        read or write
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Backup and recovery is manual and
                                        error-prone
                                    </div>
                                    <div>
                                        Built-in logging, recovery, and backup
                                        strategies
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                File system works for small simple apps. DBMS is
                                needed for real multi-user applications.
                            </p>
                        </div>

                        {/* Advantages */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">Advantages of DBMS</h3>
                            </div>

                            <ul className="list">
                                <li>Reduced redundancy using good design</li>
                                <li>Improved consistency using constraints</li>
                                <li>
                                    Security using authentication and
                                    authorization
                                </li>
                                <li>Concurrency support using transactions</li>
                                <li>Backup and recovery support</li>
                                <li>Better data sharing across applications</li>
                            </ul>
                        </div>

                        {/* Data independence */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Data independence</h3>
                            </div>

                            <p className="p">
                                <b>Data independence</b> means changing the
                                database structure at one level without breaking
                                the level above it. This is a big reason DBMS is
                                preferred.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">
                                        Physical data independence
                                    </div>
                                    <div className="v">
                                        Change storage details without changing
                                        logical structure.
                                        <span className="small">
                                            Example: move data from HDD to SSD,
                                            change indexing method, file layout
                                            changes.
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">
                                        Logical data independence
                                    </div>
                                    <div className="v">
                                        Change logical design without changing
                                        user views.
                                        <span className="small">
                                            Example: split one table into two
                                            tables, add new attributes, create a
                                            view to keep old output.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Logical data independence is harder to achieve
                                than physical.
                            </p>
                        </div>

                        {/* Three schema architecture */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">
                                    Three schema architecture
                                </h3>
                            </div>

                            <p className="p">
                                Three schema architecture separates how data is
                                stored, how it is logically designed, and how
                                users see it. This supports data independence.
                            </p>

                            <div className="schema">
                                <div className="sRow head">
                                    <div className="c1">Schema</div>
                                    <div className="c2">What it means</div>
                                    <div className="c3">Example</div>
                                </div>

                                <div className="sRow">
                                    <div className="c1">Internal schema</div>
                                    <div className="c2">
                                        Physical storage details and access
                                        paths
                                    </div>
                                    <div className="c3">
                                        File layout, indexes, page structure
                                    </div>
                                </div>

                                <div className="sRow">
                                    <div className="c1">Conceptual schema</div>
                                    <div className="c2">
                                        Logical structure of the entire database
                                    </div>
                                    <div className="c3">
                                        Tables, relations, constraints
                                    </div>
                                </div>

                                <div className="sRow">
                                    <div className="c1">External schema</div>
                                    <div className="c2">
                                        User-specific views of data
                                    </div>
                                    <div className="c3">
                                        Views like "studentSummary",
                                        "billingView"
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Memory trick: external is what users see,
                                conceptual is the full logical design, internal
                                is how it is stored.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiDatabase />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                Database is data. DBMS is the manager. Three
                                schemas separate storage, design, and views.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default DatabaseFundamentals;

