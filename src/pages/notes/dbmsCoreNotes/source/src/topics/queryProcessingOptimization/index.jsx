// src/topics/queryProcessingOptimization/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiSearch,
    FiMap,
    FiDollarSign,
    FiPlay,
    FiTrendingUp,
} from "react-icons/fi";

const QueryProcessingOptimization = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "queryProcessingOptimization",
            title: "Query Processing and Optimization",
            sub: "How SQL becomes an execution plan, how the optimizer chooses paths, and why indexes change performance.",
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
                        <FiSearch />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Optimizer</span>
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
                        {/* Query parsing */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSearch />
                                </span>
                                <h3 className="h3">Query parsing</h3>
                            </div>

                            <p className="p">
                                <b>Query parsing</b> is the first step where the
                                DBMS reads your SQL, checks syntax, checks that
                                tables and columns exist, and builds an internal
                                representation of the query.
                            </p>

                            <div className="steps">
                                <div className="step">
                                    <div className="n">1</div>
                                    <div className="t">
                                        <b>Lexing</b> - breaks SQL into tokens
                                        like SELECT, FROM, column names
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="n">2</div>
                                    <div className="t">
                                        <b>Parsing</b> - creates a parse tree
                                        (structure of the query)
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="n">3</div>
                                    <div className="t">
                                        <b>Validation</b> - checks schema,
                                        types, permissions
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Output of parsing is not yet "how to run" it, it
                                is "what you asked".
                            </p>
                        </div>

                        {/* Query plan */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiMap />
                                </span>
                                <h3 className="h3">Query plan</h3>
                            </div>

                            <p className="p">
                                A <b>query plan</b> is the DBMS decision of how
                                to execute the query. It is a tree of operations
                                like scans, filters, joins, sorts, and
                                aggregations.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Scan</div>
                                    <div className="v">
                                        Read rows from a table or index
                                        <span className="small">
                                            Table scan or index scan
                                        </span>
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Join</div>
                                    <div className="v">
                                        Combine rows from multiple tables
                                        <span className="small">
                                            Hash join, nested loop join, merge
                                            join
                                        </span>
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Sort</div>
                                    <div className="v">
                                        Order results, often needed for ORDER BY
                                        or merge join
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Aggregate</div>
                                    <div className="v">
                                        GROUP BY calculations like COUNT, SUM
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Same SQL can have many possible plans. Optimizer
                                picks one.
                            </p>
                        </div>

                        {/* Cost-based optimization */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiDollarSign />
                                </span>
                                <h3 className="h3">Cost-based optimization</h3>
                            </div>

                            <p className="p">
                                <b>Cost-based optimization</b> means the DBMS
                                estimates the cost of different plans and picks
                                the cheapest one. Cost is not money, it means
                                expected work like CPU, disk reads, memory, and
                                time.
                            </p>

                            <ul className="list">
                                <li>
                                    Uses <b>statistics</b> like row counts,
                                    distinct values, distribution
                                </li>
                                <li>
                                    Estimates selectivity of filters like WHERE
                                    conditions
                                </li>
                                <li>Tries join orders and join algorithms</li>
                                <li>
                                    Prefers plans with fewer reads and smaller
                                    intermediate results
                                </li>
                            </ul>

                            <p className="note">
                                If stats are outdated, optimizer can choose a
                                bad plan. This is why ANALYZE or stats refresh
                                matters.
                            </p>
                        </div>

                        {/* Execution plan basics */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiPlay />
                                </span>
                                <h3 className="h3">Execution plan basics</h3>
                            </div>

                            <p className="p">
                                An <b>execution plan</b> is the final plan that
                                the DBMS actually runs. Most databases let you
                                view it using EXPLAIN or EXPLAIN ANALYZE.
                            </p>

                            <p className="note">
                                EXPLAIN ANALYZE executes the statement to collect
                                actual measurements. Use care with statements
                                that change data.
                            </p>

                            <div className="ex">
                                <div className="exTitle">
                                    What you usually see
                                </div>
                                <ul className="exList">
                                    <li>
                                        <b>Node types</b> like Seq Scan, Index
                                        Scan, Hash Join
                                    </li>
                                    <li>
                                        <b>Estimated rows</b> vs actual rows
                                    </li>
                                    <li>
                                        <b>Costs</b> like startup cost and total
                                        cost
                                    </li>
                                    <li>
                                        <b>Time</b> and buffers in real run
                                        (ANALYZE)
                                    </li>
                                </ul>
                            </div>

                            <p className="note">
                                Reading plans is a skill. Always check which
                                step produces the biggest row explosion.
                            </p>
                        </div>

                        {/* Why indexes change performance */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiTrendingUp />
                                </span>
                                <h3 className="h3">
                                    Why indexes change performance
                                </h3>
                            </div>

                            <p className="p">
                                An <b>index</b> is like a book index. Instead of
                                scanning every row, the DBMS can jump to
                                matching rows faster. This can reduce disk reads
                                massively, especially for large tables.
                            </p>

                            <div className="compare">
                                <div className="row head">
                                    <div>Without index</div>
                                    <div>With index</div>
                                </div>

                                <div className="row">
                                    <div>
                                        DBMS may do a full table scan and check
                                        every row
                                    </div>
                                    <div>
                                        DBMS can do an index scan and fetch only
                                        matching rows
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Faster only for small tables, but
                                        becomes slow as table grows
                                    </div>
                                    <div>
                                        Big speedup when filter selects few rows
                                        out of many
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Sorting may be needed for ORDER BY
                                    </div>
                                    <div>
                                        Index order can remove sorting in some
                                        cases
                                    </div>
                                </div>

                                <div className="row">
                                    <div>Joins may scan many rows first</div>
                                    <div>
                                        Index can speed up joins on keys (like
                                        foreign key joins)
                                    </div>
                                </div>
                            </div>

                            <div className="warn">
                                <div className="wTitle">Index trade-offs</div>
                                <ul className="wList">
                                    <li>
                                        Indexes make reads faster but writes
                                        slower (INSERT, UPDATE, DELETE must
                                        update index too)
                                    </li>
                                    <li>
                                        Too many indexes increase storage and
                                        maintenance cost
                                    </li>
                                    <li>
                                        Index helps only if it matches the query
                                        pattern (columns and order matter)
                                    </li>
                                </ul>
                            </div>

                            <p className="note">
                                Simple memory: index helps when you search small
                                part of a big table.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiSearch />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                SQL becomes a plan. Optimizer picks cheapest
                                path using stats. Indexes reduce scanning but
                                add write cost.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default QueryProcessingOptimization;

