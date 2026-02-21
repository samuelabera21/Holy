// function Hero() {
//   return (
//     <section className="history-section">
//       <h2>Origin of Orthodox Christianity</h2>
//       <p>
//         This section will later describe the origin of the Orthodox Church.
//         Background video and rich content will be added later.
//       </p>
//     </section>
    
//   );
// }

// export default Hero;

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../styles/history/Hero.css";
function Hero() {
  const { t } = useTranslation();

  return (
    <section className="history-hero">
      {/* Background video */}
      <video
        className="history-hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/history/history.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="history-hero-overlay" />

      {/* Content */}
      <div className="history-hero-content">
        <nav className="history-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{t("history.breadcrumb", { defaultValue: "History" })}</span>
        </nav>

        <h1>
          {t("history.hero.title", {
            defaultValue: "Ethiopian Orthodox Tewahedo Church"
          })}
        </h1>
        <p>
          {t("history.hero.subtitle", {
            defaultValue:
              "A faith rooted in apostolic tradition, history, and spiritual life passed through generations."
          })}
        </p>
        <a className="history-hero-cta" href="#history-ethiopia">
          {t("history.hero.cta", { defaultValue: "Explore the History" })}
        </a>
      </div>
    </section>
  );
}

export default Hero;
