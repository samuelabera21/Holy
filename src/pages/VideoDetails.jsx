// import { useParams } from "react-router-dom";
// import videos from "../data/videos.json";
// import "../styles/VideoDetails.css";

// function VideoDetails() {
//   const { id } = useParams();
//   const video = videos.find(v => v.id === id);

//   if (!video) {
//     return <h2 className="video-not-found">Video not found</h2>;
//   }

//   return (
//     <main className="video-details">
//       <div className="video-details-container">
//         <div className="video-image">
//           <img src={video.thumbnail} alt={video.title} />
//         </div>

//         <div className="video-content">
//           <h1>{video.title}</h1>
//           <p>{video.description}</p>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default VideoDetails;




// import { useParams } from "react-router-dom";
// import videos from "../data/videos.json";
// import "../styles/VideoDetails.css";

// function VideoDetails() {
//   const { id } = useParams();
//   const video = videos.find(v => v.id === id);

//   if (!video) {
//     return <h2>Video not found</h2>;
//   }

//   return (
//     <main className="video-details">
//       <h1>{video.title}</h1>

//       <div className="video-player">
//         <iframe
//           src={`https://www.youtube.com/embed/${video.youtubeId}`}
//           title={video.title}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//       </div>

//       <p className="video-description">{video.description}</p>
//     </main>
//   );
// }

// export default VideoDetails;



// import { useParams } from "react-router-dom";
// import videos from "../data/videos.json";
// import "../styles/VideoDetails.css";

// function VideoDetails() {
//   const { id } = useParams();
//   const video = videos.find(v => v.id === id);

//   if (!video) {
//     return <h2 className="video-not-found">Video not found</h2>;
//   }

//   return (
//     <main className="video-details">
//       <div className="video-details-container">

//         {/* Video player */}
//         <div className="video-player">
//           <iframe
//             src={`https://www.youtube.com/embed/${video.youtubeId}`}
//             title={video.title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>

//         {/* Video info (YOUR data, not YouTube’s) */}
//         <div className="video-info">
//           <h1>{video.title}</h1>

//           {/* Manual thumbnail preview */}
//           <img
//             src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
//             alt={video.title}
//             className="video-thumbnail"
//           />

//           <p>{video.description}</p>
//         </div>

//       </div>
//     </main>
//   );
// }

// export default VideoDetails;







// import { useParams } from "react-router-dom";
// import videos from "../data/videos.json";
// import VideoCard from "../components/videos/VideoCard";
// import "../styles/VideoDetails.css";

// function VideoDetails() {
//   const { id } = useParams();

//   // main video
//   const video = videos.find(v => v.id === id);

//   // related videos (exclude current one)
//   const relatedVideos = videos.filter(v => v.id !== id);

//   if (!video) {
//     return <h2 className="video-not-found">Video not found</h2>;
//   }

//   return (
//     <main className="video-details">
//       {/* Main video */}
//       <h1>{video.title}</h1>

//       <div className="video-player">
//         <iframe
//           src={`https://www.youtube.com/embed/${video.youtubeId}`}
//           title={video.title}
//           allowFullScreen
//         />
//       </div>

//       <p className="video-description">{video.description}</p>

//       {/* Related videos */}
//       <section className="related-videos">
//         <h2>Related Videos</h2>

//         <div className="videos-grid">
//           {relatedVideos.map(v => (
//             <VideoCard key={v.id} video={v} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default VideoDetails;







// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchChannelVideos } from "../services/youtube";
// import VideoCard from "../components/videos/VideoCard";
// import "../styles/VideoDetails.css";

