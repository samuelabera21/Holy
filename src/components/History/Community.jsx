// function Community() {
//   return (
//     <section className="history-section">
//       <h2>Global Orthodox Community</h2>
//       <p>
//         This section will later show Orthodox populations around the world,
//         by continent and by country, using real data.
//       </p>
//     </section>
//   );
// }

// export default Community;


import { useTranslation } from "react-i18next";
import "../../styles/history/Community.css";
import topOrthodoxCountries from "../../data/history/topOrthodoxCountries";


function Community() {
  const { t } = useTranslation();

  return (
    <section className="history-community countries-section" id="history-community">
      <div className="community-intro">
        <h2>
          {t("history.community.title", {
            defaultValue: "Global Orthodox Community"
          })}
        </h2>
        <p>
          {t("history.community.subtitle", {
            defaultValue:
              "Discover the nations where Orthodox Christianity has the strongest presence today."
          })}
        </p>
      </div>

      <h3>
        {t("history.community.topCountries", {
          defaultValue: "Top Orthodox Countries Worldwide"
        })}
      </h3>

      <div className="country-grid">
        {topOrthodoxCountries.map((country) => (
          <article className="country-card" key={country.id}>
            <div className="country-media">
              {country.media.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${country.media.id}?autoplay=1&mute=1&loop=1&playlist=${country.media.id}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
                  title={t(`history.community.countries.${country.id}.name`)}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="origin"
                  allowFullScreen={false}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : country.media.type === "video" ? (
                <video
                  src={country.media.src}
                  poster={country.media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <img
                  src={country.media.src}
                  alt={t(`history.community.countries.${country.id}.name`)}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>

            <div className="country-info">
              <span className="country-rank">#{country.rank}</span>
              <h4>
                {t(`history.community.countries.${country.id}.name`)}
              </h4>

              <p className="church-name">
                {t(`history.community.countries.${country.id}.primaryChurch`)}
              </p>

              <ul className="country-stats">
                <li>
                  <strong>
                    {t("history.community.labels.orthodox")}
                    :
                  </strong>{" "}
                  {country.statistics.totalOrthodox.toLocaleString()}
                </li>
                <li>
                  <strong>
                    {t("history.community.labels.population")}
                    :
                  </strong>{" "}
                  {country.statistics.percentageOfPopulation}%
                </li>
              </ul>

              <p className="country-description">
                {t(`history.community.countries.${country.id}.description`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Community;
