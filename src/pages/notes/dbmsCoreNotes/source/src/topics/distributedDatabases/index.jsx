// src/topics/distributedDatabases/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiGlobe,
    FiCopy,
    FiGrid,
    FiShield,
    FiZap,
    FiAlertTriangle,
} from "react-icons/fi";

const DistributedDatabases = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "distributedDatabases",
            title: "Distributed Databases",
            sub: "Replication, sharding, CAP theorem, and why consistency vs availability becomes a trade-off during partitions.",
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
                        <FiGlobe />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Scaling</span>
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
                        {/* Replication */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCopy />
                                </span>
                                <h3 className="h3">Replication</h3>
                            </div>

                            <p className="p">
                                <b>Replication</b> means keeping copies of the
                                same data on multiple machines called{" "}
                                <b>nodes</b>. This improves availability and
                                read performance.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Why</div>
                                    <div className="v">
                                        Higher availability, disaster recovery,
                                        faster reads near users
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Common patterns</div>
                                    <div className="v">
                                        Primary replica - one leader handles
                                        writes, followers copy
                                        <span className="small">
                                            Also called leader follower, primary
                                            secondary, master replica
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Replication is about copying the same dataset to
                                more places.
                            </p>
                        </div>

                        {/* Sharding */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Sharding</h3>
                            </div>

                            <p className="p">
                                <b>Sharding</b> means splitting data into parts
                                called <b>shards</b> and storing each shard on
                                different nodes. This improves write scaling and
                                total storage.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Shard key</div>
                                    <div className="v">
                                        A field used to decide which shard
                                        stores a row
                                        <span className="small">
                                            Example: userId, region, tenantId
                                        </span>
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Goal</div>
                                    <div className="v">
                                        Scale out - more machines = more
                                        capacity
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Replication copies the same data. Sharding
                                splits data across nodes.
                            </p>
                        </div>

                        {/* CAP theorem */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">CAP theorem</h3>
                            </div>

                            <p className="p">
                                <b>CAP theorem</b> says that in a distributed
                                system, when a <b>network partition</b> happens,
                                you must choose between <b>Consistency</b> and{" "}
                                <b>Availability</b>. Partition tolerance is not
                                optional in real distributed networks.
                            </p>

                            <div className="capGrid">
                                <div className="capCard">
                                    <div className="capTop">
                                        <span className="capIcon">
                                            <FiZap />
                                        </span>
                                        <div className="capTitle">
                                            Consistency - C
                                        </div>
                                    </div>
                                    <p className="capText">
                                        Every read returns the latest write or
                                        an error. All nodes behave like one
                                        correct system.
                                    </p>
                                    <div className="capEx">
                                        <div className="capExTitle">
                                            Example
                                        </div>
                                        <div className="capExText">
                                            Bank balance should not show old
                                            values after a transfer.
                                        </div>
                                    </div>
                                </div>

                                <div className="capCard">
                                    <div className="capTop">
                                        <span className="capIcon">
                                            <FiShield />
                                        </span>
                                        <div className="capTitle">
                                            Availability - A
                                        </div>
                                    </div>
                                    <p className="capText">
                                        Every request gets a response, even if
                                        it might be stale. System prefers to
                                        stay online.
                                    </p>
                                    <div className="capEx">
                                        <div className="capExTitle">
                                            Example
                                        </div>
                                        <div className="capExText">
                                            Product catalog can show slightly
                                            old data but must respond fast.
                                        </div>
                                    </div>
                                </div>

                                <div className="capCard">
                                    <div className="capTop">
                                        <span className="capIcon">
                                            <FiAlertTriangle />
                                        </span>
                                        <div className="capTitle">
                                            Partition tolerance - P
                                        </div>
                                    </div>
                                    <p className="capText">
                                        System continues working even if nodes
                                        cannot communicate due to network split.
                                    </p>
                                    <div className="capEx">
                                        <div className="capExTitle">
                                            Example
                                        </div>
                                        <div className="capExText">
                                            Data center A cannot reach data
                                            center B for some time.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="capNote">
                                <div className="capNoteTitle">Key rule</div>
                                <div className="capNoteText">
                                    During a partition, you cannot fully
                                    guarantee both consistency and availability.
                                    You either reject requests to stay
                                    consistent, or respond with possible stale
                                    data to stay available.
                                </div>
                            </div>
                        </div>

                        {/* Eventual consistency */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGlobe />
                                </span>
                                <h3 className="h3">Eventual consistency</h3>
                            </div>

                            <p className="p">
                                <b>Eventual consistency</b> means the system
                                does not guarantee that every read is the latest
                                immediately, but if no new writes happen, all
                                replicas will become consistent after some time.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Why it exists</div>
                                    <div className="v">
                                        It helps availability and performance in
                                        distributed systems.
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">What you may see</div>
                                    <div className="v">
                                        Stale reads for a short time, then
                                        everything matches later.
                                        <span className="small">
                                            Example: you update your profile
                                            photo and some devices show old one
                                            for a while.
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">
                                        How systems reduce pain
                                    </div>
                                    <div className="v">
                                        Read your writes, versioning, conflict
                                        resolution, leader based replication,
                                        quorums
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Eventual consistency is common in many NoSQL
                                systems and geo-distributed setups.
                            </p>
                        </div>

                        {/* Quick comparison */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGrid />
                                </span>
                                <h3 className="h3">Quick compare</h3>
                            </div>

                            <div className="compare">
                                <div className="row head">
                                    <div>Concept</div>
                                    <div>One line meaning</div>
                                </div>

                                <div className="row">
                                    <div>Replication</div>
                                    <div>
                                        Copy the same data to multiple nodes
                                    </div>
                                </div>

                                <div className="row">
                                    <div>Sharding</div>
                                    <div>
                                        Split data into pieces across nodes
                                    </div>
                                </div>

                                <div className="row">
                                    <div>Consistency</div>
                                    <div>
                                        Strong consistency can return the latest
                                        committed value or reject the request;
                                        behavior depends on the system
                                    </div>
                                </div>

                                <div className="row">
                                    <div>Availability</div>
                                    <div>
                                        A non-failed node responds to each
                                        request; during a partition, data may
                                        be stale depending on the system
                                    </div>
                                </div>

                                <div className="row">
                                    <div>Partition tolerance</div>
                                    <div>System survives network splits</div>
                                </div>

                                <div className="row">
                                    <div>Eventual consistency</div>
                                    <div>
                                        All replicas match after some time
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Memory trick: replication duplicates, sharding
                                divides, CAP is the partition trade-off story.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiGlobe />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                Distributed databases scale using replication
                                and sharding. During partitions, choose
                                consistency or availability.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default DistributedDatabases;

