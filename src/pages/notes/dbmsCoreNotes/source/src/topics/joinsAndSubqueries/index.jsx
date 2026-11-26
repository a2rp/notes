// src/topics/joinsAndSubqueries/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiGitMerge,
    FiLayers,
    FiSearch,
    FiCode,
    FiLink,
} from "react-icons/fi";

const JoinsAndSubqueries = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "joinsAndSubqueries",
            title: "Joins and Subqueries",
            sub: "INNER, LEFT, RIGHT, FULL, self join, cross join, subquery, correlated subquery, EXISTS, and nested queries.",
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
                        <FiGitMerge />
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
                    <div className="hero">
                        <div className="heroTop">
                            <span className="heroIcon">
                                <FiLayers />
                            </span>
                            <div>
                                <div className="heroTitle">Core idea</div>
                                <div className="heroSub">
                                    A join combines rows from two tables using a
                                    matching condition. A subquery is a query
                                    inside another query, used to filter or
                                    compute results.
                                </div>
                            </div>
                        </div>

                        <div className="mini">
                            <span className="pill">JOIN - combine rows</span>
                            <span className="dash">-</span>
                            <span className="pill">
                                SUBQUERY - query inside query
                            </span>
                            <span className="dash">-</span>
                            <span className="pill">
                                EXISTS - checks presence
                            </span>
                        </div>
                    </div>

                    <div className="grid">
                        {/* INNER JOIN */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLink />
                                </span>
                                <h3 className="h3">INNER JOIN</h3>
                            </div>

                            <p className="p">
                                Returns only rows that match in both tables
                                based on the join condition. Think
                                "intersection".
                            </p>

                            <pre className="code">
                                {`SELECT e.id, e.name, d.deptName
FROM employees e
INNER JOIN departments d
ON e.deptId = d.id;`}
                            </pre>

                            <p className="note">
                                If an employee has no matching department, that
                                employee is not returned.
                            </p>
                        </div>

                        {/* LEFT JOIN */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitMerge />
                                </span>
                                <h3 className="h3">LEFT JOIN</h3>
                            </div>

                            <p className="p">
                                Returns all rows from the left table, plus
                                matching rows from the right table. If no match,
                                right side columns become NULL.
                            </p>

                            <pre className="code">
                                {`SELECT c.id, c.name, o.orderId
FROM customers c
LEFT JOIN orders o
ON o.customerId = c.id;`}
                            </pre>

                            <p className="note">
                                Useful to find "items with no match" using WHERE
                                rightTableColumn IS NULL.
                            </p>
                        </div>

                        {/* RIGHT JOIN */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitMerge />
                                </span>
                                <h3 className="h3">RIGHT JOIN</h3>
                            </div>

                            <p className="p">
                                Returns all rows from the right table, plus
                                matching rows from the left table. If no match,
                                left side columns become NULL.
                            </p>

                            <pre className="code">
                                {`SELECT e.id, e.name, d.deptName
FROM employees e
RIGHT JOIN departments d
ON e.deptId = d.id;`}
                            </pre>

                            <p className="note">
                                Many teams avoid RIGHT JOIN and use LEFT JOIN by
                                swapping tables for readability.
                            </p>
                        </div>

                        {/* FULL JOIN */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitMerge />
                                </span>
                                <h3 className="h3">FULL JOIN</h3>
                            </div>

                            <p className="p">
                                Returns all rows from both tables. Matching rows
                                are merged. Non-matching rows appear with NULLs
                                for missing side.
                            </p>

                            <pre className="code">
                                {`SELECT a.id, a.name, b.info
FROM tableA a
FULL OUTER JOIN tableB b
ON a.id = b.aId;`}
                            </pre>

                            <p className="note">
                                Some DBs do not support FULL OUTER JOIN
                                directly. Workaround is UNION of LEFT and RIGHT
                                joins.
                            </p>
                        </div>

                        {/* Self join */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Self join</h3>
                            </div>

                            <p className="p">
                                Joining a table with itself. Used when a table
                                has relationships inside itself, like employees
                                and their managers.
                            </p>

                            <pre className="code">
                                {`SELECT e.name AS employeeName, m.name AS managerName
FROM employees e
LEFT JOIN employees m
ON e.managerId = m.id;`}
                            </pre>

                            <p className="note">
                                Aliases are required to distinguish the same
                                table as two roles.
                            </p>
                        </div>

                        {/* Cross join */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">CROSS JOIN</h3>
                            </div>

                            <p className="p">
                                Produces a Cartesian product. Every row of left
                                table combines with every row of right table.
                                Use carefully.
                            </p>

                            <pre className="code">
                                {`SELECT s.size, c.color
FROM sizes s
CROSS JOIN colors c;`}
                            </pre>

                            <p className="note">
                                Useful for generating combinations, but can
                                explode row count quickly.
                            </p>
                        </div>

                        {/* Subquery */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSearch />
                                </span>
                                <h3 className="h3">Subquery</h3>
                            </div>

                            <p className="p">
                                A subquery is a query inside another query. It
                                can be used in WHERE, SELECT, FROM, and even in
                                HAVING. It helps when one query needs result
                                from another.
                            </p>

                            <div className="twoCol">
                                <div className="box">
                                    <div className="boxTitle">
                                        Subquery in WHERE
                                    </div>
                                    <pre className="code">
                                        {`SELECT name
FROM employees
WHERE salary > (
    SELECT AVG(salary) FROM employees
);`}
                                    </pre>
                                    <div className="small">
                                        Find employees whose salary is above
                                        average.
                                    </div>
                                </div>

                                <div className="box">
                                    <div className="boxTitle">
                                        Subquery in FROM
                                    </div>
                                    <pre className="code">
                                        {`SELECT deptId, avgSalary
FROM (
    SELECT deptId, AVG(salary) AS avgSalary
    FROM employees
    GROUP BY deptId
) t
WHERE avgSalary > 50000;`}
                                    </pre>
                                    <div className="small">
                                        Make a derived table and filter on it.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Correlated subquery */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCode />
                                </span>
                                <h3 className="h3">Correlated subquery</h3>
                            </div>

                            <p className="p">
                                A correlated subquery depends on the outer query
                                row. It runs once per row of the outer query. It
                                can be slower than joins, but is sometimes the
                                clearest way to express logic.
                            </p>

                            <pre className="code">
                                {`SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.deptId = e.deptId
);`}
                            </pre>

                            <p className="note">
                                This finds employees earning above their own
                                department average.
                            </p>
                        </div>

                        {/* EXISTS */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSearch />
                                </span>
                                <h3 className="h3">EXISTS</h3>
                            </div>

                            <p className="p">
                                EXISTS checks whether the subquery returns at
                                least one row. It returns true or false. It does
                                not care about values, only presence.
                            </p>

                            <pre className="code">
                                {`SELECT c.id, c.name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customerId = c.id
);`}
                            </pre>

                            <p className="note">
                                Often faster than IN for large datasets because
                                it can stop at first match.
                            </p>
                        </div>

                        {/* Nested queries */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Nested queries</h3>
                            </div>

                            <p className="p">
                                Nested queries are multiple levels of
                                subqueries. Useful but can reduce readability.
                                Use with care.
                            </p>

                            <pre className="code">
                                {`SELECT name
FROM employees
WHERE deptId IN (
    SELECT id
    FROM departments
    WHERE locationId IN (
        SELECT id FROM locations WHERE city = 'Bangalore'
    )
);`}
                            </pre>

                            <p className="note">
                                If it gets too nested, consider rewriting using
                                joins for clarity and performance.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiGitMerge />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                INNER gives matches, LEFT keeps left, RIGHT
                                keeps right, FULL keeps all. Subquery is query
                                inside query. Correlated runs per row. EXISTS
                                checks presence.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default JoinsAndSubqueries;

