import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import { bookCategories } from "../data/books";
import "../styles/reveal.css";
import "../styles/Books.css";

function Books() {
  useGlobalReveal(".books-page");
  const { t } = useTranslation();

  const getBookCount = (category) => {
    let count = category.books?.length || 0;

    if (Array.isArray(category.parts)) {
      for (const part of category.parts) {
        count += part.books?.length || 0;
      }
    }

    if (Array.isArray(category.subcategories)) {
      for (const subcategory of category.subcategories) {
        count += subcategory.books?.length || 0;

        if (Array.isArray(subcategory.parts)) {
          for (const part of subcategory.parts) {
            count += part.books?.length || 0;
          }
        }
      }
    }

    return count;
  };

  return (
    <div className="books-page">
      <header className="books-hero" id="books-top">
        <nav className="books-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("teachings.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <span>መጽሐፎች</span>
        </nav>

        <div className="books-hero-content">
          <h1>መጽሐፎች</h1>
          <p>
            ከስር ያሉ ምድቦችን ይምረጡ፣ ከዚያ የፒዲኤፍ መጽሐፎችን በጣቢያው ውስጥ ያንብቡ።
          </p>
        </div>
      </header>

      <section className="books-section">
        <div className="books-grid">
          {bookCategories.map((category) => (
            <Link
              key={category.id}
              to={`/books/${category.id}`}
              className="books-card"
            >
              <span className="books-card-badge">{getBookCount(category)} መጽሐፎች</span>
              <div
                className="books-card-cover"
                style={
                  category.bannerUrl
                    ? { backgroundImage: `url(${category.bannerUrl})` }
                    : undefined
                }
              >
                <span>{category.title}</span>
              </div>
              <div className="books-card-content">
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
              <span className="books-card-link">ክፈት ምድብ →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Books;
