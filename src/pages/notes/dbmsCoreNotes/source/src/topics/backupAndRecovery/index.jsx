// src/topics/backupAndRecovery/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiHardDrive,
    FiRefreshCw,
    FiFileText,
    FiCheckCircle,
    FiAlertTriangle,
    FiClock,
} from "react-icons/fi";

const BackupAndRecovery = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "backupAndRecovery",
            title: "Backup and Recovery",
            sub: "Full, incremental, differential backups, crash recovery, logs, and checkpoints.",
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
                        <FiHardDrive />
                    </span>

                    <div className="text">
                        <div className="titleRow">
                            <h2 className="title">{meta.title}</h2>
                            <span className="badge">Safety</span>
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
                        {/* Why backups exist */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiAlertTriangle />
                                </span>
                                <h3 className="h3">
                                    Why backup and recovery matter
                                </h3>
                            </div>

                            <p className="p">
                                Backups protect you from <b>human mistakes</b>{" "}
                                (accidental delete),
                                <b>hardware failures</b>, <b>software bugs</b>,
                                and <b>crashes</b>. Recovery is the process of
                                bringing the database back to a correct state.
                            </p>

                            <div className="mini">
                                <span className="pill">Backup</span>
                                <span className="dash">-</span>
                                <span className="pill">Restore</span>
                                <span className="dash">-</span>
                                <span className="pill">Replay logs</span>
                                <span className="dash">-</span>
                                <span className="pill">Consistent state</span>
                            </div>

                            <p className="note">
                                Backups give you a base copy. Logs help you
                                recover the latest committed changes.
                            </p>
                        </div>

                        {/* Backup types */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFileText />
                                </span>
                                <h3 className="h3">Backup types</h3>
                            </div>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Full backup</div>
                                    <div className="v">
                                        Takes a complete copy of the database at
                                        a point in time.
                                        <span className="small">
                                            Pros: simplest restore - Cons:
                                            slower and larger size
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Incremental backup</div>
                                    <div className="v">
                                        Backs up only the data changed since the{" "}
                                        <b>last backup</b> (full or
                                        incremental).
                                        <span className="small">
                                            Pros: fast and small - Cons: restore
                                            needs full + all incrementals
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Differential backup</div>
                                    <div className="v">
                                        Backs up only the data changed since the{" "}
                                        <b>last full backup</b>.
                                        <span className="small">
                                            Pros: restore needs full + latest
                                            differential - Cons: grows bigger
                                            over time
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="compare">
                                <div className="row head">
                                    <div>Type</div>
                                    <div>Restore requirement</div>
                                </div>

                                <div className="row">
                                    <div>Full</div>
                                    <div>Restore the full backup</div>
                                </div>

                                <div className="row">
                                    <div>Incremental</div>
                                    <div>Full + every incremental in order</div>
                                </div>

                                <div className="row">
                                    <div>Differential</div>
                                    <div>Full + latest differential</div>
                                </div>
                            </div>

                            <p className="note">
                                Simple interview line: Incremental is smaller
                                but restore is longer. Differential is larger
                                but restore is simpler.
                            </p>
                        </div>

                        {/* Crash recovery */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiRefreshCw />
                                </span>
                                <h3 className="h3">Crash recovery</h3>
                            </div>

                            <p className="p">
                                <b>Crash recovery</b> means restoring the
                                database to a correct state after a crash like
                                power loss or server restart.
                            </p>

                            <ul className="list">
                                <li>
                                    Ensure <b>committed</b> transactions are not
                                    lost
                                </li>
                                <li>
                                    Undo <b>uncommitted</b> transactions to
                                    avoid partial updates
                                </li>
                                <li>
                                    Bring database back to a consistent state
                                </li>
                            </ul>

                            <p className="note">
                                Recovery is mainly about redo committed work and
                                undo incomplete work.
                            </p>
                        </div>

                        {/* Log-based recovery */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFileText />
                                </span>
                                <h3 className="h3">Log-based recovery</h3>
                            </div>

                            <p className="p">
                                <b>Log-based recovery</b> uses a log file that
                                records changes made by transactions. The log is
                                used to <b>redo</b> or <b>undo</b> operations
                                during recovery.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Redo</div>
                                    <div className="v">
                                        Re-apply changes of committed
                                        transactions if they were not written to
                                        disk.
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Undo</div>
                                    <div className="v">
                                        Roll back changes of uncommitted
                                        transactions to remove partial updates.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Logs are usually written before data pages. That
                                rule is called WAL.
                            </p>
                        </div>

                        {/* Checkpoints */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiCheckCircle />
                                </span>
                                <h3 className="h3">Checkpoints</h3>
                            </div>

                            <p className="p">
                                A <b>checkpoint</b> is a marker that says "up to
                                this point, the database has flushed enough info
                                to make recovery faster". It reduces how far
                                back the DBMS must scan the log after a crash.
                            </p>

                            <div className="mini">
                                <span className="pill">Log grows</span>
                                <span className="dash">-</span>
                                <span className="pill">Checkpoint</span>
                                <span className="dash">-</span>
                                <span className="pill">Less redo work</span>
                                <span className="dash">-</span>
                                <span className="pill">Faster restart</span>
                            </div>

                            <ul className="list">
                                <li>
                                    Checkpoints write a safe recovery point into
                                    the log
                                </li>
                                <li>DBMS flushes some dirty pages to disk</li>
                                <li>
                                    Recovery scans logs mainly after the last
                                    checkpoint
                                </li>
                            </ul>

                            <p className="note">
                                Without checkpoints, recovery may need to scan a
                                huge log, slowing restart.
                            </p>
                        </div>

                        {/* Quick scenario */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiClock />
                                </span>
                                <h3 className="h3">
                                    Quick scenario you can say in interviews
                                </h3>
                            </div>

                            <div className="scenario">
                                <div className="step">
                                    <div className="num">1</div>
                                    <div className="txt">
                                        Restore latest <b>full backup</b>
                                    </div>
                                </div>

                                <div className="step">
                                    <div className="num">2</div>
                                    <div className="txt">
                                        Apply <b>latest differential</b> or all{" "}
                                        <b>incrementals</b>
                                    </div>
                                </div>

                                <div className="step">
                                    <div className="num">3</div>
                                    <div className="txt">
                                        Use <b>logs</b> to redo committed and
                                        undo uncommitted work
                                    </div>
                                </div>

                                <div className="step">
                                    <div className="num">4</div>
                                    <div className="txt">
                                        Checkpoint helps by cutting log scan
                                        time
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiHardDrive />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                Full is base copy. Incremental is since last
                                backup. Differential is since last full. Logs do
                                redo and undo. Checkpoints speed recovery.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default BackupAndRecovery;

