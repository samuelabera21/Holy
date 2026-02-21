import { useTranslation } from "react-i18next";
import "../../styles/Quote.css";

function Quote() {
  const { t } = useTranslation();

  return (
    <section className="quote">
      <blockquote>{t("home.quote.text")}</blockquote>
      <cite>{t("home.quote.source")}</cite>
    </section>
  );
}

export default Quote;
