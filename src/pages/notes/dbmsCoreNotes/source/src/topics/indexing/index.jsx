// src/topics/indexing/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiSearch,
    FiLayers,
    FiDatabase,
    FiTrendingUp,
    FiAlertTriangle,
} from "react-icons/fi";

const Indexing = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "indexing",
            title: "Indexing",
            sub: "What indexes are, clustered vs non-clustered, B-Tree, hash index, when to use, and trade-offs.",
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
                            <span className="badge">Performance</span>
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
                        {/* What is index */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiDatabase />
                                </span>
                                <h3 className="h3">What is index</h3>
                            </div>

                            <p className="p">
                                An <b>index</b> is an extra data structure that
                                helps the database find rows faster without
                                scanning the entire table.
                            </p>

                            <div className="mini">
                                <span className="pill">Table</span>
                                <span className="dash">-</span>
                                <span className="pill">Full scan</span>
                                <span className="dash">-</span>
                                <span className="pill">Slow</span>
                            </div>

                            <div className="mini">
                                <span className="pill">Index</span>
                                <span className="dash">-</span>
                                <span className="pill">Jump to rows</span>
                                <span className="dash">-</span>
                                <span className="pill">Fast</span>
                            </div>

                            <p className="note">
                                Index is like a book index. You jump to the page
                                instead of reading every page.
                            </p>
                        </div>

                        {/* When to use */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiTrendingUp />
                                </span>
                                <h3 className="h3">When to use index</h3>
                            </div>

                            <ul className="list">
                                <li>
                                    Columns used often in <b>WHERE</b>
                                </li>
                                <li>
                                    Columns used in <b>JOIN</b> conditions
                                </li>
                                <li>
                                    Columns used in <b>ORDER BY</b>
                                </li>
                                <li>
                                    Columns used in <b>GROUP BY</b> (sometimes)
                                </li>
                                <li>
                                    Columns with high selectivity (many unique
                                    values)
                                </li>
                            </ul>

                            <p className="note">
                                Index helps when it reduces scanned rows a lot.
                                Index is less useful when most rows match.
                            </p>
                        </div>

                        {/* Clustered index */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Clustered index</h3>
                            </div>

                            <p className="p">
                                A <b>clustered index</b> decides the physical
                                order of rows on disk based on the indexed
                                column. The table data is stored in the same
                                order as the clustered key.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">How many</div>
                                    <div className="v">
                                        Usually <b>one</b> per table, because
                                        rows can be stored physically in one
                                        order only.
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Best for</div>
                                    <div className="v">
                                        Range queries like
                                        <span className="small">
                                            "WHERE createdAt BETWEEN A AND B"
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Many databases make primary key clustered by
                                default, but not always.
                            </p>
                        </div>

                        {/* Non-clustered */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Non-clustered index</h3>
                            </div>

                            <p className="p">
                                A <b>non-clustered index</b> is a separate
                                structure that stores index keys and pointers to
                                the actual table rows. Table rows are not stored
                                in index order.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">How many</div>
                                    <div className="v">
                                        Multiple can exist on the same table.
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Best for</div>
                                    <div className="v">
                                        Fast lookups on frequently filtered
                                        columns.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                It is like having multiple indexes in a book for
                                different topics.
                            </p>
                        </div>

                        {/* B-Tree */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiDatabase />
                                </span>
                                <h3 className="h3">B-Tree</h3>
                            </div>

                            <p className="p">
                                A <b>B-Tree</b> is the most common index
                                structure in relational databases. It stays
                                balanced so searching is fast. It supports both
                                equality and range queries efficiently.
                            </p>

                            <div className="tree">
                                <div className="tRow">
                                    <span className="tLabel">Good for</span>
                                    <span className="tVal">
                                        "=", "&lt;", "&gt;", BETWEEN, ORDER BY
                                    </span>
                                </div>
                                <div className="tRow">
                                    <span className="tLabel">Why</span>
                                    <span className="tVal">
                                        Balanced tree means fewer disk reads
                                        while searching
                                    </span>
                                </div>
                                <div className="tRow">
                                    <span className="tLabel">Common use</span>
                                    <span className="tVal">
                                        Primary keys, createdAt sorting, range
                                        filters
                                    </span>
                                </div>
                            </div>

                            <p className="note">
                                In interviews, just remember this: B-Tree is
                                default because it handles many query types
                                well.
                            </p>
                        </div>

                        {/* Hash index */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSearch />
                                </span>
                                <h3 className="h3">Hash index</h3>
                            </div>

                            <p className="p">
                                A <b>hash index</b> uses a hash function to map
                                a key to a bucket. It is very fast for equality
                                lookups.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Great for</div>
                                    <div className="v">
                                        Equality - "WHERE id = 10"
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Bad for</div>
                                    <div className="v">
                                        Range queries and sorting
                                        <span className="small">
                                            Example: BETWEEN, ORDER BY
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Hash indexes are not always available in all
                                engines for all table types.
                            </p>
                        </div>

                        {/* Trade-offs */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiAlertTriangle />
                                </span>
                                <h3 className="h3">Trade-offs</h3>
                            </div>

                            <ul className="list">
                                <li>
                                    <b>Faster reads</b> but <b>slower writes</b>{" "}
                                    because index must be updated on INSERT,
                                    UPDATE, DELETE
                                </li>
                                <li>
                                    Uses extra <b>storage</b>
                                </li>
                                <li>
                                    Too many indexes can slow down write-heavy
                                    systems
                                </li>
                                <li>
                                    Wrong indexes do nothing but still cost
                                    space and update time
                                </li>
                                <li>
                                    Index maintenance can increase complexity
                                </li>
                            </ul>

                            <p className="note">
                                Rule: index what you search and join on often.
                                Avoid indexing everything blindly.
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
                                B-Tree is general purpose. Hash is equality
                                only. Index speeds reads but adds write and
                                storage cost.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default Indexing;

