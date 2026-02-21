import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import events from "../data/events";
import "../styles/EventDetail.css";

function EventDetail() {
  const { t } = useTranslation();
  const { id } = useParams();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <section className="event-detail-page">
        <div className="event-detail-container">
          <h2>{t("eventsDetail.notFound")}</h2>
        </div>
      </section>
    );
  }

  const eventTitle = t(`home.events.items.${event.id}.title`);
  const eventDate = t(`home.events.items.${event.id}.date`);
  const eventDescValue = t(`home.events.items.${event.id}.desc`, {
    returnObjects: true
  });
  const eventDescParts = Array.isArray(eventDescValue)
    ? eventDescValue
    : [eventDescValue];

  return (
    <section className="event-detail-page">
      <header className="event-detail-hero">
        <nav className="event-detail-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("eventsDetail.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/events">{t("eventsDetail.breadcrumbs.events")}</Link>
          <span aria-hidden="true">/</span>
          <span>{eventTitle}</span>
        </nav>

        <div className="event-detail-hero-content">
          <h1>{eventTitle}</h1>
          <p className="event-detail-date">{eventDate}</p>
        </div>
      </header>

      <div className="event-detail-container">
        <div className="event-detail-body">
          <div className="event-detail-media">
            {event.video ? (
              <video controls poster={event.image}>
                <source src={event.video} type="video/mp4" />
                {t("eventsDetail.videoFallback")}
              </video>
            ) : (
              <img src={event.image} alt={eventTitle} />
            )}
          </div>

          <div className="event-detail-text">
            <h2>{t("eventsDetail.about")}</h2>
            {eventDescParts.map((part, partIndex) => (
              <p key={`${event.id}-desc-${partIndex}`}>{part}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetail;
