// src/topics/sqlBasics/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCode,
    FiTool,
    FiEdit3,
    FiSearch,
    FiShield,
    FiRefreshCw,
} from "react-icons/fi";

const SqlBasics = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "sqlBasics",
            title: "SQL Basics",
            sub: "SQL meaning and the 5 command groups - DDL, DML, DQL, TCL, DCL, with common commands and examples.",
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
                        <FiCode />
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
                        {/* What is SQL */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCode />
                                </span>
                                <h3 className="h3">
                                    What is SQL - Structured Query Language
                                </h3>
                            </div>

                            <p className="p">
                                <b>SQL</b> means{" "}
                                <b>Structured Query Language</b>. It is the
                                standard language used to talk to relational
                                databases. With SQL, you can define tables,
                                insert and update rows, query data, and control
                                access.
                            </p>

                            <div className="mini">
                                <span className="pill">Define</span>
                                <span className="dash">-</span>
                                <span className="pill">Insert</span>
                                <span className="dash">-</span>
                                <span className="pill">Query</span>
                                <span className="dash">-</span>
                                <span className="pill">Control</span>
                                <span className="dash">-</span>
                                <span className="pill">Commit</span>
                            </div>

                            <p className="note">
                                SQL is declarative. You tell what you want, the
                                database figures out how to do it.
                            </p>
                        </div>

                        {/* DDL */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiTool />
                                </span>
                                <h3 className="h3">
                                    DDL - Data Definition Language
                                </h3>
                            </div>

                            <p className="p">
                                DDL is used to create and modify database
                                structure like tables and columns.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">CREATE</div>
                                    <div className="v">
                                        Creates objects like tables, indexes,
                                        views.
                                        <span className="small">
                                            Example: create table users (...)
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">ALTER</div>
                                    <div className="v">
                                        Modifies structure of existing objects.
                                        <span className="small">
                                            Example: add a column, change
                                            datatype
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">DROP</div>
                                    <div className="v">
                                        Deletes objects permanently.
                                        <span className="small">
                                            Example: drop table users
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                DDL changes schema. Many DBs auto-commit DDL.
                            </p>
                        </div>

                        {/* DML */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiEdit3 />
                                </span>
                                <h3 className="h3">
                                    DML - Data Manipulation Language
                                </h3>
                            </div>

                            <p className="p">
                                DML is used to change actual data inside tables.
                                It works on rows.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">INSERT</div>
                                    <div className="v">
                                        Adds new rows to a table.
                                        <span className="small">
                                            Example: insert into users values
                                            (...)
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">UPDATE</div>
                                    <div className="v">
                                        Modifies existing rows.
                                        <span className="small">
                                            Example: update users set name='A'
                                            where id=1
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">DELETE</div>
                                    <div className="v">
                                        Removes rows from a table.
                                        <span className="small">
                                            Example: delete from users where
                                            id=1
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                DML is usually controlled by transactions. You
                                can rollback if not committed.
                            </p>
                        </div>

                        {/* DQL */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSearch />
                                </span>
                                <h3 className="h3">
                                    DQL - Data Query Language
                                </h3>
                            </div>

                            <p className="p">
                                DQL is used to read data from tables. The core
                                command is SELECT.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">SELECT</div>
                                    <div className="v">
                                        Fetches rows and columns from one or
                                        more tables.
                                        <span className="small">
                                            Example: select name from users
                                            where city='Bhopal'
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                For selective lookups, a WHERE clause can reduce
                                rows to scan. Full scans are sometimes the right
                                plan, such as for small tables or reports that
                                need most rows.
                            </p>
                        </div>

                        {/* TCL */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiRefreshCw />
                                </span>
                                <h3 className="h3">
                                    TCL - Transaction Control Language
                                </h3>
                            </div>

                            <p className="p">
                                TCL manages transactions. It decides when your
                                changes become permanent or when to undo them.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">COMMIT</div>
                                    <div className="v">
                                        Makes changes permanent in the database.
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">ROLLBACK</div>
                                    <div className="v">
                                        Undoes changes since last commit or
                                        savepoint.
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">SAVEPOINT</div>
                                    <div className="v">
                                        Creates a named point inside a
                                        transaction to rollback partially.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Think of SAVEPOINT like a checkpoint inside one
                                transaction.
                            </p>
                        </div>

                        {/* DCL */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">
                                    DCL - Data Control Language
                                </h3>
                            </div>

                            <p className="p">
                                DCL controls permissions. It decides who can
                                read, write, or manage database objects.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">GRANT</div>
                                    <div className="v">
                                        Gives permissions to a user or role.
                                        <span className="small">
                                            Example: grant select on users to
                                            analystRole
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">REVOKE</div>
                                    <div className="v">
                                        Removes previously granted permissions.
                                        <span className="small">
                                            Example: revoke insert on users from
                                            tempUser
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                DCL is critical in production to prevent
                                accidental data damage.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiCode />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                DDL defines structure, DML changes rows, DQL
                                reads, TCL controls commit and rollback, DCL
                                controls permissions.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default SqlBasics;

