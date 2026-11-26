// src/topics/normalization/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLayers,
    FiAlertTriangle,
    FiRepeat,
    FiGitBranch,
    FiGrid,
} from "react-icons/fi";

const Normalization = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "normalization",
            title: "Normalization",
            sub: "Redundancy, anomalies, functional dependency, 1NF to BCNF, and when denormalization makes sense.",
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
                        <FiLayers />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Design</span>
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
                        {/* What is normalization */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Normalization</h3>
                            </div>

                            <p className="p">
                                <b>Normalization</b> is a database design
                                process that organizes tables to reduce
                                duplication and avoid update bugs. It uses rules
                                called <b>normal forms</b>.
                            </p>

                            <div className="mini">
                                <span className="pill">Less redundancy</span>
                                <span className="dash">-</span>
                                <span className="pill">More consistency</span>
                                <span className="dash">-</span>
                                <span className="pill">Cleaner schema</span>
                            </div>

                            <p className="note">
                                Normalization helps data correctness.
                                Performance can be handled later using indexes
                                and careful queries.
                            </p>
                        </div>

                        {/* Redundancy */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiRepeat />
                                </span>
                                <h3 className="h3">Redundancy</h3>
                            </div>

                            <p className="p">
                                <b>Redundancy</b> means storing the same
                                information multiple times in different rows.
                                This increases storage and creates mismatch
                                risk.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="monoBox">
                                    In an Orders table, repeating
                                    customerAddress in every order row.
                                </div>
                            </div>

                            <p className="note">
                                Redundancy is not always evil, but uncontrolled
                                redundancy causes anomalies.
                            </p>
                        </div>

                        {/* Anomalies */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiAlertTriangle />
                                </span>
                                <h3 className="h3">Anomalies</h3>
                            </div>

                            <p className="p">
                                <b>Anomalies</b> are update problems caused by
                                redundancy. These are common in poorly designed
                                tables.
                            </p>

                            <div className="tri">
                                <div className="triCard">
                                    <div className="triTitle">
                                        Insertion anomaly
                                    </div>
                                    <div className="triText">
                                        You cannot add a fact because another
                                        fact is missing.
                                        <span className="small">
                                            Example: cannot add a new customer
                                            until they place an order.
                                        </span>
                                    </div>
                                </div>

                                <div className="triCard">
                                    <div className="triTitle">
                                        Update anomaly
                                    </div>
                                    <div className="triText">
                                        Same value exists in multiple rows, you
                                        must update all or data becomes
                                        inconsistent.
                                        <span className="small">
                                            Example: customer phone stored in
                                            many rows, one row updated but
                                            others not.
                                        </span>
                                    </div>
                                </div>

                                <div className="triCard">
                                    <div className="triTitle">
                                        Deletion anomaly
                                    </div>
                                    <div className="triText">
                                        Deleting one row removes more
                                        information than intended.
                                        <span className="small">
                                            Example: delete last order of a
                                            customer and you lose customer
                                            details too.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Normal forms exist mainly to prevent these
                                anomalies.
                            </p>
                        </div>

                        {/* Functional dependency */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitBranch />
                                </span>
                                <h3 className="h3">Functional dependency</h3>
                            </div>

                            <p className="p">
                                <b>Functional dependency (FD)</b> is written as{" "}
                                <b>X -&gt; Y</b>. It means if you know X, you
                                can uniquely determine Y.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Meaning</div>
                                    <div className="v">
                                        For any two rows, if X values match, Y
                                        values must also match.
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Example</div>
                                    <div className="v">
                                        studentId -&gt; studentName
                                        <span className="small">
                                            If studentId is same, name should be
                                            same.
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Why important</div>
                                    <div className="v">
                                        Normalization rules are based on
                                        identifying FDs.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Key idea: a key determines all non-key
                                attributes.
                            </p>
                        </div>

                        {/* Normal forms */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">1NF to BCNF</h3>
                            </div>

                            <div className="nfGrid">
                                <div className="nfCard">
                                    <div className="nfTop">
                                        <div className="nfTitle">
                                            1NF - First Normal Form
                                        </div>
                                        <div className="nfTag">
                                            Atomic values
                                        </div>
                                    </div>
                                    <ul className="list">
                                        <li>No repeating groups</li>
                                        <li>Each column holds single value</li>
                                        <li>Rows are unique</li>
                                    </ul>
                                    <div className="exSmall">
                                        Example: phoneNumbers should not be
                                        "999,888,777" in one cell. Make separate
                                        rows or a new table.
                                    </div>
                                </div>

                                <div className="nfCard">
                                    <div className="nfTop">
                                        <div className="nfTitle">
                                            2NF - Second Normal Form
                                        </div>
                                        <div className="nfTag">
                                            No partial dependency
                                        </div>
                                    </div>
                                    <ul className="list">
                                        <li>Must be in 1NF</li>
                                        <li>
                                            Every non-key attribute depends on
                                            full primary key
                                        </li>
                                    </ul>
                                    <div className="exSmall">
                                        Example: If primary key is (studentId,
                                        courseId), then studentName should not
                                        depend only on studentId.
                                    </div>
                                </div>

                                <div className="nfCard">
                                    <div className="nfTop">
                                        <div className="nfTitle">
                                            3NF - Third Normal Form
                                        </div>
                                        <div className="nfTag">
                                            No transitive dependency
                                        </div>
                                    </div>
                                    <ul className="list">
                                        <li>Must be in 2NF</li>
                                        <li>
                                            Non-key attributes should not depend
                                            on other non-key attributes
                                        </li>
                                    </ul>
                                    <div className="exSmall">
                                        Example: employeeId -&gt; deptId and
                                        deptId -&gt; deptName, then deptName
                                        should not be in employee table.
                                    </div>
                                </div>

                                <div className="nfCard">
                                    <div className="nfTop">
                                        <div className="nfTitle">
                                            BCNF - Boyce Codd Normal Form
                                        </div>
                                        <div className="nfTag">
                                            Stronger 3NF
                                        </div>
                                    </div>
                                    <ul className="list">
                                        <li>
                                            For every FD X -&gt; Y, X must be a
                                            super key
                                        </li>
                                        <li>Fixes some tricky 3NF cases</li>
                                    </ul>
                                    <div className="exSmall">
                                        Example: If instructor -&gt; room
                                        exists, instructor must be a key,
                                        otherwise split tables.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Memory line: 1NF atomic, 2NF full key, 3NF no
                                non-key chain, BCNF every determinant is a key.
                            </p>
                        </div>

                        {/* Denormalization */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiRepeat />
                                </span>
                                <h3 className="h3">Denormalization</h3>
                            </div>

                            <p className="p">
                                <b>Denormalization</b> means intentionally
                                adding some redundancy to improve read
                                performance. It is done after you understand the
                                workload.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">When used</div>
                                    <div className="v">
                                        Heavy read systems, dashboards,
                                        reporting, caching pre-joined data.
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Trade-off</div>
                                    <div className="v">
                                        Faster reads but harder updates and
                                        higher risk of inconsistency.
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Safe approach</div>
                                    <div className="v">
                                        Keep source of truth normalized, use
                                        derived tables or materialized views for
                                        speed.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Rule: normalize for correctness first, then
                                denormalize only if performance demands it.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiLayers />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                Normalization removes redundancy to avoid
                                anomalies. 1NF atomic, 2NF full key, 3NF no
                                transitive, BCNF determinant is a key.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default Normalization;

