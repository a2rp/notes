// src/topics/securityInDbms/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiShield,
    FiLock,
    FiKey,
    FiUsers,
    FiDatabase,
    FiAlertTriangle,
} from "react-icons/fi";

const SecurityInDbms = () => {
    // default collapsed
    const [open, setOpen] = useState(true);

    const meta = useMemo(() => {
        return {
            id: "securityInDbms",
            title: "Security in DBMS",
            sub: "Authentication, authorization, roles, encryption at rest and in transit, and SQL injection basics.",
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
                            <span className="badge">Must know</span>
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
                        {/* Authentication */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiKey />
                                </span>
                                <h3 className="h3">Authentication</h3>
                            </div>

                            <p className="p">
                                <b>Authentication</b> means verifying identity.
                                DBMS checks "who you are" before allowing
                                access.
                            </p>

                            <ul className="list">
                                <li>
                                    Common methods - password, certificate,
                                    token, SSO (Single Sign-On)
                                </li>
                                <li>
                                    Good practice - strong passwords, rotate
                                    credentials, use MFA (Multi-Factor
                                    Authentication)
                                </li>
                            </ul>

                            <p className="note">
                                Memory: authentication is identity proof.
                            </p>
                        </div>

                        {/* Authorization */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiLock />
                                </span>
                                <h3 className="h3">Authorization</h3>
                            </div>

                            <p className="p">
                                <b>Authorization</b> means permissions. DBMS
                                decides "what you can do" after you are
                                authenticated.
                            </p>

                            <div className="mini">
                                <span className="pill">READ</span>
                                <span className="dash">-</span>
                                <span className="pill">WRITE</span>
                                <span className="dash">-</span>
                                <span className="pill">ADMIN</span>
                            </div>

                            <p className="note">
                                Memory: authorization is allowed actions.
                            </p>
                        </div>

                        {/* Roles */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiUsers />
                                </span>
                                <h3 className="h3">Roles</h3>
                            </div>

                            <p className="p">
                                A <b>role</b> is a named set of permissions.
                                Instead of giving permissions to each user one
                                by one, assign a role to a user.
                            </p>

                            <div className="kvs">
                                <div className="kv">
                                    <div className="k">Why roles</div>
                                    <div className="v">
                                        Easier management, less mistakes,
                                        consistent access control.
                                    </div>
                                </div>
                                <div className="kv">
                                    <div className="k">Examples</div>
                                    <div className="v">
                                        reader role - only SELECT
                                        <span className="small">
                                            writer role - SELECT + INSERT +
                                            UPDATE
                                        </span>
                                        <span className="small">
                                            admin role - schema changes + user
                                            management
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="note">
                                Follow least privilege: give only the
                                permissions needed for the job.
                            </p>
                        </div>

                        {/* Encryption at rest */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiDatabase />
                                </span>
                                <h3 className="h3">Encryption at rest</h3>
                            </div>

                            <p className="p">
                                <b>Encryption at rest</b> means encrypting data
                                stored on disk. If someone steals the database
                                files or disk snapshot, they cannot read it
                                without the key.
                            </p>

                            <ul className="list">
                                <li>
                                    Applies to - data files, backups, snapshots
                                </li>
                                <li>
                                    Common approach - TDE (Transparent Data
                                    Encryption)
                                </li>
                                <li>
                                    Key management matters - keep keys separate
                                    from data
                                </li>
                            </ul>

                            <p className="note">
                                At rest protects storage. It does not protect
                                data while travelling on the network.
                            </p>
                        </div>

                        {/* Encryption in transit */}
                        <div className="card">
                            <div className="cardTop">
                                <span className="cIcon">
                                    <FiShield />
                                </span>
                                <h3 className="h3">Encryption in transit</h3>
                            </div>

                            <p className="p">
                                <b>Encryption in transit</b> means encrypting
                                data while it moves between client and DB
                                server, or between DB nodes. This prevents
                                sniffing and man-in-the-middle attacks.
                            </p>

                            <div className="mini">
                                <span className="pill">TLS</span>
                                <span className="dash">-</span>
                                <span className="pill">SSL</span>
                                <span className="dash">-</span>
                                <span className="pill">Certificates</span>
                            </div>

                            <p className="note">
                                Use TLS. SSL term is still used, but modern
                                setups are TLS based.
                            </p>
                        </div>

                        {/* SQL injection */}
                        <div className="card span12">
                            <div className="cardTop">
                                <span className="cIcon warn">
                                    <FiAlertTriangle />
                                </span>
                                <h3 className="h3">SQL injection basics</h3>
                            </div>

                            <p className="p">
                                <b>SQL injection</b> is an attack where an
                                attacker tricks your app into running unintended
                                SQL by injecting input into a query string. This
                                can leak data, bypass login, or even delete
                                tables.
                            </p>

                            <div className="badGood">
                                <div className="bgCard bad">
                                    <div className="bgTitle">Bad pattern</div>
                                    <div className="bgText">
                                        Building SQL by string concatenation
                                        with user input.
                                    </div>
                                    <div className="bgMono">
                                        SELECT * FROM users WHERE email = " +
                                        userEmail
                                    </div>
                                </div>

                                <div className="bgCard good">
                                    <div className="bgTitle">Good pattern</div>
                                    <div className="bgText">
                                        Use parameterized queries or prepared
                                        statements.
                                    </div>
                                    <div className="bgMono">
                                        SELECT * FROM users WHERE email = ?
                                    </div>
                                </div>
                            </div>

                            <ul className="list">
                                <li>
                                    Always use prepared statements and
                                    parameterized queries
                                </li>
                                <li>Validate input types and lengths</li>
                                <li>Use least privilege DB users for apps</li>
                                <li>Avoid showing raw SQL errors to users</li>
                            </ul>

                            <p className="note">
                                Most SQL injection happens at application layer,
                                not inside the DBMS itself.
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
                                Authentication - who you are. Authorization -
                                what you can do. Encrypt disk and network.
                                Prevent SQL injection with parameters.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default SecurityInDbms;

