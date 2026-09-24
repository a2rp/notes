import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styled from "styled-components";

export default function GoToTop({ threshold = 260 }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => { const onScroll = () => setVisible(window.scrollY > threshold); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, [threshold]);
    return <Button type="button" data-visible={visible} aria-label="Go to top" title="Go to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiArrowUp /></Button>;
}
const Button = styled.button`
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 1200;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid #292929;
    border-radius: 50%;
    color: #050505;
    background: #f5f5f5;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity .18s ease, border-color .18s ease, box-shadow .18s ease;
    &[data-visible="true"] { opacity: 1; pointer-events: auto; }
    &:hover { border-color: #fff; box-shadow: 0 0 18px rgba(255,255,255,.2); }
    @media (max-width: 720px) { right: 16px; bottom: 16px; }
`;