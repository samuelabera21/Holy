import "./VideoSkeleton.css";

function VideoSkeleton() {
  return (
    <article className="video-card skeleton">
      <div className="video-thumb skeleton-box" />
      <div className="video-info">
        <div className="skeleton-line title" />
        <div className="skeleton-line text" />
      </div>
    </article>
  );
}

export default VideoSkeleton;
