import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import "../styles/reveal.css";
import "../styles/Teachings.css";

function KidaseLanguages() {
  useGlobalReveal(".kidase-page");
  const { t } = useTranslation();
  const heroImage = "/kidase/teachings/kdase.jpg";

  return (
    <div className="kidase-page">
      <header className="kidase-hero" id="kidase-top">
        <div
          className="kidase-hero-media"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <img src={heroImage} alt="" className="kidase-hero-image" />
          <div className="kidase-hero-overlay" />
        </div>

        <div className="kidase-hero-content">
          <h1>{t("kidase.hero.title")}</h1>
          <p>{t("kidase.hero.subtitle")}</p>
          <a className="kidase-hero-cta" href="#languages">
            {t("kidase.hero.cta")}
          </a>
        </div>
      </header>

      <div className="kidase-layout">
        <aside className="kidase-toc">
          <h2>{t("kidase.toc.title")}</h2>
          <a href="#languages">{t("kidase.toc.languages")}</a>
          <a href="#about">{t("kidase.toc.about")}</a>
          <a href="#resources">{t("kidase.toc.resources")}</a>
        </aside>

        <div className="kidase-content">
          <section id="languages" className="kidase-section">
            <h2>{t("kidase.sections.languages.title")}</h2>
            <p>{t("kidase.sections.languages.subtitle")}</p>
            <div className="kidase-links">
              <Link to="/teachings/kidase/geez">
                {t("kidase.languages.geez")}
              </Link>
              <Link to="/teachings/kidase/ezel">
                {t("kidase.languages.ezel")}
              </Link>
            </div>
          </section>

          <section id="about" className="kidase-section">
            <h2>{t("kidase.sections.about.title")}</h2>
            <p>{t("kidase.sections.about.body")}</p>
          </section>

          <section id="resources" className="kidase-section">
            <h2>{t("kidase.sections.resources.title")}</h2>
            <p>{t("kidase.sections.resources.body")}</p>
            <Link className="kidase-inline-link" to="/teachings">
              {t("kidase.sections.resources.link")}
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default KidaseLanguages;
