import { useEffect, useState } from "react";
import { FiFileText, FiGithub, FiMenu, FiX } from "react-icons/fi";
import { Styled } from "./styled";

function Header({ totalNotes }) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => { const close = () => setIsOpen(false); window.addEventListener("hashchange", close); return () => window.removeEventListener("hashchange", close); }, []);
    return <Styled.Wrapper>
        <a className="brand" href="#top" aria-label="Notes home" onClick={() => setIsOpen(false)}><img className="logo" src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" /><div><span className="brandLabel">A2RP COLLECTION</span><strong>Notes</strong></div></a>
        <nav className={isOpen ? "nav open" : "nav"} aria-label="Main navigation"><a href="#notes" onClick={() => setIsOpen(false)}><FiFileText /> Notes</a><a href="#footer" onClick={() => setIsOpen(false)}>About</a><a href="https://github.com/a2rp/notes" target="_blank" rel="noopener noreferrer"><FiGithub /> GitHub</a></nav>
        <div className="headerActions"><span className="noteCount">{totalNotes} {totalNotes === 1 ? "note" : "notes"}</span><button className="menuButton" type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>{isOpen ? <FiX /> : <FiMenu />}</button></div>
    </Styled.Wrapper>;
}

export default Header;