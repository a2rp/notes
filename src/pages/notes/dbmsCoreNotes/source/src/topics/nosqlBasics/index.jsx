// src/topics/nosqlBasics/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiDatabase,
    FiLayers,
    FiGrid,
    FiShare2,
    FiZap,
    FiFileText,
    FiHelpCircle,
} from "react-icons/fi";

const NoSqlBasics = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "nosqlBasics",
            title: "NoSQL Basics",
            sub: "What NoSQL is, main types, SQL vs NoSQL, and when to choose NoSQL for real systems.",
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
                            <span className="badge">NoSQL</span>
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
                        {/* What is NoSQL */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiHelpCircle />
                                </span>
                                <h3 className="h3">What is NoSQL</h3>
                            </div>

                            <p className="p">
                                <b>NoSQL</b> means <b>Not Only SQL</b>. It is a
                                category of databases designed for flexibility,
                                high scale, and fast performance for certain
                                workloads. NoSQL systems often store data in
                                formats other than rows and tables.
                            </p>

                            <ul className="list">
                                <li>
                                    Flexible schema - fields can vary between
                                    records
                                </li>
                                <li>
                                    Scales horizontally - add more machines to
                                    handle load
                                </li>
                                <li>Optimized for specific access patterns</li>
                            </ul>

                            <p className="note">
                                NoSQL is not "no structure". It is structure
                                that fits the use case.
                            </p>
                        </div>

                        {/* Types overview */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Types</h3>
                            </div>

                            <div className="mini">
                                <span className="pill">Key-value</span>
                                <span className="dash">-</span>
                                <span className="pill">Document</span>
                                <span className="dash">-</span>
                                <span className="pill">Column family</span>
                                <span className="dash">-</span>
                                <span className="pill">Graph</span>
                            </div>

                            <p className="p">
                                Each type is built around a different way of
                                storing and querying data. Pick based on how
                                your app reads and writes data.
                            </p>

                            <p className="note">
                                Most real systems use a mix of SQL and NoSQL.
                            </p>
                        </div>

                        {/* Key-value */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiZap />
                                </span>
                                <h3 className="h3">Key-value</h3>
                            </div>

                            <p className="p">
                                Stores data as <b>key - value</b> pairs. You
                                give a key, it returns a value. Very fast for
                                simple lookups.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example shape</div>
                                <pre className="pre">{`"user:42" -> "{ name: 'Ash', plan: 'pro' }"`}</pre>
                            </div>

                            <ul className="list">
                                <li>
                                    Best for caching, sessions, counters,
                                    feature flags
                                </li>
                                <li>
                                    Weak for complex joins or ad-hoc analytics
                                </li>
                            </ul>
                        </div>

                        {/* Document */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFileText />
                                </span>
                                <h3 className="h3">Document</h3>
                            </div>

                            <p className="p">
                                Stores records as <b>documents</b>, commonly
                                JSON-like. Each document can have nested objects
                                and arrays.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example document</div>
                                <pre className="pre">{`{
  "_id": "order_1001",
  "userId": "u42",
  "items": [
    { "sku": "p10", "qty": 2 },
    { "sku": "p21", "qty": 1 }
  ],
  "total": 1299
}`}</pre>
                            </div>

                            <ul className="list">
                                <li>
                                    Great for user profiles, product catalogs,
                                    logs, content apps
                                </li>
                                <li>
                                    Joins are limited, denormalization is common
                                </li>
                            </ul>
                        </div>

                        {/* Column family */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Column family</h3>
                            </div>

                            <p className="p">
                                Stores data in <b>column families</b>{" "}
                                (wide-column). It is optimized for large-scale
                                reads and writes across many nodes. Rows can
                                have many columns and columns can vary.
                            </p>

                            <ul className="list">
                                <li>
                                    Good for time-series, telemetry, large event
                                    data
                                </li>
                                <li>Designed for high throughput and scale</li>
                                <li>
                                    Query patterns must be planned in advance
                                </li>
                            </ul>

                            <p className="note">
                                Think of it like a giant sparse table tuned for
                                scale.
                            </p>
                        </div>

                        {/* Graph */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShare2 />
                                </span>
                                <h3 className="h3">Graph</h3>
                            </div>

                            <p className="p">
                                Stores data as <b>nodes</b> and <b>edges</b>.
                                The focus is on relationships and traversals.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example idea</div>
                                <pre className="pre">{`(Ash) -[FRIEND]-> (Neha)
(Ash) -[LIKES]-> (Robotics)
(Robotics) -[RELATED]-> (AI)`}</pre>
                            </div>

                            <ul className="list">
                                <li>
                                    Best for social networks, recommendations,
                                    fraud detection
                                </li>
                                <li>Strong for relationship-heavy queries</li>
                            </ul>
                        </div>

                        {/* SQL vs NoSQL */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">SQL vs NoSQL comparison</h3>
                            </div>

                            <div className="compare">
                                <div className="row head">
                                    <div>SQL (Relational)</div>
                                    <div>NoSQL</div>
                                </div>

                                <div className="row">
                                    <div>Fixed schema, tables and rows</div>
                                    <div>
                                        Flexible schema, multiple data models
                                    </div>
                                </div>

                                <div className="row">
                                    <div>Strong joins and complex queries</div>
                                    <div>
                                        Optimized for specific access patterns
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        ACID transactions are widely supported
                                    </div>
                                    <div>
                                        Transaction and consistency guarantees
                                        vary by system; many support ACID
                                        transactions
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Often deployed with vertical scaling;
                                        horizontal scaling is also possible
                                    </div>
                                    <div>
                                        Often designed for horizontal scaling;
                                        deployment choices still vary
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Great for financial, inventory, strong
                                        integrity apps
                                    </div>
                                    <div>
                                        Great for logs, content, high traffic,
                                        flexible data apps
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Choose by data model, consistency needs, query
                                patterns, scale, and operational fit. SQL and
                                NoSQL systems overlap in the guarantees and
                                workloads they support.
                            </p>
                        </div>

                        {/* When to use NoSQL */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiDatabase />
                                </span>
                                <h3 className="h3">When to use NoSQL</h3>
                            </div>

                            <ul className="list">
                                <li>
                                    When schema changes frequently and you want
                                    flexibility
                                </li>
                                <li>
                                    When you need massive scale and horizontal
                                    scaling is the plan
                                </li>
                                <li>
                                    When data is unstructured or semi-structured
                                    (logs, events, content)
                                </li>
                                <li>
                                    When you need very fast key-based reads
                                    (cache, sessions)
                                </li>
                                <li>
                                    When relationships are best represented as
                                    graphs (recommendations)
                                </li>
                                <li>
                                    When your queries are predictable and
                                    designed around the storage model
                                </li>
                            </ul>

                            <p className="note">
                                In many products: SQL for core data, NoSQL for
                                logs, cache, search, and high-scale side
                                workloads.
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
                                NoSQL is about choosing the right data model -
                                key-value for speed, document for flexible JSON,
                                column family for scale, graph for
                                relationships.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default NoSqlBasics;

