import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";
import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ================= BRAND ================= */}
        <div className="footer-brand">
          <h3>{t("footer.brand.title")}</h3>
          <p>{t("footer.brand.tagline")}</p>
        </div>

        {/* ================= LINKS ================= */}
        <div className="footer-links">
          <h4>{t("footer.links.title")}</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path}>{t(`nav.links.${link.id}`)}</NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/teachings/kidase">{t("footer.links.kidase")}</NavLink>
            </li>
          </ul>
        </div>

        {/* ================= SOCIALS ================= */}
        <div className="footer-socials">
          <h4>{t("footer.socials.title")}</h4>
          <div className="social-links">
            {/* External links still use <a> */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              {t("footer.socials.facebook")}
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              {t("footer.socials.youtube")}
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              {t("footer.socials.telegram")}
            </a>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM ================= */}
      <div className="footer-bottom">
        <p>
          {t("footer.bottom", {
            year: new Date().getFullYear()
          })}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
