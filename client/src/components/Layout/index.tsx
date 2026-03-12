import { Link, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/forms";

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>◇</span>
          Forms Lite
        </Link>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={isHome ? styles.navLinkActive : styles.navLink}
          >
            All forms
          </Link>
          <Link to="/forms/new" className={styles.navButton}>
            + New form
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
