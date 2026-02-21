import { Trans, useTranslation } from "react-i18next";
import heroImage from "../../assets/images/hero/hero-bg-img.jpg";
import "../../styles/Hero.css";


/*
  Hero Section
  ------------
  Responsible ONLY for:
  - Main heading
  - Intro text
  - Social links
*/

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" style={{ "--hero-bg": `url(${heroImage})` }}>
      <div className="hero-content">
        <h1>
          <Trans i18nKey="home.hero.title">
            አናታቺን <br />
            የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን
          </Trans>
        </h1>

        <p>{t("home.hero.subtitle")}</p>

        <div className="hero-socials">
          <a href="#">{t("home.hero.socials.facebook")}</a>
          <a href="#">{t("home.hero.socials.youtube")}</a>
          <a href="#">{t("home.hero.socials.telegram")}</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
