import AppRoutes from "./AppRoutes";
import Footer from "./components/footer";
import GoToTop from "./components/goToTop";
import Header from "./components/header";
import ScrollToTop from "./components/scrollToTop";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.app}>
            <ScrollToTop />
            <Header />
            <main className={styles.routes}>
                <AppRoutes />
            </main>
            <Footer />
            <GoToTop />
        </div>
    );
}

export default App;
