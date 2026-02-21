// import { Link } from "react-router-dom";
// import "./VideoCard.css";

// function VideoCard({ video }) {
//   return (
//     <article className="video-card">
//       <Link to={`/videos/${video.id}`}>

//         {/* Thumbnail from YouTube */}
//         <div className="video-thumb">
//           <img
//             src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
//             alt={video.title}
//           />
//         </div>

//         {/* Info */}
//         <div className="video-info">
//           <h3>{video.title}</h3>
//           <p>{video.description}</p>
//         </div>

//       </Link>
//     </article>
//   );
// }

// export default VideoCard;


import { Link } from "react-router-dom";
import "./VideoCard.css";

function VideoCard({ video }) {
  return (
    <article className="video-card">
      <Link to={`/videos/${video.id}`}>

        {/* Thumbnail from YouTube */}
        <div className="video-thumb">
          <img
            src={video.thumbnail}
            alt={video.title}
          />
        </div>

        {/* Info */}
        <div className="video-info">
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>

      </Link>
    </article>
  );
}

export default VideoCard;
