import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Styled } from "./App.styled";
import Header from "./components/header";
import Footer from "./components/footer";
import AppRoutes, { items } from "./AppRoutes";
import { FiBookOpen } from "react-icons/fi";

const App = () => {
    const mainRef = useRef(null);
    const location = useLocation();
    const [showTopButton, setShowTopButton] = useState(false);

    const navClass = ({ isActive }) =>
        isActive ? "topicLink active" : "topicLink";

    const scrollToTop = () => {
        mainRef.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const main = mainRef.current;
        if (!main) return undefined;

        const handleScroll = () => setShowTopButton(main.scrollTop > 350);
        main.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => main.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Header />
            </Styled.Header>

            <Styled.Main ref={mainRef}>
                <aside className="studyNav" aria-label="DBMS topics">
                    <div className="studyNavLabel">Study guide</div>
                    <nav>
                        {items.map(([path, label]) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={navClass}
                                onClick={scrollToTop}
                            >
                                <FiBookOpen />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                    <p>Select a topic to open its notes.</p>
                </aside>

                <div className="contentWrapper">
                    <AppRoutes key={location.pathname} />
                    <Footer />
                </div>

                <button
                    className={
                        showTopButton
                            ? "scrollTopButton show"
                            : "scrollTopButton"
                    }
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Scroll content to top"
                    title="Scroll to top"
                >
                    ↑
                </button>
            </Styled.Main>
        </Styled.Wrapper>
    );
};

export default App;
