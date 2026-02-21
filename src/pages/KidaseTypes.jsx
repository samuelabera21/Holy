// import { Link } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypes.css";

// function KidaseTypes() {
//   return (
//     <div className="kidase-types-page">
//       <h1 className="title">{kidase.title}</h1>
//       <p className="description">{kidase.description}</p>

//       <div className="types-grid">
//         {kidase.types.map((type) => (
//           <Link
//             key={type.id}
//             to={`/teachings/kidase/${type.id}`}
//             className="type-card"
//           >
//             <img src={type.image} alt={type.title} />
//             <h3>{type.title}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KidaseTypes;



// import { useParams, Link } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypes.css";

// function KidaseTypes() {
//   const { lang } = useParams();
//   const languageData = kidase.languages[lang];

//   if (!languageData) {
//     return <p>Language not found</p>;
//   }

//   return (
//     <div>
//       <h1>{languageData.title} ቅዳሴ</h1>

//       <div className="kidase-types">
//         {languageData.types.map((type) => (
//           <Link
//             key={type.id}
//             to={`/teachings/kidase/${lang}/${type.id}`}
//             className="kidase-card"
//           >
//             <img src={type.image} alt={type.title} />
//             <h3>{type.title}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KidaseTypes;






// import { useParams, Link } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypes.css";

// function KidaseTypes() {
//   const { lang } = useParams();
//   const languageData = kidase.languages[lang];

//   if (!languageData) {
//     return <p>Language not found</p>;
//   }

//   return (
//     <div className="kidase-page">
//       {/* background video */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="overlay" />

//       <div className="kidase-content">
//         <h1>{languageData.title} ቅዳሴ</h1>
//         <p>የቅዳሴ አይነቶችን ይምረጡ</p>

//         <div className="kidase-types">
//           {languageData.types.map((type) => (
//             <Link
//               key={type.id}
//               to={`/teachings/kidase/${lang}/${type.id}`}
//               className="kidase-card"
//             >
//               <img src={type.image} alt={type.title} />
//               <h3>{type.title}</h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseTypes;


import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import "../styles/reveal.css";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypesSimple.css";

function KidaseTypes() {
  const { lang } = useParams();
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  useGlobalReveal(".kidase-simple-page");

  const languageData = kidase.languages[lang];
  if (!languageData) return <p>{t("kidase.errors.languageNotFound")}</p>;

  const languageTitle = t(`kidase.languages.${lang}`);
  const heroImage = "/kidase/geez/hero.png";

  const filtered = languageData.types.filter((type) => {
    const typeTitle = t(`kidase.content.${lang}.types.${type.id}.title`);
    return typeTitle.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="kidase-simple-page">
      <header className="kidase-types-hero kidase-types-hero--image">
        {heroImage && (
          <div
            className="kidase-types-hero-media"
            aria-hidden="true"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <img
              src={heroImage}
              alt=""
              className="kidase-types-hero-image"
            />
            <div className="kidase-types-hero-overlay" />
          </div>
        )}

        <div className="kidase-types-hero-content">
          <h1>
            {t("kidase.types.heroTitle", {
              language: languageTitle
            })}
          </h1>
          <p>{t("kidase.types.heroSubtitle")}</p>
        </div>
      </header>

      <div className="container">
        <header className="page-header">
          <h2>{t("kidase.types.sectionTitle")}</h2>
          <p className="subtitle">{t("kidase.types.sectionSubtitle")}</p>
        </header>

        <div className="controls-row">
          <input
            className="simple-search"
            placeholder={t("kidase.types.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("kidase.types.searchAriaLabel")}
          />
        </div>

        <div className="cards-grid">
          {filtered.map((type) => {
            const typeTitle = t(`kidase.content.${lang}.types.${type.id}.title`);
            return (
              <Link
                key={type.id}
                to={`/teachings/kidase/${lang}/${type.id}`}
                className="teach-card"
              >
                <div className="card-img-wrap">
                  <img src={type.image} alt={typeTitle} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{typeTitle}</h3>
                  <p className="card-desc">
                    {t("kidase.types.cardDescription")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default KidaseTypes;
