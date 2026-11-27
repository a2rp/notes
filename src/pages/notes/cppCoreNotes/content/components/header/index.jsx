// Header.jsx
import React, { useEffect, useState } from "react";
import { Styled } from "./styled";
import { FiMoon, FiSun } from "react-icons/fi";
import logo from "../../assets/logo.png";

const THEME_STORAGE_KEY = "cpp-core-notes-theme";

const Header = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
        } catch {
            // Browser storage may be unavailable.
        }
        return "dark";
    });

    // Keep this theme scoped to the embedded notes app.
    useEffect(() => {
        const app = document.querySelector(".cppCoreNotesApp");
        if (theme === "light") {
            app?.setAttribute("data-theme", "light");
        } else {
            app?.removeAttribute("data-theme");
        }

        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            // Browser storage may be unavailable.
        }
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
                                alt="cpp-core-notes"
                                onLoad={() => setLogoLoaded(true)}
                                style={{ opacity: logoLoaded ? 1 : 0 }}
                            />
                        </div>

                        <div className="nameWrapper">
                            <div className="title">cpp-core-notes</div>
                            <div className="subTitle">
                                At-a-glance cpp revision
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
