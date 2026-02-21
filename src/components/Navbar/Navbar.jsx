import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";
import BackButton from "../BackButton/BackButton";
import useTheme from "../../hooks/useTheme";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const currentLocale = i18n.language?.startsWith("am") ? "am" : "en";
  const nextLocale = currentLocale === "am" ? "en" : "am";

  const toggleLocale = () => {
    i18n.changeLanguage(nextLocale);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <BackButton />

        <div className="navbar-logo">
          <span>⛪</span>
          <h1>{t("nav.brand")}</h1>
        </div>

        <button
          className={`navbar-toggle ${open ? "open" : ""}`}
          aria-label={open ? t("nav.toggle.closeMenu") : t("nav.toggle.openMenu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${open ? "open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setOpen(false)}
            >
              {t(`nav.links.${link.id}`)}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={toggleLocale}
            aria-label={t("nav.toggle.language", {
              lang: nextLocale.toUpperCase()
            })}
          >
            {currentLocale === "am" ? "EN" : "AM"}
          </button>

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={t("nav.toggle.theme", {
              mode: theme === "dark" ? t("nav.mode.light") : t("nav.mode.dark")
            })}
          >
            {theme === "dark" ? t("nav.mode.light") : t("nav.mode.dark")}
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
