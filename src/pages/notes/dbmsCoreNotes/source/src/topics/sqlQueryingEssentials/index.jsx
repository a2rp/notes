// src/topics/sqlQueryingEssentials/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiSearch,
    FiFilter,
    FiGrid,
    FiHash,
    FiBarChart2,
    FiArrowDown,
} from "react-icons/fi";

const SqlQueryingEssentials = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "sqlQueryingEssentials",
            title: "SQL Querying Essentials",
            sub: "WHERE, logical operators, BETWEEN, IN, LIKE, ORDER BY, GROUP BY, HAVING, and aggregate functions with examples.",
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
                            <span className="badge">SQL</span>
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
                        {/* Quick mental model */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">
                                    Mental model - query flow
                                </h3>
                            </div>

                            <p className="p">
                                A simple way to remember query behavior is the
                                typical pipeline below. This helps you debug
                                GROUP BY and HAVING fast.
                            </p>

                            <div className="flow">
                                <span className="pill">FROM</span>
                                <span className="dash">-</span>
                                <span className="pill">WHERE</span>
                                <span className="dash">-</span>
                                <span className="pill">GROUP BY</span>
                                <span className="dash">-</span>
                                <span className="pill">HAVING</span>
                                <span className="dash">-</span>
                                <span className="pill">SELECT</span>
                                <span className="dash">-</span>
                                <span className="pill">ORDER BY</span>
                                <span className="dash">-</span>
                                <span className="pill">LIMIT</span>
                            </div>

                            <p className="note">
                                WHERE filters rows before grouping. HAVING
                                filters groups after GROUP BY.
                            </p>
                        </div>

                        {/* WHERE */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFilter />
                                </span>
                                <h3 className="h3">WHERE clause</h3>
                            </div>

                            <p className="p">
                                <b>WHERE</b> filters rows based on a condition.
                                It runs before GROUP BY.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT * 
FROM users
WHERE city = 'Bangalore';`}</pre>
                            </div>

                            <p className="note">
                                If there is no WHERE, SQL uses all rows.
                            </p>
                        </div>

                        {/* AND OR NOT */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiHash />
                                </span>
                                <h3 className="h3">AND, OR, NOT</h3>
                            </div>

                            <p className="p">
                                Combine conditions using logical operators.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT * 
FROM orders
WHERE status = 'PAID'
  AND amount >= 500;

SELECT * 
FROM users
WHERE city = 'Bhopal'
   OR city = 'Bangalore';

SELECT * 
FROM users
WHERE NOT isBlocked = true;`}</pre>
                            </div>

                            <p className="note">
                                Use parentheses when mixing AND and OR to avoid
                                surprises.
                            </p>
                        </div>

                        {/* BETWEEN */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiBarChart2 />
                                </span>
                                <h3 className="h3">BETWEEN</h3>
                            </div>

                            <p className="p">
                                <b>BETWEEN</b> checks a range, usually inclusive
                                on both ends.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT * 
FROM payments
WHERE amount BETWEEN 100 AND 500;

SELECT * 
FROM logs
WHERE createdAt BETWEEN '2026-03-01' AND '2026-03-31';`}</pre>
                            </div>

                            <p className="note">
                                If you need strict exclusive range, use &lt; and
                                &gt;.
                            </p>
                        </div>

                        {/* IN */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">IN</h3>
                            </div>

                            <p className="p">
                                <b>IN</b> matches any value from a list. It is
                                cleaner than writing many OR conditions.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT * 
FROM users
WHERE role IN ('ADMIN', 'EMPLOYEE', 'REPORTS_ONLY');`}</pre>
                            </div>

                            <p className="note">
                                IN also works with subqueries that return a
                                list.
                            </p>
                        </div>

                        {/* LIKE */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSearch />
                                </span>
                                <h3 className="h3">LIKE</h3>
                            </div>

                            <p className="p">
                                <b>LIKE</b> matches patterns in text. Wildcards
                                are % for many chars and _ for one char.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT * 
FROM users
WHERE name LIKE 'Ash%';

SELECT * 
FROM users
WHERE email LIKE '%@gmail.com';

SELECT * 
FROM products
WHERE sku LIKE 'A_12%';`}</pre>
                            </div>

                            <p className="note">
                                LIKE can be slow on large tables without proper
                                indexing strategy.
                            </p>
                        </div>

                        {/* ORDER BY */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiArrowDown />
                                </span>
                                <h3 className="h3">ORDER BY</h3>
                            </div>

                            <p className="p">
                                <b>ORDER BY</b> sorts the output. Default is
                                ascending (ASC). Use DESC for descending.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT * 
FROM orders
ORDER BY createdAt DESC;

SELECT * 
FROM users
ORDER BY lastName ASC, firstName ASC;`}</pre>
                            </div>

                            <p className="note">
                                Sorting large results can be expensive, indexes
                                can help.
                            </p>
                        </div>

                        {/* GROUP BY */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">GROUP BY</h3>
                            </div>

                            <p className="p">
                                <b>GROUP BY</b> groups rows that share the same
                                value so you can compute aggregates like COUNT
                                or SUM.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT city, COUNT(*) AS usersCount
FROM users
GROUP BY city;`}</pre>
                            </div>

                            <p className="note">
                                Every selected column must be either grouped or
                                aggregated.
                            </p>
                        </div>

                        {/* HAVING */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFilter />
                                </span>
                                <h3 className="h3">HAVING</h3>
                            </div>

                            <p className="p">
                                <b>HAVING</b> filters groups after GROUP BY. Use
                                it when the condition depends on an aggregate.
                            </p>

                            <div className="code">
                                <pre className="pre">{`SELECT city, COUNT(*) AS usersCount
FROM users
GROUP BY city
HAVING COUNT(*) >= 10;`}</pre>
                            </div>

                            <p className="note">
                                WHERE cannot use aggregate results, HAVING can.
                            </p>
                        </div>

                        {/* Aggregates */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiBarChart2 />
                                </span>
                                <h3 className="h3">Aggregate functions</h3>
                            </div>

                            <p className="p">
                                Aggregates compute one result from many rows.
                                They are most often used with GROUP BY.
                            </p>

                            <div className="aggGrid">
                                <div className="agg">
                                    <div className="aggTitle">COUNT</div>
                                    <div className="aggSub">
                                        Counts rows or non-null values
                                    </div>
                                    <pre className="pre miniPre">{`SELECT COUNT(*) FROM users;`}</pre>
                                </div>

                                <div className="agg">
                                    <div className="aggTitle">SUM</div>
                                    <div className="aggSub">
                                        Adds numeric values
                                    </div>
                                    <pre className="pre miniPre">{`SELECT SUM(amount) FROM payments;`}</pre>
                                </div>

                                <div className="agg">
                                    <div className="aggTitle">AVG</div>
                                    <div className="aggSub">
                                        Average of numeric values
                                    </div>
                                    <pre className="pre miniPre">{`SELECT AVG(amount) FROM payments;`}</pre>
                                </div>

                                <div className="agg">
                                    <div className="aggTitle">MIN</div>
                                    <div className="aggSub">Smallest value</div>
                                    <pre className="pre miniPre">{`SELECT MIN(amount) FROM payments;`}</pre>
                                </div>

                                <div className="agg">
                                    <div className="aggTitle">MAX</div>
                                    <div className="aggSub">Largest value</div>
                                    <pre className="pre miniPre">{`SELECT MAX(amount) FROM payments;`}</pre>
                                </div>
                            </div>

                            <p className="note">
                                COUNT(column) ignores NULL. COUNT(*) counts
                                rows.
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
                                WHERE filters rows, GROUP BY makes groups,
                                HAVING filters groups, ORDER BY sorts output.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default SqlQueryingEssentials;

