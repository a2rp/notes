// src/topics/relationalModel/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiGrid,
    FiHash,
    FiKey,
    FiTag,
    FiLayers,
    FiLink,
} from "react-icons/fi";

const RelationalModel = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "relationalModel",
            title: "Relational Model",
            sub: "Relation, tuple, attribute, domain, degree, cardinality, and the full key family used in RDBMS.",
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
                        <FiGrid />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Tables and Keys</span>
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
                        {/* Relation */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Relation</h3>
                            </div>

                            <p className="p">
                                A <b>relation</b> is a table in the relational
                                model. It stores data as rows and columns.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="code">
                                    STUDENT(studentId, name, email)
                                </div>
                            </div>

                            <p className="note">
                                Relation name is like the table name, and
                                attributes are the column names.
                            </p>
                        </div>

                        {/* Tuple */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Tuple</h3>
                            </div>

                            <p className="p">
                                A <b>tuple</b> is a single row in a relation. It
                                represents one record.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example row</div>
                                <div className="code">
                                    (101, "Ashish", "ash@example.com")
                                </div>
                            </div>
                        </div>

                        {/* Attribute */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiTag />
                                </span>
                                <h3 className="h3">Attribute</h3>
                            </div>

                            <p className="p">
                                An <b>attribute</b> is a column in a table. It
                                describes a property of the entity.
                            </p>

                            <div className="mini">
                                <span className="pill">studentId</span>
                                <span className="dash">-</span>
                                <span className="pill">name</span>
                                <span className="dash">-</span>
                                <span className="pill">email</span>
                            </div>

                            <p className="note">
                                Attribute values come from a defined domain.
                            </p>
                        </div>

                        {/* Domain */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiHash />
                                </span>
                                <h3 className="h3">Domain</h3>
                            </div>

                            <p className="p">
                                A <b>domain</b> is the allowed set of values for
                                an attribute. It defines type and constraints.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Example</div>
                                    <div className="v">
                                        age domain could be 0 to 120
                                        <span className="small">
                                            integer values only
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Example</div>
                                    <div className="v">
                                        email domain could be valid email
                                        strings
                                        <span className="small">
                                            must contain "@"
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Domain helps ensure data correctness at the
                                attribute level.
                            </p>
                        </div>

                        {/* Degree */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Degree</h3>
                            </div>

                            <p className="p">
                                <b>Degree</b> is the number of attributes
                                (columns) in a relation.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="code">
                                    STUDENT(studentId, name, email) - degree is
                                    3
                                </div>
                            </div>
                        </div>

                        {/* Cardinality */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Cardinality</h3>
                            </div>

                            <p className="p">
                                <b>Cardinality</b> is the number of tuples
                                (rows) in a relation.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="code">
                                    STUDENT has 500 rows - cardinality is 500
                                </div>
                            </div>

                            <p className="note">
                                Do not confuse this with ER diagram cardinality
                                like 1:N. Here it means row count.
                            </p>
                        </div>

                        {/* Keys overview */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiKey />
                                </span>
                                <h3 className="h3">Keys in DBMS</h3>
                            </div>

                            <p className="p">
                                A <b>key</b> is a set of attributes that
                                identifies a tuple uniquely or helps connect
                                tables correctly. Different keys serve different
                                purposes.
                            </p>

                            <div className="keysGrid">
                                <div className="kCard">
                                    <div className="kTitle">
                                        <span className="kIcon">
                                            <FiKey />
                                        </span>
                                        Super key
                                    </div>
                                    <div className="kBody">
                                        Any attribute set that uniquely
                                        identifies a row. It can include extra
                                        attributes.
                                        <div className="kEx">
                                            Example: (studentId) or (studentId,
                                            email)
                                        </div>
                                    </div>
                                </div>

                                <div className="kCard">
                                    <div className="kTitle">
                                        <span className="kIcon">
                                            <FiKey />
                                        </span>
                                        Candidate key
                                    </div>
                                    <div className="kBody">
                                        Minimal super key. No extra attributes.
                                        There can be multiple candidate keys.
                                        <div className="kEx">
                                            Example: (studentId) and (email) if
                                            both are unique
                                        </div>
                                    </div>
                                </div>

                                <div className="kCard">
                                    <div className="kTitle">
                                        <span className="kIcon">
                                            <FiKey />
                                        </span>
                                        Primary key
                                    </div>
                                    <div className="kBody">
                                        One selected candidate key used as main
                                        identifier. It cannot be NULL and should
                                        be stable.
                                        <div className="kEx">
                                            Example: studentId
                                        </div>
                                    </div>
                                </div>

                                <div className="kCard">
                                    <div className="kTitle">
                                        <span className="kIcon">
                                            <FiKey />
                                        </span>
                                        Alternate key
                                    </div>
                                    <div className="kBody">
                                        Candidate keys not chosen as primary
                                        key. Still unique.
                                        <div className="kEx">
                                            Example: email
                                        </div>
                                    </div>
                                </div>

                                <div className="kCard">
                                    <div className="kTitle">
                                        <span className="kIcon">
                                            <FiLink />
                                        </span>
                                        Foreign key
                                    </div>
                                    <div className="kBody">
                                        Attribute in one table that references
                                        primary key of another table. It builds
                                        relationships.
                                        <div className="kEx">
                                            Example: ENROLLMENT.studentId
                                            references STUDENT.studentId
                                        </div>
                                    </div>
                                </div>

                                <div className="kCard">
                                    <div className="kTitle">
                                        <span className="kIcon">
                                            <FiLayers />
                                        </span>
                                        Composite key
                                    </div>
                                    <div className="kBody">
                                        Key made of 2 or more attributes. Used
                                        when one attribute is not enough.
                                        <div className="kEx">
                                            Example: (studentId, courseId) in
                                            ENROLLMENT
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Memory: super key identifies, candidate key is
                                minimal, primary key is chosen, alternate key is
                                remaining, foreign key links, composite key is
                                multi-column.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiKey />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                Degree is columns, cardinality is rows.
                                Candidate keys are minimal unique sets, and one
                                becomes primary key.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default RelationalModel;

