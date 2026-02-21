import { useNavigate, useLocation } from "react-router-dom";
import "./BackButton.css";

function BackButton({ alwaysShow = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = typeof window !== "undefined" && window.history.length > 1 && location.pathname !== "/";
  if (!canGoBack && !alwaysShow) return null;

  return (
    <button
      className="back-button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      title="Go back"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default BackButton;
