import { useTranslation } from "react-i18next";
import Hero from "../components/History/Hero";
import Most from "../components/History/Most";
import "../styles/History.css";

function History() {
  const { t } = useTranslation();

  return (
    <main className="history-page">
      <Hero />
      <div className="history-content">
        <Most />
      </div>
    </main>
  );
}

export default History;
