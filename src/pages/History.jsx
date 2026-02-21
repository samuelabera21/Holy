import { useTranslation } from "react-i18next";
import Hero from "../components/History/Hero";
import InEthiopia from "../components/History/InEthiopia";
import Community from "../components/History/Community";
import Most from "../components/History/Most";
import Famous from "../components/History/Famous";
import "../styles/History.css";


function History() {
  const { t } = useTranslation();

  return (
    <main className="history-page">
      <Hero />

      <div className="history-layout">
        <aside className="history-toc" aria-label="History sections">
          <h2>{t("history.toc.title", { defaultValue: "On this page" })}</h2>
          <a href="#history-ethiopia">
            {t("history.toc.ethiopia", { defaultValue: "Orthodoxy in Ethiopia" })}
          </a>
          <a href="#history-community">
            {t("history.toc.community", { defaultValue: "Global Community" })}
          </a>
          <a href="#history-most">
            {t("history.toc.churches", { defaultValue: "Important Churches" })}
          </a>
          <a href="#history-famous">
            {t("history.toc.figures", { defaultValue: "Famous Figures" })}
          </a>
        </aside>

        <div className="history-content">
          <InEthiopia />
          <Community />
          <Most />
          <Famous />
        </div>
      </div>
    </main>
  );
}

export default History;
