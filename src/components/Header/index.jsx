import { FiFileText, FiGithub } from "react-icons/fi";

import { Styled } from "./styled";

function Header({ totalNotes }) {
    return (
        <Styled.Wrapper>
            <a className="brand" href="#top" aria-label="Notes home">
                <span className="brandIcon">
                    <FiFileText />
                </span>

                <div>
                    <span className="brandLabel">a2rp</span>

                    <strong>Notes</strong>
                </div>
            </a>

            <div className="headerActions">
                <span className="noteCount">
                    {totalNotes} {totalNotes === 1 ? "note" : "notes"}
                </span>

                <a
                    className="githubLink"
                    href="https://github.com/a2rp/notes"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Notes repository on GitHub"
                    title="GitHub Repository"
                >
                    <FiGithub />
                </a>
            </div>
        </Styled.Wrapper>
    );
}

export default Header;
