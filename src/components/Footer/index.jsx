import styles from "./style.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <span>{"\u00A9"} {new Date().getFullYear()} Notes. All rights reserved.</span>
                <span>
                    Developed by{" "}
                    <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">
                        Ashish Ranjan
                    </a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
