// src/components/aboutDbms/index.jsx
import React from "react";
import { Styled } from "./styled";
import { FiDatabase, FiLayers, FiShield } from "react-icons/fi";

const AboutDbms = () => {
    return (
        <Styled.Wrapper id="aboutDbms">
            <div className="top">
                <h2 className="title">DBMS</h2>

                <p className="sub">
                    A DBMS is a Database Management System. It is the software
                    layer that stores data in an organized way and helps you
                    read and update it safely. Instead of scattered files, you
                    get tables, constraints, indexes, and queries that behave
                    predictably under real load.
                </p>

                <p className="sub">
                    The main value is control. A DBMS manages data integrity
                    using keys and constraints, reduces duplication through
                    normalization, and supports querying with SQL. Concurrency
                    control mechanisms such as locks and MVCC help coordinate
                    updates from multiple users.
                </p>

                <p className="sub">
                    This page is built for revision. You will scan core ideas
                    like ER model, SQL, joins, normalization, ACID, concurrency,
                    indexing, recovery, and basic distributed concepts, with a
                    clear mental model of what happens inside a database engine.
                </p>
            </div>

            <div className="grid">
                <div className="card">
                    <div className="cardTop">
                        <span className="icon">
                            <FiDatabase />
                        </span>
                        <h3 className="h3">Think in data</h3>
                    </div>

                    <div className="mini">
                        <span className="pill">Tables</span>
                        <span className="dash">-</span>
                        <span className="pill">Keys</span>
                        <span className="dash">-</span>
                        <span className="pill">Constraints</span>
                        <span className="dash">-</span>
                        <span className="pill">Indexes</span>
                    </div>

                    <p className="note">
                        Tables store rows. Keys define identity. Constraints
                        protect data integrity. Indexes can speed up matching
                        queries, with storage and write costs.
                    </p>
                </div>

                <div className="card">
                    <div className="cardTop">
                        <span className="icon">
                            <FiLayers />
                        </span>
                        <h3 className="h3">Think in queries</h3>
                    </div>

                    <div className="mini">
                        <span className="pill">SELECT</span>
                        <span className="dash">-</span>
                        <span className="pill">JOIN</span>
                        <span className="dash">-</span>
                        <span className="pill">GROUP BY</span>
                        <span className="dash">-</span>
                        <span className="pill">HAVING</span>
                    </div>

                    <p className="note">
                        Logical flow: join data, filter rows, group, filter
                        groups, select, sort, and limit. Learn this to debug
                        SQL quickly.
                    </p>
                </div>

                <div className="card">
                    <div className="cardTop">
                        <span className="icon">
                            <FiShield />
                        </span>
                        <h3 className="h3">Think in safety</h3>
                    </div>

                    <ul className="list">
                        <li>
                            ACID keeps transactions correct under failures and
                            concurrency
                        </li>
                        <li>
                            Isolation levels control dirty reads and phantom
                            reads
                        </li>
                        <li>Logs and checkpoints help crash recovery</li>
                        <li>
                            Backups protect from human mistakes and data loss
                        </li>
                    </ul>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default AboutDbms;
