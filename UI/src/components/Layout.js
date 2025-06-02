import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/authActions";
import styles from "./Layout.module.css";

const Layout = () => {
  const { role, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "user", "viewer"],
    },
    { name: "Policies", path: "/policy/123", roles: ["admin", "user"] },
    { name: "Towers", path: "/towers", roles: ["admin", "user", "viewer"] },
    { name: "Devices", path: "/devices", roles: ["admin"] },
    { name: "Users", path: "/users", roles: ["admin"] },
  ];

  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header} role="banner">
        <div className={styles.logo}>TelecomSaaS</div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        <nav
          className={`${styles.nav} ${isMenuOpen ? styles.show : ""}`}
          role="navigation"
          aria-label="Main Navigation"
        >
          <ul className={styles.navList}>
            {filteredMenu.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link to={item.path} className={styles.navLink}>
                  {item.name}
                </Link>
              </li>
            ))}

            {
              <>
                <li className={styles.navItem}>
                  <button
                    className={styles.navButton}
                    onClick={() => dispatch(logout())}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            }
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent} role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
