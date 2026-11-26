import AppRoutes from "./AppRoutes";
import Footer from "./components/footer";
import GoToTop from "./components/goToTop";
import Header from "./components/header";
import ScrollToTop from "./components/scrollToTop";
import styles from "./App.module.css";
import { useLocation } from "react-router-dom";

function App() {
    const { pathname } = useLocation();
    const isStandaloneNotesPage = pathname.startsWith("/notes/devops-and-cloud-core-notes")
        || pathname.startsWith("/notes/data-structures-core-notes")
        || pathname.startsWith("/notes/java-core-notes")
        || pathname.startsWith("/notes/dbms-core-notes")
        || pathname.startsWith("/notes/databases-deep-dive-core-notes");

    return (
        <div className={styles.app}>
            <ScrollToTop />
            {!isStandaloneNotesPage && <Header />}
            <main className={isStandaloneNotesPage ? styles.standaloneRoutes : styles.routes}>
                <AppRoutes />
            </main>
            {!isStandaloneNotesPage && <Footer />}
            {!isStandaloneNotesPage && <GoToTop />}
        </div>
    );
}

export default App;
