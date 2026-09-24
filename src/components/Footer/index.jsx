import { createElement } from "react";
import { FaCodepen } from "react-icons/fa";
import { FiArrowUp, FiCoffee, FiFacebook, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiMail, FiStar, FiYoutube } from "react-icons/fi";
import { Styled } from "./styled";

const links = [
    ["Portfolio", "https://www.ashishranjan.net/", FiGlobe], ["GitHub", "https://github.com/a2rp", FiGithub], ["CodePen", "https://codepen.io/ash1198", FaCodepen], ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLinkedin], ["Facebook", "https://www.facebook.com/theash.ashish/", FiFacebook], ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FiYoutube], ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
];
const support = [["Support", "https://a2rp-donation-page.netlify.app/", FiHeart], ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee], ["Patreon", "https://patreon.com/a2rp", FiStar]];
const legal = [["Privacy", "/privacy"], ["Terms", "/terms"]];
function IconLinks({ items }) { return <div className="iconLinks">{items.map(([label, href, icon]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} title={label}>{createElement(icon)}</a>)}</div>; }
function Footer() {
    const year = new Date().getFullYear();
    return <Styled.Wrapper id="footer"><div className="footerInner"><div className="footerTop"><div className="brandBlock"><div className="brandHeading"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" /><div><strong>Notes</strong><span>Local Notes Manager</span></div></div><p>A focused browser-based notes manager for capturing, organising and managing notes locally.</p><div className="storageInfo"><span className="statusDot" />Saved locally in your browser</div></div><div className="footerLinks"><div className="linkGroup"><span className="groupTitle">Links</span><IconLinks items={links} /></div><div className="linkGroup"><span className="groupTitle">Support</span><IconLinks items={support} /></div></div></div><div className="footerBottom"><div className="copyright">Copyright &copy; {year} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a><span className="separator">•</span>{legal.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div><a className="backToTop" href="#top" aria-label="Back to top" title="Back to top"><FiArrowUp /></a></div></div></Styled.Wrapper>;
}
export default Footer;