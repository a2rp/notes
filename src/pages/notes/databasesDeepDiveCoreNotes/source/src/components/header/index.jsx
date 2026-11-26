// src/components/header/index.jsx
import React, { useEffect, useState } from "react";
import { Styled } from "./styled";
import { FiMoon, FiSun, FiDatabase, FiLayers } from "react-icons/fi";
import logo from "./logo.png";

const THEME_LS_KEY = "databases-deep-dive-core-notes-theme";

const Header = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem(THEME_LS_KEY) === "light"
                ? "light"
                : "dark";
        } catch {
            return "dark";
        }
    });

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }

        try {
            localStorage.setItem(THEME_LS_KEY, theme);
        } catch {
            // Theme switching still works for this session if storage is blocked.
        }

        return () => document.documentElement.removeAttribute("data-theme");
    }, [theme]);

    const nextTheme = theme === "light" ? "dark" : "light";

    const handleToggle = () => {
        setTheme(nextTheme);
    };

    return (
        <Styled.Wrapper>
            <Styled.Main>
                <div className="leftSide">
                    <div className="logoNameWrapper">
                        <div className="logoWrapper">
                            {!logoLoaded && <div className="logoSkeleton" />}
                            <img
                                src={logo}
                                alt="Databases Deep Dive Core Notes logo"
                                onLoad={() => setLogoLoaded(true)}
                                style={{ opacity: logoLoaded ? 1 : 0 }}
                                loading="lazy"
                            />
                        </div>

                        <div className="nameWrapper">
                            <div className="title">
                                database-deep-dive-core-notes
                            </div>
                            <div className="subTitle">
                                MongoDB, SQL, indexes, transactions,
                                replication, sharding
                            </div>
                        </div>

                        <div className="pillRow">
                            <div className="stat">
                                <span className="sIcon">
                                    <FiDatabase />
                                </span>
                                <span>DB</span>
                            </div>
                            <div className="stat">
                                <span className="sIcon">
                                    <FiLayers />
                                </span>
                                <span>Deep Dive</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <button
                        type="button"
                        className="themeToggleBtn"
                        onClick={handleToggle}
                        aria-label={`Switch to ${nextTheme} theme`}
                        title={`Switch to ${nextTheme}`}
                    >
                        <span className="icon">
                            {theme === "light" ? <FiMoon /> : <FiSun />}
                        </span>
                        <span className="label">
                            {theme === "light" ? "Light" : "Dark"}
                        </span>
                    </button>
                </div>
            </Styled.Main>
        </Styled.Wrapper>
    );
};

export default Header;
