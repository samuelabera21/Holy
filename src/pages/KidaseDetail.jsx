// import { useParams } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseDetail.css";

// function KidaseDetail() {
//   const { slideId } = useParams();

//   const slide = kidase.slides.find(
//     (s) => String(s.id) === slideId
//   );

//   if (!slide) return <p>Kidase not found</p>;

//   return (
//     <div className="kidase-detail">
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="overlay"></div>

//       <div className="content">
//         <img src={slide.image} alt={slide.caption} />
//         <h1>{slide.caption}</h1>

//         <audio controls autoPlay>
//           <source src={slide.audio} type="audio/mpeg" />
//         </audio>
//       </div>
//     </div>
//   );
// }

// export default KidaseDetail;










import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseDetail.css";

function KidaseDetail() {
  const { slideId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentIndex = kidase.slides.findIndex(
    (s) => String(s.id) === slideId
  );

  const slide = kidase.slides[currentIndex];
  if (!slide) return <p>{t("kidase.errors.kidaseNotFound")}</p>;

  const prev = kidase.slides[currentIndex - 1];
  const next = kidase.slides[currentIndex + 1];

  return (
    <div className="kidase-detail">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/Teaching/teaching.mp4" type="video/mp4" />
      </video>

      <div className="overlay" />

      <div className="content">
        <img src={slide.image} alt={slide.caption} />
        <h1>{slide.caption}</h1>

        <audio key={slide.audio} controls autoPlay>
          <source src={slide.audio} type="audio/mpeg" />
        </audio>

        <div className="kidase-nav">
          <button
            disabled={!prev}
            onClick={() => navigate(`/teachings/kidase/${prev.id}`)}
          >
            {t("kidase.pagination.previous")}
          </button>

          <span>
            {currentIndex + 1} / {kidase.slides.length}
          </span>

          <button
            disabled={!next}
            onClick={() => navigate(`/teachings/kidase/${next.id}`)}
          >
            {t("kidase.pagination.next")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default KidaseDetail;
