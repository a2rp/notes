// src/topics/storageAndArchitecture/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiHardDrive,
    FiLayers,
    FiInbox,
    FiFileText,
    FiClipboard,
    FiShield,
} from "react-icons/fi";

const StorageAndArchitecture = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "storageAndArchitecture",
            title: "Storage and Architecture",
            sub: "Disk basics, pages and blocks, buffer pool, record storage, files, logs, and WAL.",
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
                            <span className="badge">Engine basics</span>
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
                        {/* Disk storage basics */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiHardDrive />
                                </span>
                                <h3 className="h3">Disk storage basics</h3>
                            </div>

                            <p className="p">
                                Databases store data on{" "}
                                <b>persistent storage</b>
                                like SSD or HDD so it survives restarts. Disk is
                                much slower than RAM, so databases try to do
                                fewer disk reads and writes.
                            </p>

                            <ul className="list">
                                <li>
                                    <b>RAM</b> - very fast, but data is lost on
                                    power off
                                </li>
                                <li>
                                    <b>Disk</b> - slower, but data stays safe
                                    after restart
                                </li>
                                <li>
                                    DB engines batch writes and use caching to
                                    reduce disk access
                                </li>
                            </ul>

                            <p className="note">
                                Simple mental model: disk is safe but slow,
                                memory is fast but temporary.
                            </p>
                        </div>

                        {/* Pages and blocks */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLayers />
                                </span>
                                <h3 className="h3">Pages and blocks</h3>
                            </div>

                            <p className="p">
                                Databases do not read single rows directly from
                                disk. They read fixed-size chunks called{" "}
                                <b>pages</b>. On disk, these chunks are often
                                called <b>blocks</b>.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Page</div>
                                    <div className="v">
                                        Fixed-size unit of storage used by the
                                        DB engine.
                                        <span className="small">
                                            Example sizes: 4KB, 8KB, 16KB
                                            depending on DB
                                        </span>
                                    </div>
                                </div>

                                <div className="kv">
                                    <div className="k">Block</div>
                                    <div className="v">
                                        Disk level term for a chunk of data.
                                        Often maps closely to a page.
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                If one row is needed, the whole page containing
                                that row is loaded into memory.
                            </p>
                        </div>

                        {/* Buffer pool */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiInbox />
                                </span>
                                <h3 className="h3">Buffer pool</h3>
                            </div>

                            <p className="p">
                                The <b>buffer pool</b> is a memory area where
                                the DB keeps recently used pages. It is
                                basically the database cache.
                            </p>

                            <ul className="list">
                                <li>
                                    If a needed page is in buffer pool, it is a{" "}
                                    <b>cache hit</b>
                                </li>
                                <li>
                                    If not, it is a <b>cache miss</b> and DB
                                    reads from disk
                                </li>
                                <li>
                                    When buffer pool is full, DB evicts old
                                    pages using a policy like LRU style
                                </li>
                            </ul>

                            <p className="note">
                                Bigger buffer pool usually means fewer disk
                                reads and faster queries.
                            </p>
                        </div>

                        {/* Record storage */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFileText />
                                </span>
                                <h3 className="h3">Record storage</h3>
                            </div>

                            <p className="p">
                                A <b>record</b> is a stored row of a table.
                                Inside a page, records are stored with metadata
                                so the DB can find them quickly.
                            </p>

                            <ul className="list">
                                <li>
                                    Rows may have fixed-length and
                                    variable-length fields
                                </li>
                                <li>
                                    Pages often maintain a slot directory to
                                    locate records
                                </li>
                                <li>
                                    Updates can create fragmentation, DB may
                                    reorganize pages
                                </li>
                            </ul>

                            <p className="note">
                                You do not need page internals for interviews,
                                just know records live inside pages.
                            </p>
                        </div>

                        {/* Heap file */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiClipboard />
                                </span>
                                <h3 className="h3">Heap file</h3>
                            </div>

                            <p className="p">
                                A <b>heap file</b> stores records in no specific
                                order. New records are placed wherever space is
                                available.
                            </p>

                            <ul className="list">
                                <li>Fast inserts</li>
                                <li>Search can be slow without an index</li>
                                <li>Common base storage method for tables</li>
                            </ul>

                            <p className="note">
                                Heap does not mean heap memory. It just means
                                unordered file storage.
                            </p>
                        </div>

                        {/* Sequential file */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiClipboard />
                                </span>
                                <h3 className="h3">Sequential file</h3>
                            </div>

                            <p className="p">
                                A <b>sequential file</b> stores records in a
                                sorted order based on a key like an id or
                                timestamp.
                            </p>

                            <ul className="list">
                                <li>
                                    Good for range queries and ordered scanning
                                </li>
                                <li>
                                    Insert and delete can be slower because
                                    order must be maintained
                                </li>
                                <li>
                                    Often used for logs or data files designed
                                    for sequential reads
                                </li>
                            </ul>

                            <p className="note">
                                Think: sequential is scan-friendly, heap is
                                insert-friendly.
                            </p>
                        </div>

                        {/* Log file */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiFileText />
                                </span>
                                <h3 className="h3">Log file</h3>
                            </div>

                            <p className="p">
                                A <b>log file</b> records changes made by
                                transactions. It is used for crash recovery to
                                restore a consistent state. Logs are usually
                                written sequentially, which is fast on disk.
                            </p>

                            <div className="compare">
                                <div className="row head">
                                    <div>Data file</div>
                                    <div>Log file</div>
                                </div>

                                <div className="row">
                                    <div>
                                        Stores actual table data pages and index
                                        pages
                                    </div>
                                    <div>
                                        Stores change history and transaction
                                        actions
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        Random reads and writes based on queries
                                    </div>
                                    <div>Mostly sequential writes</div>
                                </div>

                                <div className="row">
                                    <div>Used for normal query reads</div>
                                    <div>
                                        Used mainly for recovery and durability
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Logging is a key reason databases can recover
                                after a crash without losing committed
                                transactions.
                            </p>
                        </div>

                        {/* WAL */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">
                                    Write-ahead logging - WAL
                                </h3>
                            </div>

                            <p className="p">
                                <b>WAL</b> means <b>Write-Ahead Logging</b>.
                                Rule: write the log record to disk before
                                writing the data page to disk. This ensures
                                durability and correct recovery.
                            </p>

                            <div className="steps">
                                <div className="step">
                                    <div className="n">1</div>
                                    <div className="t">
                                        Transaction updates a row in memory
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="n">2</div>
                                    <div className="t">
                                        DB writes the change into the log file
                                        on disk
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="n">3</div>
                                    <div className="t">
                                        Later, DB writes the actual data page to
                                        disk
                                    </div>
                                </div>
                                <div className="step">
                                    <div className="n">4</div>
                                    <div className="t">
                                        On crash, DB replays logs to redo
                                        committed changes and undo incomplete
                                        ones
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                WAL makes commits reliable even if data pages
                                are flushed later.
                            </p>
                        </div>
                    </div>

                    <div className="bottomNote">
                        <div className="bnIcon">
                            <FiHardDrive />
                        </div>
                        <div className="bnText">
                            <div className="bnTitle">Quick memory</div>
                            <div className="bnSub">
                                Disk stores pages. Buffer pool caches pages.
                                Logs record changes. WAL means log first, data
                                later.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default StorageAndArchitecture;

