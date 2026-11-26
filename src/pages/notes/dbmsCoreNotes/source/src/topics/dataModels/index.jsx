// src/topics/dataModels/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLayers,
    FiGitMerge,
    FiGrid,
    FiBox,
    FiShare2,
} from "react-icons/fi";

const DataModels = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "dataModels",
            title: "Data Models",
            sub: "Meaning of data model and the major types - hierarchical, network, relational, object-oriented, and ER model.",
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
                            <span className="badge">Models</span>
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
                        {/* Meaning */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Data model meaning</h3>
                            </div>

                            <p className="p">
                                A <b>data model</b> is a structured way to
                                describe how data is organized, related, stored,
                                and accessed. It defines the rules for data
                                structure and relationships so systems and
                                humans can understand the same data design.
                            </p>

                            <div className="mini">
                                <span className="pill">Structure</span>
                                <span className="dash">-</span>
                                <span className="pill">Relationships</span>
                                <span className="dash">-</span>
                                <span className="pill">Constraints</span>
                                <span className="dash">-</span>
                                <span className="pill">Operations</span>
                            </div>

                            <p className="note">
                                Example: In a shopping app, customers place
                                orders. Orders contain items. A data model
                                decides how these are represented and linked.
                            </p>
                        </div>

                        {/* Hierarchical */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Hierarchical model</h3>
                            </div>

                            <p className="p">
                                Data is organized like a <b>tree</b>. One parent
                                can have many children, but each child has only
                                one parent.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Mental model</div>
                                <div className="mono">
                                    Company - Department - Employee
                                </div>
                            </div>

                            <ul className="list">
                                <li>Good for strict 1-to-many relationships</li>
                                <li>
                                    Hard when you need many-to-many
                                    relationships
                                </li>
                            </ul>

                            <p className="note">
                                Think "folder structure" style data.
                            </p>
                        </div>

                        {/* Network model */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShare2 />
                                </span>
                                <h3 className="h3">Network model</h3>
                            </div>

                            <p className="p">
                                Data is organized as a <b>graph</b>. A record
                                can have multiple parents and multiple children.
                                This supports many-to-many naturally.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Mental model</div>
                                <div className="mono">
                                    Student - EnrolledIn - Course
                                </div>
                            </div>

                            <ul className="list">
                                <li>Handles complex relationships well</li>
                                <li>
                                    More complex to design and query than
                                    relational
                                </li>
                            </ul>

                            <p className="note">
                                Think "connected nodes" style data.
                            </p>
                        </div>

                        {/* Relational */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Relational model</h3>
                            </div>

                            <p className="p">
                                Data is stored in <b>tables</b> (relations).
                                Rows are tuples and columns are attributes.
                                Relationships are formed using keys.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example tables</div>
                                <ul className="exList">
                                    <li>customers(customerId, name)</li>
                                    <li>orders(orderId, customerId, total)</li>
                                </ul>
                            </div>

                            <ul className="list">
                                <li>Most popular model used in real systems</li>
                                <li>SQL makes queries powerful and standard</li>
                            </ul>

                            <p className="note">
                                Relationships are typically built using foreign
                                keys.
                            </p>
                        </div>

                        {/* Object-oriented */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiBox />
                                </span>
                                <h3 className="h3">Object-oriented model</h3>
                            </div>

                            <p className="p">
                                Data is stored as <b>objects</b> similar to OOP.
                                Objects contain both data and behavior. It fits
                                naturally with languages that use classes.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="mono">
                                    class Order {"{"} items, total, place(){" "}
                                    {"}"}
                                </div>
                            </div>

                            <ul className="list">
                                <li>
                                    Useful for complex data like CAD,
                                    multimedia, simulations
                                </li>
                                <li>
                                    Less common than relational in typical
                                    business apps
                                </li>
                            </ul>

                            <p className="note">
                                Object relational mapping tries to bridge OOP
                                and relational DBs.
                            </p>
                        </div>

                        {/* ER model */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitMerge />
                                </span>
                                <h3 className="h3">
                                    Entity-Relationship model - ER model basics
                                </h3>
                            </div>

                            <p className="p">
                                <b>ER model</b> is a conceptual model used to
                                design a database before writing tables. It uses
                                <b>entities</b>, <b>attributes</b>, and
                                <b>relationships</b> to represent real-world
                                data.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Entity</div>
                                    <div className="v">
                                        A real-world object or concept.
                                        <span className="small">
                                            Example: Student, Customer, Product
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Attribute</div>
                                    <div className="v">
                                        Properties of an entity.
                                        <span className="small">
                                            Example: Student has name, rollNo
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Relationship</div>
                                    <div className="v">
                                        How entities are connected.
                                        <span className="small">
                                            Example: Customer places Order
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                ER model helps you get the logic correct first,
                                then you convert it into tables.
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
                                Hierarchical is tree, network is graph,
                                relational is tables, object-oriented is
                                objects, ER is design blueprint.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default DataModels;

