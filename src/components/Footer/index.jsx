import {
    FiArrowUp,
    FiCodepen,
    FiCoffee,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLinkedin,
    FiMail,
    FiYoutube,
} from "react-icons/fi";

import { Styled } from "./styled";

const socialLinks = [
    {
        label: "Portfolio",
        href: "https://www.ashishranjan.net",
        icon: FiGlobe,
    },
    {
        label: "GitHub",
        href: "https://github.com/a2rp",
        icon: FiGithub,
    },
    {
        label: "CodePen",
        href: "https://codepen.io/ash1198",
        icon: FiCodepen,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        icon: FiLinkedin,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        icon: FiFacebook,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        icon: FiYoutube,
    },
];

const supportLinks = [
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        icon: FiHeart,
    },
    {
        label: "Buy Me A Coffee",
        href: "https://buymeacoffee.com/a2rp",
        icon: FiCoffee,
    },
    {
        label: "Email",
        href: "mailto:ash.ranjan09@gmail.com",
        icon: FiMail,
    },
];

function Footer() {
    return (
        <Styled.Wrapper>
            <div className="footerInner">
                <div className="footerTop">
                    <div className="brandBlock">
                        <div className="brandHeading">
                            <span className="brandMark">a2rp</span>

                            <div>
                                <strong>Notes</strong>
                                <span>Local Notes Manager</span>
                            </div>
                        </div>

                        <p>
                            A focused browser-based notes manager for capturing,
                            organizing and managing your notes locally.
                        </p>

                        <div className="storageInfo">
                            <span className="statusDot" />
                            <span>Saved locally in your browser</span>
                        </div>
                    </div>

                    <div className="footerLinks">
                        <div className="linkGroup">
                            <span className="groupTitle">Connect</span>

                            <div className="linkGrid">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span className="linkIcon">
                                                <Icon />
                                            </span>

                                            <span>{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="linkGroup supportGroup">
                            <span className="groupTitle">Support</span>

                            <div className="linkGrid supportLinks">
                                {supportLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isEmail =
                                        link.href.startsWith("mailto:");

                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target={
                                                isEmail ? undefined : "_blank"
                                            }
                                            rel={
                                                isEmail
                                                    ? undefined
                                                    : "noreferrer"
                                            }
                                        >
                                            <span className="linkIcon">
                                                <Icon />
                                            </span>

                                            <span>{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footerBottom">
                    <div className="copyright">
                        <span>© 2026 a2rp</span>

                        <span className="separator">•</span>

                        <span>
                            Developed by{" "}
                            <a
                                href="https://www.ashishranjan.net"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ashish Ranjan
                            </a>
                        </span>
                    </div>

                    <a
                        className="backToTop"
                        href="#top"
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <FiArrowUp />
                    </a>
                </div>
            </div>
        </Styled.Wrapper>
    );
}

export default Footer;
