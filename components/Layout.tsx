import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";
import styles from "../styles/Home.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>E-HEADPHONES</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className={styles.main_container}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
