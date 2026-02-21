import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="not-found-page">
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.subtitle")}</p>
    </main>
  );
}

export default NotFound;