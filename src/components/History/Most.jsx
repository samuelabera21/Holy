

import { useTranslation } from "react-i18next";
import mostOrthodoxChurches from "../../data/history/mostOrthodoxChurches";
import "../../styles/history/Most.css";

function Most() {
  const { t } = useTranslation();

  return (
    <section className="history-most" id="history-most">
      <h2>
        {t("history.most.title", {
          defaultValue: "Most Important Orthodox Churches"
        })}
      </h2>

      <div className="most-modern">
  {mostOrthodoxChurches.map((church, i) => (
    <article
      className={`split-card ${i % 2 === 1 ? "reverse" : ""}`}
      key={church.id}
    >
      {/* MEDIA */}
      <div className="split-media">
        {church.media.type === "video" ? (
          <video
            src={church.media.src}
            poster={church.media.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={church.media.src}
            alt={t(`history.most.items.${church.id}.name`)}
          />
        )}
      </div>

      {/* CONTENT */}
   <div className="split-content">
  <span className="split-rank">#{church.rank}</span>
  <h3>
    {t(`history.most.items.${church.id}.name`)}
  </h3>
  <p className="location">
    {t(`history.most.items.${church.id}.location`)}
  </p>

  <div className="desc-wrap">
    <p className="significance">
      {t(`history.most.items.${church.id}.significance`)}
    </p>
  </div>
</div>

    </article>
  ))}
</div>

    </section>
  );
}


export default Most;


