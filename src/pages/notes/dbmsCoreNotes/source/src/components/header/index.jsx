// src/components/header/index.jsx
import React, { useEffect, useState } from "react";
import { Styled } from "./styled";
import { FiMoon, FiSun } from "react-icons/fi";
import logo from "./logo.png";

const Header = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("dbms-core-notes-theme") === "light"
                ? "light"
                : "dark";
        } catch {
            return "dark";
        }
    });

    // Apply theme + persist
    useEffect(() => {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }

        try {
            localStorage.setItem("dbms-core-notes-theme", theme);
        } catch {
            // Theme changes still work for this session when storage is unavailable.
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
                <div className="logoNameThemeToggleWrapper">
                    <div className="logoNameWrapper">
                        <div className="logoWrapper">
                            {!logoLoaded && <div className="logoSkeleton" />}
                            <img
                                src={logo}
                                alt="DBMS Core Notes logo"
                                onLoad={() => setLogoLoaded(true)}
                                style={{ opacity: logoLoaded ? 1 : 0 }}
                            />
                        </div>

                        <div className="nameWrapper">
                            <div className="title">dbms-core-notes</div>
                            <div className="subTitle">
                                At-a-glance DBMS revision
                            </div>
                        </div>
                    </div>

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
