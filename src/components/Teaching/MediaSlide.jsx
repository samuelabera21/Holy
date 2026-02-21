// import { useEffect, useRef } from "react";
// import "./MediaSlide.css";


// function MediaSlide({ slide, isPlaying, onPlay }) {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   }, [isPlaying]);

//   return (
//     <div className="media-slide">
//       <img src={slide.image} alt={slide.caption} />
//       <p>{slide.caption}</p>

//       <audio
//         ref={audioRef}
//         controls
//         onPlay={onPlay}
//       >
//         <source src={slide.audio} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }

// export default MediaSlide;






// import { useEffect, useRef } from "react";
// import "./MediaSlide.css";

// function MediaSlide({ slide, isPlaying, onPlay }) {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   }, [isPlaying]);

//   return (
//     <div className="media-card">
//       <div className="media-image">
//         <img src={slide.image} alt={slide.caption} />
//       </div>

//       <div className="media-body">
//         <h3>{slide.caption}</h3>

//         <audio
//           ref={audioRef}
//           controls
//           onPlay={onPlay}
//         >
//           <source src={slide.audio} type="audio/mpeg" />
//         </audio>
//       </div>
//     </div>
//   );
// }

// export default MediaSlide;




import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./MediaSlide.css";

function MediaSlide({ slide }) {
  const { t } = useTranslation();

  return (
    <Link to={`/teachings/kidase/${slide.id}`} className="media-card">
      <div className="media-image">
        <img src={slide.image} alt={slide.caption} />
      </div>

      <div className="media-body">
        <h3>{slide.caption}</h3>
        <span className="play-hint">▶ {t("teachings.media.listen")}</span>
      </div>
    </Link>
  );
}

export default MediaSlide;