// function VideoDetails() {
//   const { id } = useParams();
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchChannelVideos(9).then(data => {
//       setVideos(data);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   const video = videos.find(v => v.youtubeId === id);
//   const relatedVideos = videos.filter(v => v.youtubeId !== id);

//   if (!video) return <h2>Video not found</h2>;

//   return (
//     <main className="video-details">
//       <h1>{video.title}</h1>

//       <div className="video-player">
//         <iframe
//           src={`https://www.youtube.com/embed/${video.youtubeId}`}
//           title={video.title}
//           allowFullScreen
//         />
//       </div>

//       <p className="video-description">{video.description}</p>

//       <section className="related-videos">
//         <h2>Related Videos</h2>
//         <div className="videos-grid">
//           {relatedVideos.map(v => (
//             <VideoCard key={v.id} video={v} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default VideoDetails;












import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchChannelVideos } from "../services/youtube";
import VideoCard from "../components/videos/VideoCard";
import "../styles/VideoDetails.css";

function VideoDetails() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadVideos() {
      const result = await fetchChannelVideos(9);

      if (result.status === "error") {
        setStatusMessage({
          key: result.messageKey,
          fallback: result.message
        });
      }

      if (result.status === "warning") {
        setStatusMessage({
          key: result.messageKey,
          fallback: result.message
        });
      }

      if (result.status === "ok") {
        setStatusMessage(null);
      }

      setVideos(result.data);
      setLoading(false);
    }

    loadVideos();
  }, []);

  if (loading) {
    return (
      <main className="video-details-page">
        <header className="video-details-hero">
          <nav className="video-details-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{t("videoDetails.breadcrumbs.home")}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/videos">{t("videoDetails.breadcrumbs.videos")}</Link>
            <span aria-hidden="true">/</span>
            <span>{t("videoDetails.status.loadingBreadcrumb")}</span>
          </nav>

          <div className="video-details-hero-content">
            <h1>{t("videoDetails.status.loadingTitle")}</h1>
            <p>{t("videoDetails.status.loadingSubtitle")}</p>
          </div>
        </header>

        <div className="video-details-container">
          <p className="status-message">
            {t("videoDetails.status.loadingMessage")}
          </p>
        </div>
      </main>
    );
  }

  const video = videos.find(v => v.id === id);
  const relatedVideos = videos.filter(v => v.id !== id);

  if (!video) {
    return (
      <main className="video-details-page">
        <header className="video-details-hero">
          <nav className="video-details-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{t("videoDetails.breadcrumbs.home")}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/videos">{t("videoDetails.breadcrumbs.videos")}</Link>
            <span aria-hidden="true">/</span>
            <span>{t("videoDetails.status.notFoundBreadcrumb")}</span>
          </nav>

          <div className="video-details-hero-content">
            <h1>{t("videoDetails.status.notFoundTitle")}</h1>
            <p>{t("videoDetails.status.notFoundSubtitle")}</p>
          </div>
        </header>

        <div className="video-details-container">
          <p className="status-message status-error">
            {t("videoDetails.status.notFoundMessage")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="video-details-page">
      <header className="video-details-hero">
        <nav className="video-details-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("videoDetails.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/videos">{t("videoDetails.breadcrumbs.videos")}</Link>
          <span aria-hidden="true">/</span>
          <span>{video.title}</span>
        </nav>

        <div className="video-details-hero-content">
          <h1>{video.title}</h1>
          <p>{t("videoDetails.hero.subtitle")}</p>
        </div>
      </header>

      <div className="video-details-container">
        <div className="video-details-body">
          <div className="video-details-player">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allowFullScreen
            />
          </div>

          <aside className="video-details-info">
            <h2>{t("videoDetails.aboutTitle")}</h2>
            <p className="video-description">{video.description}</p>

            {statusMessage && (
              <p className="status-message status-warning">
                {t(statusMessage.key, {
                  defaultValue: statusMessage.fallback
                })}
              </p>
            )}
          </aside>
        </div>

        <section className="related-videos">
          <header className="related-header">
            <h2>{t("videoDetails.related.title")}</h2>
            <p>{t("videoDetails.related.subtitle")}</p>
          </header>

          <div className="videos-grid">
            {relatedVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default VideoDetails;








// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchChannelVideos } from "../services/youtube";
// import VideoCard from "../components/videos/VideoCard";

// function VideoDetails() {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function load() {
//       const result = await fetchChannelVideos({ maxResults: 12 });

//       if (result.status === "error") {
//         setError(result.message);
//         return;
//       }

//       const current = result.data.find(v => v.id === id);
//       const others = result.data.filter(v => v.id !== id);

//       setVideo(current);
//       setRelated(others);
//     }

//     load();
//   }, [id]);

//   if (!video) return <p>Loading...</p>;

//   return (
//     <main className="video-details">
//       <h1>{video.title}</h1>

//       <iframe
//         src={`https://www.youtube.com/embed/${video.id}`}
//         title={video.title}
//         allowFullScreen
//       />

//       <p>{video.description}</p>

//       <h2>Related Videos</h2>

//       {error && <p className="warning">{error}</p>}

//       <div className="videos-grid">
//         {related.map(v => (
//           <VideoCard key={v.id} video={v} />
//         ))}
//       </div>
//     </main>
//   );
// }

// export default VideoDetails;
