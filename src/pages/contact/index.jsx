import { FiArrowUpRight, FiCode, FiGithub, FiGlobe, FiMail } from "react-icons/fi";

import styles from "./style.module.css";

const links = [
    { icon: FiGlobe, label: "Portfolio", detail: "ashishranjan.net", href: "https://www.ashishranjan.net/" },
    { icon: FiGithub, label: "GitHub", detail: "github.com/a2rp", href: "https://github.com/a2rp" },
    { icon: FiCode, label: "CodePen", detail: "codepen.io/ash1198", href: "https://codepen.io/ash1198" },
    { icon: FiMail, label: "Email", detail: "ash.ranjan09@gmail.com", href: "mailto:ash.ranjan09@gmail.com" },
];

function ContactPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}>CONTACT</span>
                <h1>Let’s keep<br /><span>the conversation going.</span></h1>
                <p>Questions, corrections, or ideas for the notes library? Find me through any of these links.</p>
            </section>
            <section className={styles.contactList}>
                {links.map(({ icon: Icon, label, detail, href }) => (
                    <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>
                        <span className={styles.icon}><Icon aria-hidden="true" /></span>
                        <span className={styles.linkCopy}><small>{label}</small><strong>{detail}</strong></span>
                        <FiArrowUpRight className={styles.arrow} aria-hidden="true" />
                    </a>
                ))}
            </section>
        </div>
    );
}

export default ContactPage;
