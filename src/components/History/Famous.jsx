// function Famous() {
//   return (
//     <section className="history-section">
//       <h2>Famous Ethiopian Orthodox Leaders</h2>
//       <p>
//         This section will introduce important Ethiopian Orthodox leaders
//         and their spiritual contributions.
//       </p>
//     </section>
//   );
// }

// export default Famous;


// import "../../styles/history/Famous.css";

// /* ===== DATA (later API / JSON) ===== */
// const figures = [
//   {
//     id: 1,
//     name: "St. Athanasius",
//     title: "Defender of the Trinity",
//     era: "4th Century",
//     description:
//       "One of the most important Church Fathers, defender of Orthodox Christology.",
//     image: "", // later
//   },
//   {
//     id: 2,
//     name: "St. Cyril of Alexandria",
//     title: "Pillar of Orthodoxy",
//     era: "5th Century",
//     description:
//       "Key theologian in defining the nature of Christ and Orthodox doctrine.",
//     image: "",
//   },
//   {
//     id: 3,
//     name: "St. Yared",
//     title: "Father of Ethiopian Church Music",
//     era: "6th Century",
//     description:
//       "Composer of sacred Ethiopian Orthodox hymns still used today.",
//     image: "",
//   },
// ];

// function Famous() {
//   return (
//     <section className="history-famous">
//       <h2>Famous Figures of Orthodoxy</h2>

//       <div className="famous-grid">
//         {figures.map((person) => (
//           <div key={person.id} className="famous-card">
//             <div className="famous-image">
//               <div className="image-placeholder">Portrait</div>
//             </div>

//             <div className="famous-content">
//               <h3>{person.name}</h3>
//               <span className="title">{person.title}</span>
//               <span className="era">{person.era}</span>
//               <p>{person.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Famous;





import { useTranslation } from "react-i18next";
import "../../styles/history/Famous.css";
import famousFigures from "../../data/history/famous";

function Famous() {
  const { t } = useTranslation();

  return (
    <section className="history-famous" id="history-famous">
      <div className="famous-header">
        <h2>
          {t("history.famous.title", {
            defaultValue: "Famous Figures of Orthodoxy"
          })}
        </h2>
        <p>
          {t("history.famous.subtitle", {
            defaultValue:
              "Saints and theologians who shaped Orthodox faith, worship, and tradition across centuries."
          })}
        </p>
      </div>

      <div className="famous-grid">
        {famousFigures.map((person) => (
          <article key={person.id} className="famous-card">
            <div className="famous-avatar">
              <img
                src={person.image}
                alt={t(`history.famous.items.${person.id}.name`)}
              />
            </div>

            <div className="famous-content">
              <h3>
                {t(`history.famous.items.${person.id}.name`)}
              </h3>
              <span className="title">
                {t(`history.famous.items.${person.id}.title`)}
              </span>
              <span className="era">
                {t(`history.famous.items.${person.id}.era`)}
              </span>
              <p>
                {t(`history.famous.items.${person.id}.description`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Famous;
