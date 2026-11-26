// src/topics/constraints/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiShield,
    FiKey,
    FiLink,
    FiCheckCircle,
    FiHash,
    FiSliders,
} from "react-icons/fi";

const Constraints = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "constraints",
            title: "Constraints",
            sub: "Rules that protect data quality - NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT.",
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
                        <FiShield />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Data rules</span>
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
                        {/* What are constraints */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">What is a constraint</h3>
                            </div>

                            <p className="p">
                                A <b>constraint</b> is a rule enforced by the
                                database to keep data valid. It prevents wrong
                                inserts and updates, so your tables do not
                                become messy over time.
                            </p>

                            <div className="mini">
                                <span className="pill">Integrity</span>
                                <span className="dash">-</span>
                                <span className="pill">Consistency</span>
                                <span className="dash">-</span>
                                <span className="pill">Safety</span>
                            </div>

                            <p className="note">
                                Constraints are checked automatically on INSERT
                                and UPDATE.
                            </p>
                        </div>

                        {/* NOT NULL */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSliders />
                                </span>
                                <h3 className="h3">NOT NULL</h3>
                            </div>

                            <p className="p">
                                <b>NOT NULL</b> means this column must always
                                have a value. It cannot be NULL.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <pre className="code">
                                    {`name VARCHAR(100) NOT NULL`}
                                </pre>
                                <div className="exText">
                                    A user must have a name. Blank string "" is
                                    allowed, but NULL is not.
                                </div>
                            </div>

                            <p className="note">
                                NULL means "unknown or missing", it is not the
                                same as 0 or "".
                            </p>
                        </div>

                        {/* UNIQUE */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiHash />
                                </span>
                                <h3 className="h3">UNIQUE</h3>
                            </div>

                            <p className="p">
                                <b>UNIQUE</b> means all values in this column
                                must be different. No duplicates allowed.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <pre className="code">
                                    {`email VARCHAR(255) UNIQUE`}
                                </pre>
                                <div className="exText">
                                    Two users cannot have the same email.
                                </div>
                            </div>

                            <p className="note">
                                Many databases allow multiple NULLs in a UNIQUE
                                column, because NULL is treated as "no value".
                            </p>
                        </div>

                        {/* PRIMARY KEY */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiKey />
                                </span>
                                <h3 className="h3">PRIMARY KEY</h3>
                            </div>

                            <p className="p">
                                <b>PRIMARY KEY</b> uniquely identifies each row.
                                It is basically <b>UNIQUE + NOT NULL</b>{" "}
                                together.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <pre className="code">
                                    {`id INT PRIMARY KEY`}
                                </pre>
                                <div className="exText">
                                    Each row must have a unique id and it cannot
                                    be NULL.
                                </div>
                            </div>

                            <p className="note">
                                One table has only one primary key, but it can
                                be a composite key.
                            </p>
                        </div>

                        {/* FOREIGN KEY */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLink />
                                </span>
                                <h3 className="h3">FOREIGN KEY</h3>
                            </div>

                            <p className="p">
                                <b>FOREIGN KEY</b> links one table to another.
                                It ensures the referenced value exists in the
                                parent table. This keeps{" "}
                                <b>referential integrity</b>.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <pre className="code">
                                    {`orders.user_id REFERENCES users(id)`}
                                </pre>
                                <div className="exText">
                                    An order must belong to a valid user. You
                                    cannot set user_id to a non-existing user.
                                </div>
                            </div>

                            <p className="note">
                                Deleting parent rows can affect child rows,
                                often controlled by ON DELETE rules like CASCADE
                                or SET NULL.
                            </p>
                        </div>

                        {/* CHECK */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCheckCircle />
                                </span>
                                <h3 className="h3">CHECK</h3>
                            </div>

                            <p className="p">
                                <b>CHECK</b> enforces a condition on values. If
                                the condition fails, the insert or update is
                                rejected.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <pre className="code">
                                    {`age INT CHECK (age >= 0 AND age <= 120)`}
                                </pre>
                                <div className="exText">
                                    Age must stay in a valid range.
                                </div>
                            </div>

                            <p className="note">
                                CHECK is great for domain rules like "price
                                &gt;= 0" or "status in ('pending','paid')".
                            </p>
                        </div>

                        {/* DEFAULT */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiSliders />
                                </span>
                                <h3 className="h3">DEFAULT</h3>
                            </div>

                            <p className="p">
                                <b>DEFAULT</b> sets a value automatically when
                                no value is provided. It avoids NULLs and makes
                                inserts easier.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <pre className="code">
                                    {`status VARCHAR(20) DEFAULT 'active'`}
                                </pre>
                                <div className="exText">
                                    If status is not given, it becomes "active".
                                </div>
                            </div>

                            <p className="note">
                                DEFAULT is used for timestamps, boolean flags,
                                and common initial states.
                            </p>
                        </div>

                        {/* Quick comparison */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">Quick comparison</h3>
                            </div>

                            <div className="table">
                                <div className="tRow head">
                                    <div>Constraint</div>
                                    <div>What it prevents</div>
                                    <div>Simple use case</div>
                                </div>

                                <div className="tRow">
                                    <div>NOT NULL</div>
                                    <div>Missing values</div>
                                    <div>name, created_at</div>
                                </div>

                                <div className="tRow">
                                    <div>UNIQUE</div>
                                    <div>Duplicate values</div>
                                    <div>email, phone</div>
                                </div>

                                <div className="tRow">
                                    <div>PRIMARY KEY</div>
                                    <div>Duplicate or NULL identity</div>
                                    <div>id</div>
                                </div>

                                <div className="tRow">
                                    <div>FOREIGN KEY</div>
                                    <div>Invalid references</div>
                                    <div>orders.user_id</div>
                                </div>

                                <div className="tRow">
                                    <div>CHECK</div>
                                    <div>Invalid domain values</div>
                                    <div>price &gt;= 0</div>
                                </div>

                                <div className="tRow">
                                    <div>DEFAULT</div>
                                    <div>Empty initial state</div>
                                    <div>status = 'active'</div>
                                </div>
                            </div>

                            <p className="note">
                                Interview line: constraints are the database
                                side validation layer, they protect data even if
                                app code has bugs.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiShield />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                PRIMARY KEY identifies, FOREIGN KEY connects,
                                UNIQUE avoids duplicates, NOT NULL avoids
                                missing, CHECK enforces rules, DEFAULT fills
                                missing values.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default Constraints;

