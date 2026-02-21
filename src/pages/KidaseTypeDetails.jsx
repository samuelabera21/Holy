// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import kidase from "../data/teachings/kidase";
// import "../styles/TeachingDetails.css";

// const ITEMS_PER_PAGE = 6;

// function KidaseTypeDetails() {
//   const { typeId } = useParams();
//   const [page, setPage] = useState(1);

//   const type = kidase.types.find(t => t.id === typeId);
//   if (!type) return <p>Kidase type not found</p>;

//   const totalPages = Math.ceil(type.slides.length / ITEMS_PER_PAGE);
//   const start = (page - 1) * ITEMS_PER_PAGE;
//   const visibleSlides = type.slides.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="teaching-details">
//       <video className="teaching-bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="teaching-content">
//         <h1 className="teaching-title">{type.title}</h1>

//         <div className="slides-wrapper">
//           {visibleSlides.map(slide => (
//             <Link
//               key={slide.id}
//               to={`/teachings/kidase/${type.id}/${slide.id}`}
//               className="media-card"
//             >
//               <img src={slide.image} alt={slide.caption} />
//               <h3>{slide.caption}</h3>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="pagination">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(p => p - 1)}
//           >
//             Previous
//           </button>

//           <span>Page {page} of {totalPages}</span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(p => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseTypeDetails;


import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypesSimple.css";
import "../styles/KidaseTypeDetailsSimple.css";

const ITEMS_PER_PAGE = 6;

function KidaseTypeDetails() {
  const { lang, typeId } = useParams();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const language = kidase.languages[lang];
  if (!language) return <p>{t("kidase.errors.languageNotFound")}</p>;

  const type = language.types.find(t => t.id === typeId);
  if (!type) return <p>{t("kidase.errors.typeNotFound")}</p>;

  const languageTitle = t(`kidase.languages.${lang}`);
  const typeTitle = t(`kidase.content.${lang}.types.${typeId}.title`);
  const heroImage = "/kidase/geez/hero.png";

  const totalPages = Math.ceil(type.slides.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleSlides = type.slides.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="kidase-simple-page">
      <header className="kidase-types-hero kidase-types-hero--image">
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

        <nav className="kidase-types-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("kidase.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/teachings">{t("kidase.breadcrumbs.teachings")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/teachings/kidase">{t("kidase.breadcrumbs.kidase")}</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/teachings/kidase/${lang}`}>{languageTitle}</Link>
          <span aria-hidden="true">/</span>
          <span>{typeTitle}</span>
        </nav>

        <div className="kidase-types-hero-content">
          <h1>{typeTitle}</h1>
          <p>{t("kidase.typeDetails.heroSubtitle")}</p>
        </div>
      </header>

      <div className="container">
        <header className="page-header">
          <h2>{t("kidase.typeDetails.sectionTitle")}</h2>
          <p className="subtitle">{t("kidase.typeDetails.sectionSubtitle")}</p>
        </header>

        <div className="cards-grid kidase-slides-grid">
          {visibleSlides.map((slide) => {
            const slideCaption = t(
              `kidase.content.${lang}.types.${typeId}.slides.${slide.id}.caption`
            );
            return (
              <Link
                key={slide.id}
                to={`/teachings/kidase/${lang}/${typeId}/${slide.id}`}
                className="teach-card"
              >
                <div className="card-img-wrap">
                  <img src={slide.image} alt={slideCaption} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{slideCaption}</h3>
                  <p className="card-desc">
                    {t("kidase.typeDetails.cardDescription")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="kidase-pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              {t("kidase.pagination.previous")}
            </button>

            <span>
              {t("kidase.pagination.pageOf", {
                page,
                total: totalPages
              })}
            </span>

            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              {t("kidase.pagination.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default KidaseTypeDetails;





// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypeDetails.css";

// const ITEMS_PER_PAGE = 6;

// function KidaseTypeDetails() {
//   const { lang, typeId } = useParams();
//   const [page, setPage] = useState(1);

//   const language = kidase.languages[lang];
//   if (!language) return <p>Language not found</p>;

//   const type = language.types.find(t => t.id === typeId);
//   if (!type) return <p>Kidase type not found</p>;

//   const totalPages = Math.ceil(type.slides.length / ITEMS_PER_PAGE);
//   const start = (page - 1) * ITEMS_PER_PAGE;
//   const visibleSlides = type.slides.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="kidase-page">
//       {/* Background video */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       {/* Overlay */}
//       <div className="overlay" />

//       {/* Content */}
//       <div className="kidase-content">
//         <h1>{type.title}</h1>
//         <p>Choose a section to listen and continue the Kidase</p>

//         <div className="kidase-types">
//           {visibleSlides.map(slide => (
//             <Link
//               key={slide.id}
//               to={`/teachings/kidase/${lang}/${typeId}/${slide.id}`}
//               className="kidase-card"
//             >
//               <img src={slide.image} alt={slide.caption} />
//               <h3>{slide.caption}</h3>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="pagination">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(p => p - 1)}
//           >
//             Previous
//           </button>

//           <span>Page {page} of {totalPages}</span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(p => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseTypeDetails;
