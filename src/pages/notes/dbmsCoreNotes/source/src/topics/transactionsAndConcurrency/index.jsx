// src/topics/transactionsAndConcurrency/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLock,
    FiShuffle,
    FiCheckCircle,
    FiAlertTriangle,
    FiLayers,
    FiGitMerge,
} from "react-icons/fi";

const TransactionsAndConcurrency = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "transactionsAndConcurrency",
            title: "Transactions and Concurrency",
            sub: "Transaction meaning, ACID, concurrency problems, isolation levels, locks, and 2PL in one block.",
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
                        <FiLock />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">ACID + Locks</span>
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
                        {/* Transaction */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitMerge />
                                </span>
                                <h3 className="h3">Transaction</h3>
                            </div>

                            <p className="p">
                                A <b>transaction</b> is a group of database
                                operations that must be treated as one logical
                                unit of work. It either <b>fully happens</b> or
                                <b> does not happen</b>.
                            </p>

                            <div className="mini">
                                <span className="pill">BEGIN</span>
                                <span className="dash">-</span>
                                <span className="pill">READ</span>
                                <span className="dash">-</span>
                                <span className="pill">WRITE</span>
                                <span className="dash">-</span>
                                <span className="pill">COMMIT</span>
                                <span className="dash">-</span>
                                <span className="pill">ROLLBACK</span>
                            </div>

                            <p className="note">
                                Example: transfer money - debit one account and
                                credit another. Both must succeed together.
                            </p>
                        </div>

                        {/* ACID */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCheckCircle />
                                </span>
                                <h3 className="h3">ACID properties</h3>
                            </div>

                            <p className="p">
                                <b>ACID</b> describes guarantees that make
                                transactions reliable in real systems.
                            </p>

                            <ul className="list">
                                <li>
                                    <b>Atomicity</b> - all or nothing
                                </li>
                                <li>
                                    <b>Consistency</b> - rules stay true
                                </li>
                                <li>
                                    <b>Isolation</b> - concurrent work does not
                                    break correctness
                                </li>
                                <li>
                                    <b>Durability</b> - committed changes
                                    survive crashes
                                </li>
                            </ul>
                        </div>

                        {/* Atomicity */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Atomicity</h3>
                            </div>

                            <p className="p">
                                Atomicity means a transaction is indivisible. If
                                any step fails, the DBMS rolls back all changes.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="exText">
                                    Order placed but payment failed - do not
                                    keep partial order state saved as "paid".
                                </div>
                            </div>

                            <p className="note">
                                Rollback is the practical tool that supports
                                atomicity.
                            </p>
                        </div>

                        {/* Consistency */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Consistency</h3>
                            </div>

                            <p className="p">
                                Consistency means the database moves from one
                                valid state to another valid state. Constraints,
                                triggers, and rules must remain satisfied.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Example</div>
                                <div className="exText">
                                    Balance cannot go below 0 if business rule
                                    says no overdraft.
                                </div>
                            </div>

                            <p className="note">
                                Consistency is about correctness rules, not
                                about "same data everywhere".
                            </p>
                        </div>

                        {/* Isolation */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Isolation</h3>
                            </div>

                            <p className="p">
                                Isolation means multiple transactions can run at
                                the same time without interfering in a way that
                                produces wrong results.
                            </p>

                            <div className="ex">
                                <div className="exTitle">Mental model</div>
                                <div className="exText">
                                    Each transaction should behave like it ran
                                    alone, even though it did not.
                                </div>
                            </div>

                            <p className="note">
                                Isolation is controlled using locks, MVCC, and
                                isolation levels.
                            </p>
                        </div>

                        {/* Durability */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Durability</h3>
                            </div>

                            <p className="p">
                                Durability means once a transaction commits, its
                                changes will not be lost even if the system
                                crashes immediately after.
                            </p>

                            <div className="ex">
                                <div className="exTitle">
                                    How it is achieved
                                </div>
                                <div className="exText">
                                    Logging and disk writes, often using WAL -
                                    write-ahead logging.
                                </div>
                            </div>

                            <p className="note">
                                Commit is considered successful only after the
                                DBMS ensures recovery is possible.
                            </p>
                        </div>

                        {/* Concurrency control */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShuffle />
                                </span>
                                <h3 className="h3">Concurrency control</h3>
                            </div>

                            <p className="p">
                                <b>Concurrency control</b> is how DBMS keeps
                                correct results when many users read and write
                                together. Goal is correctness with good
                                performance.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Common approaches</div>
                                    <div className="v">
                                        Locks, timestamps, optimistic control,
                                        MVCC - Multi Version Concurrency
                                        Control.
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Key idea</div>
                                    <div className="v">
                                        Ensure schedules are equivalent to a
                                        correct serial order (serializability).
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Most modern databases use MVCC for reads and
                                locks for writes in some form.
                            </p>
                        </div>

                        {/* Problems */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiAlertTriangle />
                                </span>
                                <h3 className="h3">
                                    Concurrency problems - lost update and read
                                    anomalies
                                </h3>
                            </div>

                            <div className="problems">
                                <div className="prob">
                                    <div className="probTitle">Lost update</div>
                                    <div className="probText">
                                        Two transactions read the same value and
                                        both write back. The later write
                                        overwrites the earlier update.
                                    </div>
                                    <div className="probMini">
                                        T1 reads 100 - T2 reads 100 - T1 writes
                                        120 - T2 writes 110
                                    </div>
                                </div>

                                <div className="prob">
                                    <div className="probTitle">Dirty read</div>
                                    <div className="probText">
                                        A transaction reads data written by
                                        another transaction that has not
                                        committed yet. If the writer rolls back,
                                        the reader used invalid data.
                                    </div>
                                    <div className="probMini">
                                        T1 writes new value - T2 reads it - T1
                                        rollback
                                    </div>
                                </div>

                                <div className="prob">
                                    <div className="probTitle">
                                        Non-repeatable read
                                    </div>
                                    <div className="probText">
                                        A transaction reads the same row twice
                                        and gets different values because
                                        another transaction updated and
                                        committed between the reads.
                                    </div>
                                    <div className="probMini">
                                        T1 reads row - T2 updates and commit -
                                        T1 reads again
                                    </div>
                                </div>

                                <div className="prob">
                                    <div className="probTitle">
                                        Phantom read
                                    </div>
                                    <div className="probText">
                                        A transaction repeats a range query and
                                        finds new rows because another
                                        transaction inserted rows that match the
                                        condition.
                                    </div>
                                    <div className="probMini">
                                        T1 selects where salary &gt; 50k - T2
                                        inserts new matching row - T1 selects
                                        again
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Dirty read is about uncommitted data.
                                Non-repeatable is row changed. Phantom is new
                                rows in a range.
                            </p>
                        </div>

                        {/* Isolation levels */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Isolation levels</h3>
                            </div>

                            <p className="p">
                                Isolation levels define which anomalies are
                                allowed for better performance. Higher isolation
                                means fewer anomalies but more blocking and
                                lower concurrency.
                            </p>

                            <div className="isoTable">
                                <div className="iRow head">
                                    <div>Level</div>
                                    <div>Dirty read</div>
                                    <div>Non-repeatable</div>
                                    <div>Phantom</div>
                                </div>

                                <div className="iRow">
                                    <div className="lvl">Read uncommitted</div>
                                    <div className="bad">Allowed</div>
                                    <div className="bad">Allowed</div>
                                    <div className="bad">Allowed</div>
                                </div>

                                <div className="iRow">
                                    <div className="lvl">Read committed</div>
                                    <div className="good">Blocked</div>
                                    <div className="bad">Allowed</div>
                                    <div className="bad">Allowed</div>
                                </div>

                                <div className="iRow">
                                    <div className="lvl">Repeatable read</div>
                                    <div className="good">Blocked</div>
                                    <div className="good">Blocked</div>
                                    <div className="bad">Sometimes allowed</div>
                                </div>

                                <div className="iRow">
                                    <div className="lvl">Serializable</div>
                                    <div className="good">Blocked</div>
                                    <div className="good">Blocked</div>
                                    <div className="good">Blocked</div>
                                </div>
                            </div>

                            <p className="note">
                                Exact behavior can differ by database engine,
                                but the table is the standard interview model.
                            </p>
                        </div>

                        {/* Locks */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLock />
                                </span>
                                <h3 className="h3">Locks</h3>
                            </div>

                            <p className="p">
                                A <b>lock</b> is a control mechanism that limits
                                access to data while a transaction is working.
                                It prevents conflicting operations.
                            </p>

                            <p className="note">
                                Locks can be on row, page, table, or even range,
                                depending on DBMS.
                            </p>
                        </div>

                        {/* Shared lock */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLock />
                                </span>
                                <h3 className="h3">Shared lock</h3>
                            </div>

                            <p className="p">
                                <b>Shared lock</b> is used for reading. Many
                                transactions can hold shared locks on the same
                                data at the same time.
                            </p>

                            <div className="mini">
                                <span className="pill">Read</span>
                                <span className="dash">-</span>
                                <span className="pill">Many allowed</span>
                            </div>

                            <p className="note">
                                Shared lock blocks writers but not other
                                readers.
                            </p>
                        </div>

                        {/* Exclusive lock */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLock />
                                </span>
                                <h3 className="h3">Exclusive lock</h3>
                            </div>

                            <p className="p">
                                <b>Exclusive lock</b> is used for writing. Only
                                one transaction can hold it. It blocks other
                                reads and writes on the same data.
                            </p>

                            <div className="mini">
                                <span className="pill">Write</span>
                                <span className="dash">-</span>
                                <span className="pill">Only one allowed</span>
                            </div>

                            <p className="note">
                                Exclusive lock ensures no one reads half-updated
                                data.
                            </p>
                        </div>

                        {/* 2PL */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiGitMerge />
                                </span>
                                <h3 className="h3">Two-phase locking - 2PL</h3>
                            </div>

                            <p className="p">
                                <b>2PL</b> means <b>Two-Phase Locking</b>. It is
                                a locking protocol to ensure serializability. A
                                transaction has two phases for locks.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Growing phase</div>
                                    <div className="v">
                                        Transaction can acquire locks but cannot
                                        release any lock.
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Shrinking phase</div>
                                    <div className="v">
                                        Transaction releases locks but cannot
                                        acquire new locks.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                2PL avoids many anomalies, but it can cause
                                deadlocks when transactions wait on each other.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiLock />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                ACID makes transactions reliable. Isolation
                                controls anomalies. Locks and 2PL keep
                                concurrency correct.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default TransactionsAndConcurrency;

