// function InEthiopia() {
//   return (
//     <section className="history-section">
//       <h2>Orthodox Christianity in Ethiopia</h2>
//       <p>
//         This section will describe how Christianity reached Ethiopia, who introduced it,
//         and how it became deeply rooted in Ethiopian culture.
//       </p>
//     </section>
//   );
// }

// export default InEthiopia;


import { useTranslation } from "react-i18next";
import "../../styles/history/InEthiopia.css";

function InEthiopia() {
  const { t } = useTranslation();
  const videoSrc = `https://www.youtube-nocookie.com/embed/IxbW1JiskFs?rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <section className="history-ethiopia" id="history-ethiopia">
      <div className="ethiopia-container">
        {/* Text */}
        <div className="ethiopia-text">
          <h2>
            {t("history.ethiopia.title", {
              defaultValue: "Orthodoxy in Ethiopia"
            })}
          </h2>
          <p>
            {t("history.ethiopia.paragraphs.0", {
              defaultValue:
                "Christianity reached Ethiopia in the early centuries through apostolic tradition. The Ethiopian Orthodox Tewahedo Church became a pillar of faith, culture, and national identity."
            })}
          </p>

          <p>
            {t("history.ethiopia.paragraphs.1", {
              defaultValue:
                "For centuries, the Church preserved scripture, tradition, and spiritual life, shaping Ethiopian history and civilization."
            })}
          </p>
        </div>

        {/* Image placeholder */}
        <div className="ethiopia-image">
          <div className="image-box">
            <iframe
              className="ethiopia-video"
              src={videoSrc}
              title="Orthodox history"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InEthiopia;
