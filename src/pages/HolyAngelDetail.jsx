// import { useParams } from "react-router-dom";
// import angels from "../data/holy/holyAngels";

// function HolyAngelDetail() {
//   const { id } = useParams();

//   const angel = angels.find((a) => a.id === id);

//   if (!angel) return <h2>Angel Not Found</h2>;

//   return (
//     <section className="angel-detail">
//       <h1>{angel.name}</h1>
//       <h3>{angel.amharicName}</h3>

//       <img src={angel.image} alt={angel.name} />

//       <div className="description">
//         <h4>Amharic</h4>
//         <p>{angel.descriptionAm}</p>

//         <h4>English</h4>
//         <p>{angel.descriptionEn}</p>
//       </div>
//     </section>
//   );
// }

// export default HolyAngelDetail;





// import { useParams } from "react-router-dom";
// import holyAngels from "../data/holy/holyAngels";
// import "../styles/holy/HolyDetail.css";

// function HolyAngelDetail() {
//   const { id } = useParams();

//   const angel = holyAngels.find((a) => a.id === id);

//   if (!angel) {
//     return (
//       <section className="angel-detail">
//         <h2>Angel Not Found</h2>
//       </section>
//     );
//   }

//   return (
//     <section className="angel-detail">
//       <div className="detail-hero">
//         <h1>{angel.name}</h1>
//         <h3>{angel.amharic}</h3>
//       </div>

//       <div className="detail-body">
//         <img src={angel.image} alt={angel.name} />

//         <div className="description">
//           <h4>Meaning</h4>
//           <p>{angel.meaning}</p>

//           <h4>English</h4>
//           <p>{angel.descriptionEn}</p>

//           <h4>Amharic</h4>
//           <p>{angel.descriptionAm}</p>
//         </div>
//       </div>

//       {angel.video && (
//         <video controls poster={angel.image}>
//           <source src={angel.video} type="video/mp4" />
//         </video>
//       )}
//     </section>
//   );
// }

// export default HolyAngelDetail;







import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import holyAngels from "../data/holy/holyAngels";
import "../styles/holy/HolyAngelDetail.css";

function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();
    let videoId = "";

    if (host.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    } else if (host.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v") || "";

      if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/embed/")[1] || "";
      }

      if (!videoId && parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/shorts/")[1] || "";
      }
    }

    if (!videoId) return null;

    const cleanVideoId = videoId.split(/[?&/]/)[0];
    return cleanVideoId ? `https://www.youtube.com/embed/${cleanVideoId}` : null;
  } catch {
    return null;
  }
}

function HolyAngelDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isAm = i18n.language?.startsWith("am");

  const angel = holyAngels.find((a) => a.id === id);

  if (!angel) {
    return (
      <section className="holy-angel-detail-page">
        <header className="holy-angel-detail-hero">
          <nav className="holy-angel-detail-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{t("holyAngelDetail.breadcrumbs.home")}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/holy-angels">{t("holyAngelDetail.breadcrumbs.holyAngels")}</Link>
            <span aria-hidden="true">/</span>
            <span>{t("holyAngelDetail.notFound.breadcrumb")}</span>
          </nav>

          <div className="holy-angel-detail-hero-content">
            <h1>{t("holyAngelDetail.notFound.title")}</h1>
            <p>{t("holyAngelDetail.notFound.subtitle")}</p>
          </div>
        </header>
      </section>
    );
  }

  const enName = t(`holyAngels.items.${angel.id}.name`, {
    lng: "en",
    defaultValue: ""
  });
  const amName = t(`holyAngels.items.${angel.id}.amharicName`, {
    lng: "am",
    defaultValue: ""
  });
  const shortDescription = t(`holyAngels.items.${angel.id}.shortDescription`, {
    defaultValue: ""
  });
  const shortDescriptionFallback = isAm
    ? t(`holyAngels.items.${angel.id}.shortDescription`, {
        lng: "en",
        defaultValue: ""
      })
    : t(`holyAngels.items.${angel.id}.shortDescription`, {
        lng: "am",
        defaultValue: ""
      });
  const descriptionAm = t(`holyAngels.items.${angel.id}.descriptionAm`, {
    lng: "am",
    defaultValue: ""
  });
  const descriptionEn = t(`holyAngels.items.${angel.id}.descriptionEn`, {
    lng: "en",
    defaultValue: ""
  });
  const displayName = (isAm ? amName : enName) || (isAm ? enName : amName);
  const displayDescription = (isAm ? descriptionAm : descriptionEn) ||
    (isAm ? descriptionEn : descriptionAm);
  const displayShortDescription = shortDescription || shortDescriptionFallback;
  const sectionTitle = isAm
    ? t("holyAngelDetail.sections.amharic")
    : t("holyAngelDetail.sections.english");
  const youtubeEmbedUrl = getYoutubeEmbedUrl(angel.video);

  return (
    <section className="holy-angel-detail-page">
      <header className="holy-angel-detail-hero">
        <nav className="holy-angel-detail-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("holyAngelDetail.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/holy-angels">{t("holyAngelDetail.breadcrumbs.holyAngels")}</Link>
          <span aria-hidden="true">/</span>
          <span>{displayName}</span>
        </nav>

        <div className="holy-angel-detail-hero-content">
          <h1>{displayName}</h1>
        </div>
      </header>

      <div className="holy-angel-detail-container">
        <div className="holy-angel-detail-body">
          <div className="holy-angel-detail-media">
            <img src={angel.image} alt={displayName} />

            {angel.video &&
              (youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={`${displayName} video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <video controls poster={angel.image}>
                  <source src={angel.video} type="video/mp4" />
                  {t("holyAngelDetail.videoFallback")}
                </video>
              ))}
          </div>

          <div className="holy-angel-detail-text">
            <h2>{t("holyAngelDetail.aboutTitle")}</h2>
            {displayShortDescription && <p>{displayShortDescription}</p>}

            {displayDescription && (
              <div className="holy-angel-detail-section">
                <h3>{sectionTitle}</h3>
                <p>{displayDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HolyAngelDetail;
