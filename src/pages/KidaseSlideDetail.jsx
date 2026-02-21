// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseDetail.css";

// function KidaseSlideDetail() {
//   const { typeId, slideId } = useParams();
//   const navigate = useNavigate();
//   const audioRef = useRef(null);

//   const type = kidase.types.find(t => t.id === typeId);
//   if (!type) return <p>Kidase type not found</p>;

//   const index = type.slides.findIndex(
//     s => String(s.id) === slideId
//   );

//   const slide = type.slides[index];
//   if (!slide) return <p>Slide not found</p>;

//   // auto-play audio when slide changes
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play();
//     }
//   }, [slideId]);

//   return (
//     <div className="kidase-detail">
//       {/* Background video */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="overlay" />

//       <div className="content">
//         <h1>{slide.caption}</h1>

//         <img
//           src={slide.image}
//           alt={slide.caption}
//           className="kidase-image"
//         />

//         <audio ref={audioRef} controls>
//           <source src={slide.audio} type="audio/mpeg" />
//         </audio>

//         {/* Navigation */}
//         <div className="kidase-nav">
//           <button
//             disabled={index === 0}
//             onClick={() =>
//               navigate(
//                 `/teachings/kidase/${typeId}/${type.slides[index - 1].id}`
//               )
//             }
//           >
//             ◀ Previous
//           </button>

//           <button
//             disabled={index === type.slides.length - 1}
//             onClick={() =>
//               navigate(
//                 `/teachings/kidase/${typeId}/${type.slides[index + 1].id}`
//               )
//             }
//           >
//             Next ▶
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseSlideDetail;



import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypesSimple.css";
import "../styles/KidaseSlideDetailSimple.css";
import { useState } from "react";

function KidaseSlideDetail() {
  const { lang, typeId, slideId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const { t } = useTranslation();

  const language = kidase.languages[lang];
  if (!language) return <p>{t("kidase.errors.languageNotFound")}</p>;

  const type = language.types.find(t => t.id === typeId);
  if (!type) return <p>{t("kidase.errors.typeNotFound")}</p>;

  const index = type.slides.findIndex(
    s => String(s.id) === slideId
  );

  const slide = type.slides[index];
  if (!slide) return <p>{t("kidase.errors.slideNotFound")}</p>;

  const languageTitle = t(`kidase.languages.${lang}`);
  const typeTitle = t(`kidase.content.${lang}.types.${typeId}.title`);
  const slideCaption = t(
    `kidase.content.${lang}.types.${typeId}.slides.${slide.id}.caption`
  );
  const heroImage = "/kidase/geez/hero.png";

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    // load metadata but do not autoplay — wait for user action
    a.load();
    try {
      a.pause();
    } catch (e) {
      // ignore
    }
    setPlaying(false);
    setCurrentTime(0);
  }, [slideId]);

  // enhanced audio state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setCurrentTime(a.currentTime || 0);
    const onLoaded = () => setDuration(a.duration || 0);
    const onEnded = () => setPlaying(false);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("ended", onEnded);
    };
  }, [audioRef.current]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  };

  const seek = (seconds) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min((a.currentTime || 0) + seconds, duration || 9999));
  };

  const onVolume = (val) => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = val;
    setVolume(val);
  };

  return (
    <div className="kidase-simple-page kidase-slide-simple">
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
          <Link to={`/teachings/kidase/${lang}/${typeId}`}>{typeTitle}</Link>
          <span aria-hidden="true">/</span>
          <span>{slideCaption}</span>
        </nav>

        <div className="kidase-types-hero-content">
          <h1>{slideCaption}</h1>
          <p>{t("kidase.slide.heroSubtitle")}</p>
        </div>
      </header>

      <div className="container">
        <header className="page-header">
          <h2>{t("kidase.slide.lessonTitle")}</h2>
          <p className="subtitle">{t("kidase.slide.lessonSubtitle")}</p>
        </header>

        <main className="ks-main">
          <figure className="ks-figure">
            <img src={slide.image} alt={slideCaption} className="ks-image" />
            <figcaption className="ks-credit">{slideCaption}</figcaption>
          </figure>

          <div className="ks-audio">
            <audio ref={audioRef} preload="metadata">
              <source src={slide.audio} type="audio/mpeg" />
            </audio>

            <div className="ks-controls">
              <button
                onClick={() => seek(-10)}
                aria-label={t("kidase.slide.rewind")}
              >
                ⟲ 10s
              </button>
              <button
                onClick={togglePlay}
                aria-label={playing ? t("kidase.slide.pause") : t("kidase.slide.play")}
              >
                {playing ? t("kidase.slide.pause") : t("kidase.slide.play")}
              </button>
              <button
                onClick={() => seek(10)}
                aria-label={t("kidase.slide.forward")}
              >
                10s ⟳
              </button>

              <div className="ks-time">
                <span>{Math.floor(currentTime) || 0}s</span>
                <span> / </span>
                <span>{isFinite(duration) && duration ? Math.floor(duration) : "--"}s</span>
              </div>

              <label className="ks-volume">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onVolume(Number(e.target.value))}
                  aria-label={t("kidase.slide.volume")}
                />
              </label>

              {slide.audio && (
                <a
                  className="ks-download"
                  href={slide.audio}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("kidase.slide.download")}
                </a>
              )}
            </div>
          </div>

          <div className="ks-nav">
            <button
              disabled={index === 0}
              onClick={() =>
                navigate(
                  `/teachings/kidase/${lang}/${typeId}/${type.slides[index - 1].id}`
                )
              }
            >
              {t("kidase.pagination.previous")}
            </button>

            <button
              disabled={index === type.slides.length - 1}
              onClick={() =>
                navigate(
                  `/teachings/kidase/${lang}/${typeId}/${type.slides[index + 1].id}`
                )
              }
            >
              {t("kidase.pagination.next")}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KidaseSlideDetail;
