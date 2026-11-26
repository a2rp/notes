// src/topics/erModel/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiGrid,
    FiTag,
    FiKey,
    FiLink,
    FiLayers,
    FiCopy,
    FiBookOpen,
} from "react-icons/fi";

const ErModel = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "erModel",
            title: "ER Model",
            sub: "Entity, attributes, keys, weak entities, relationships, cardinality, participation, and ER to relational mapping rules.",
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
                        {/* Entity */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Entity</h3>
                            </div>

                            <p className="p">
                                An <b>entity</b> is a real-world object or
                                concept that you want to store data about.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Examples</div>
                                <ul className="exList">
                                    <li>Student</li>
                                    <li>Customer</li>
                                    <li>Order</li>
                                    <li>Employee</li>
                                </ul>
                            </div>

                            <p className="note">
                                In relational DBs, entities usually become
                                tables.
                            </p>
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
                                An <b>attribute</b> is a property that describes
                                an entity. Attributes become columns in a table.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <ul className="exList">
                                    <li>
                                        Student has name, rollNo, dob, phone
                                    </li>
                                </ul>
                            </div>

                            <p className="note">
                                Attribute types matter because they change how
                                we map to tables.
                            </p>
                        </div>

                        {/* Attribute types */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiBookOpen />
                                </span>
                                <h3 className="h3">Attribute types</h3>
                            </div>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Simple</div>
                                    <div className="v">
                                        Cannot be broken into smaller parts.
                                        <span className="small">
                                            Example: age, salary, rollNo
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Composite</div>
                                    <div className="v">
                                        Can be broken into sub-parts.
                                        <span className="small">
                                            Example: name -&gt; firstName,
                                            lastName. address -&gt; city, state,
                                            pincode
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Multivalued</div>
                                    <div className="v">
                                        Can have multiple values for a single
                                        entity.
                                        <span className="small">
                                            Example: phoneNumbers, skills,
                                            emailAddresses
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Derived</div>
                                    <div className="v">
                                        Computed from other attributes.
                                        <span className="small">
                                            Example: age derived from
                                            dateOfBirth. totalAmount derived
                                            from orderItems
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Composite attributes often become multiple
                                columns. Multivalued attributes usually become a
                                separate table.
                            </p>
                        </div>

                        {/* Primary key */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiKey />
                                </span>
                                <h3 className="h3">Primary key</h3>
                            </div>

                            <p className="p">
                                A <b>primary key</b> is an attribute or set of
                                attributes that uniquely identifies an entity
                                instance.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Examples</div>
                                <ul className="exList">
                                    <li>
                                        studentId uniquely identifies a student
                                    </li>
                                    <li>
                                        orderId uniquely identifies an order
                                    </li>
                                </ul>
                            </div>

                            <p className="note">
                                Primary key must be unique and not null.
                            </p>
                        </div>

                        {/* Weak entity */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCopy />
                                </span>
                                <h3 className="h3">Weak entity</h3>
                            </div>

                            <p className="p">
                                A <b>weak entity</b> cannot be uniquely
                                identified by its own attributes alone. It
                                depends on an owner (strong entity) for
                                identification.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <ul className="exList">
                                    <li>
                                        Dependent depends on Employee. Dependent
                                        is identified by (employeeId,
                                        dependentName).
                                    </li>
                                </ul>
                            </div>

                            <p className="note">
                                Weak entity typically uses a composite primary
                                key including owner key.
                            </p>
                        </div>

                        {/* Relationship */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLink />
                                </span>
                                <h3 className="h3">Relationship</h3>
                            </div>

                            <p className="p">
                                A <b>relationship</b> describes how two or more
                                entities are connected. It can also have its own
                                attributes.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Examples</div>
                                <ul className="exList">
                                    <li>Student enrolls in Course</li>
                                    <li>Customer places Order</li>
                                    <li>Employee works in Department</li>
                                </ul>
                            </div>

                            <p className="note">
                                Many-to-many relationships usually become a
                                separate table.
                            </p>
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
                                <b>Cardinality</b> defines how many instances of
                                one entity can be associated with instances of
                                another entity.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">1:1</div>
                                    <div className="v">
                                        One to one
                                        <span className="small">
                                            Example: Person - Passport (one
                                            person has one passport)
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">1:N</div>
                                    <div className="v">
                                        One to many
                                        <span className="small">
                                            Example: Department - Employees (one
                                            department has many employees)
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">M:N</div>
                                    <div className="v">
                                        Many to many
                                        <span className="small">
                                            Example: Students - Courses (many
                                            students take many courses)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Participation */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Participation</h3>
                            </div>

                            <p className="p">
                                <b>Participation</b> tells whether an entity
                                must be part of a relationship or not.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Total participation</div>
                                    <div className="v">
                                        Every entity instance must participate.
                                        <span className="small">
                                            Example: Every Order must be placed
                                            by a Customer.
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">
                                        Partial participation
                                    </div>
                                    <div className="v">
                                        Participation is optional for some
                                        instances.
                                        <span className="small">
                                            Example: A Customer may have zero
                                            Orders.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Total means mandatory. Partial means optional.
                            </p>
                        </div>

                        {/* ER to relational mapping rules */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiBookOpen />
                                </span>
                                <h3 className="h3">
                                    ER to relational mapping rules
                                </h3>
                            </div>

                            <div className="mapRules">
                                <div className="mRow head">
                                    <div className="c1">ER concept</div>
                                    <div className="c2">Relational mapping</div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">Strong entity</div>
                                    <div className="c2">
                                        Create a table with columns for
                                        attributes. Choose primary key.
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">
                                        Composite attribute
                                    </div>
                                    <div className="c2">
                                        Break into multiple columns (address
                                        -&gt; city, state, pincode).
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">
                                        Multivalued attribute
                                    </div>
                                    <div className="c2">
                                        Create a separate table with (ownerPK,
                                        attributeValue).
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">Derived attribute</div>
                                    <div className="c2">
                                        Usually not stored, computed when needed
                                        (age from dob).
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">1:1 relationship</div>
                                    <div className="c2">
                                        Put a foreign key in one table. Prefer
                                        FK on total participation side. Add
                                        unique constraint.
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">1:N relationship</div>
                                    <div className="c2">
                                        Put foreign key of "1 side" into "N
                                        side" table.
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">M:N relationship</div>
                                    <div className="c2">
                                        Create a new table with both primary
                                        keys as foreign keys, plus relationship
                                        attributes.
                                    </div>
                                </div>

                                <div className="mRow">
                                    <div className="c1">Weak entity</div>
                                    <div className="c2">
                                        Create a table with owner PK as FK.
                                        Primary key is (ownerPK + partialKey).
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Shortcut memory: 1:N -&gt; FK on N side. M:N
                                -&gt; new table. Multivalued -&gt; new table.
                                Composite -&gt; split columns.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiGrid />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                ER model is your blueprint. Entities become
                                tables. Relationships decide where foreign keys
                                go.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default ErModel;

