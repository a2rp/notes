// Header.jsx
import React, { useEffect, useState } from "react";
import { Styled } from "./styled";
import { FiMoon, FiSun } from "react-icons/fi";
import logo from "../../assets/logo.png";

const THEME_LS_KEY = "operating-systems-core-notes-theme";

const Header = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem(THEME_LS_KEY) === "light" ? "light" : "dark"; }
        catch { return "dark"; }
    });

    // Apply the theme to this notes app only.
    useEffect(() => {
        if (theme === "light") {
            document.querySelector(".operatingSystemsCoreNotesApp")?.setAttribute("data-theme", "light");
        } else {
            document.querySelector(".operatingSystemsCoreNotesApp")?.removeAttribute("data-theme");
        }

        localStorage.setItem(THEME_LS_KEY, theme);
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
                                alt="Operating Systems Core Notes logo"
                                onLoad={() => setLogoLoaded(true)}
                                style={{ opacity: logoLoaded ? 1 : 0 }}
                            />
                        </div>

                        <div className="nameWrapper">
                            <div className="title">
                                Operating Systems Core Notes
                            </div>
                            <div className="subTitle">
                                Processes, memory, scheduling, storage, and more
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
