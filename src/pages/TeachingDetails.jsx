// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import kidase from "../data/teachings/kidase";
// import MediaSlide from "../components/Teaching/MediaSlide";
// import "../styles/TeachingDetails.css";

// function TeachingDetails() {
//   const { id } = useParams();
//   const [playingId, setPlayingId] = useState(null);

//   const teaching = id === "kidase" ? kidase : null;

//   if (!teaching) {
//     return <p>Teaching not found</p>;
//   }

//   return (
//     <div className="teaching-details">
//       {/* Background video */}
//       <video
//         className="teaching-bg-video"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       {/* Content */}
//       <div className="teaching-content">
//         <h1 className="teaching-title">{teaching.title}</h1>
//         <p className="teaching-description">{teaching.description}</p>

//         <div className="slides-wrapper">
//           {teaching.slides.map((slide) => (
//             <MediaSlide
//               key={slide.id}
//               slide={slide}
//               isPlaying={playingId === slide.id}
//               onPlay={() => setPlayingId(slide.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeachingDetails;



import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import kidase from "../data/teachings/kidase";
import MediaSlide from "../components/Teaching/MediaSlide";
import "../styles/TeachingDetails.css";

const ITEMS_PER_PAGE = 6;

function TeachingDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [playingId, setPlayingId] = useState(null);
  const [page, setPage] = useState(1);

  if (id === "wereb") {
    return (
      <div className="wereb-placeholder-page">
        <div className="wereb-placeholder-card">
          <div className="wereb-placeholder-header">
            <h1 className="wereb-placeholder-title">የወረብ ትምህርት</h1>
            <p className="wereb-placeholder-subtitle">በቅርቡ ዝርዝር ይዘት ይቀርባል</p>
          </div>
          <img src="/wereb/wereb.jpg" alt="Wereb" className="wereb-placeholder-image" />
          <p className="wereb-placeholder-text">የ ወረብ ትምህርት በቅርቡ ይጠብቁ</p>
        </div>
      </div>
    );
  }

  const teaching = id === "kidase" ? kidase : null;
  if (!teaching) {
    return <p>{t("teachings.details.notFound")}</p>;
  }

  const totalPages = Math.ceil(teaching.slides.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleSlides = teaching.slides.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return (
    <div className="teaching-details">
      <video className="teaching-bg-video" autoPlay muted loop playsInline>
        <source src="/Teaching/teaching.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <div className="teaching-content">
        <h1 className="teaching-title">
          {t(`teachings.details.${id}.title`, {
            defaultValue: teaching.title
          })}
        </h1>
        <p className="teaching-description">
          {t(`teachings.details.${id}.description`, {
            defaultValue: teaching.description || ""
          })}
        </p>

        <div className="slides-wrapper">
          {visibleSlides.map((slide) => (
            <MediaSlide
              key={slide.id}
              slide={slide}
              isPlaying={playingId === slide.id}
              onPlay={() => setPlayingId(slide.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            {t("teachings.pagination.previous")}
          </button>

          <span>
            {t("teachings.pagination.pageOf", {
              page,
              total: totalPages
            })}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {t("teachings.pagination.next")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeachingDetails;
