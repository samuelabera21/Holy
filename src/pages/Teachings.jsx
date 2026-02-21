import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import "../styles/reveal.css";
import "../styles/Teachings.css";

function Teachings() {
  useGlobalReveal(".teachings-page");
  const { t } = useTranslation();
  const heroImage = "/kidase/teachings/teach.jpg";

  const teachingItems = [
    {
      id: "kidase",
      title: t("teachings.items.kidase.title"),
      description: t("teachings.items.kidase.description"),
      to: "/teachings/kidase",
    },
    {
      id: "wereb",
      title: t("teachings.items.wereb.title"),
      description: t("teachings.items.wereb.description"),
      to: "/teachings/wereb",
    },
  ];

  return (
    <div className="teachings-page">
      <header className="teachings-hero" id="teachings-top">
        <div
          className="teachings-hero-media"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <img src={heroImage} alt="" className="teachings-hero-image" />
          <div className="teachings-hero-overlay" />
        </div>

        <nav className="teachings-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("teachings.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <span>{t("teachings.breadcrumbs.teachings")}</span>
        </nav>

        <div className="teachings-hero-content">
          <h1>{t("teachings.hero.title")}</h1>
          <p>{t("teachings.hero.subtitle")}</p>
          <a className="teachings-hero-cta" href="#teachings-grid">
            {t("teachings.hero.cta")}
          </a>
        </div>
      </header>

      <section className="teachings-section" id="teachings-grid">
        <div className="teachings-section-header">
          <h2>{t("teachings.section.title")}</h2>
          <p>{t("teachings.section.subtitle")}</p>
        </div>

        <div className="teachings-grid">
          {teachingItems.map((item) => (
            <Link key={item.id} to={item.to} className="teachings-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="teachings-card-link">
                {t("teachings.card.open")}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="teachings-section teachings-section-muted">
        <div className="teachings-section-header">
          <h2>{t("teachings.more.title")}</h2>
          <p>{t("teachings.more.subtitle")}</p>
        </div>
      </section>
    </div>
  );
}

export default Teachings;
