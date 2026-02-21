import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getCategoryById } from "../data/books";
import { getDownloadPdfUrl, getOpenPdfUrl } from "../utils/pdfUrl";
import "../styles/Books.css";

function getCoverHue(seed = "") {
  const input = String(seed);
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = input.charCodeAt(index) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % 360;
}

function BookItem({ book }) {
  const hasCover = Boolean(book.coverUrl);
  const coverHue = getCoverHue(book.title || book.id);
  const firstCharacter = (book.title || "").trim().charAt(0) || "መ";

  return (
    <article className="book-item-card">
      <div
        className={`book-cover ${hasCover ? "has-image" : ""}`}
        style={{ "--book-cover-hue": `${coverHue}deg` }}
      >
        {hasCover ? (
          <img src={book.coverUrl} alt={book.title} loading="lazy" />
        ) : (
          <div className="book-cover-fallback">
            <span className="book-cover-kicker">Digital Library</span>
            <h5 className="book-cover-title">{book.title}</h5>
            <span className="book-cover-initial">{firstCharacter}</span>
          </div>
        )}
      </div>
      <div className="book-card-body">
        <div className="book-card-meta">
          <span className="book-tag">PDF</span>
          <span className="book-tag ghost">መጽሐፍ</span>
        </div>
        <h4>{book.title}</h4>
        {book.description ? <p>{book.description}</p> : null}
        <div className="book-item-actions">
          <a href={getOpenPdfUrl(book.pdfUrl)} target="_blank" rel="noreferrer" className="book-btn">
            አንብብ
          </a>
          <a href={getDownloadPdfUrl(book.pdfUrl)} target="_blank" rel="noreferrer" className="book-btn ghost">
            PDF ክፈት
          </a>
        </div>
      </div>
    </article>
  );
}

function BookCategoryDetails() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  if (!category) {
    return <Navigate to="/books" replace />;
  }

  const totalBooks = useMemo(() => {
    let count = category?.books?.length || 0;

    if (Array.isArray(category?.parts)) {
      for (const part of category.parts) {
        count += part.books?.length || 0;
      }
    }

    if (Array.isArray(category?.subcategories)) {
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
  }, [category]);

  const normalizedQuery = query.trim().toLowerCase();

  const renderBookGrid = (books) => {
    if (!books?.length) {
      return <p className="book-empty">እዚህ ክፍል ላይ ገና መጽሐፍ አልተጨመረም።</p>;
    }

    const filteredBooks = normalizedQuery
      ? books.filter((book) => {
          const title = book.title?.toLowerCase() || "";
          const description = book.description?.toLowerCase() || "";
          return title.includes(normalizedQuery) || description.includes(normalizedQuery);
        })
      : books;

    if (!filteredBooks.length) {
      return <p className="book-empty">የተፈለገው መጽሐፍ አልተገኘም።</p>;
    }

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      const titleA = a.title || "";
      const titleB = b.title || "";
      const result = titleA.localeCompare(titleB, "am");
      return sortOrder === "desc" ? -result : result;
    });

    return (
      <div className="book-items-grid">
        {sortedBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    );
  };

  const renderParts = (parts) => {
    if (!parts?.length) {
      return null;
    }

    return parts.map((part) => (
      <section key={part.id} className="book-part-block">
        <h4>{part.title}</h4>
        {renderBookGrid(part.books)}
      </section>
    ));
  };

  return (
    <div className="books-page">
      <header
        className="books-hero compact books-hero-banner"
        style={
          category.bannerUrl
            ? { backgroundImage: `url(${category.bannerUrl})` }
            : undefined
        }
      />

      <section className="books-section books-detail-section">
        <div className="books-toolbar">
          <div className="books-toolbar-meta">
            <span>{totalBooks} መጽሐፎች</span>
            <span>•</span>
            <span>በምድብ ውስጥ መፈለጊያ</span>
          </div>
          <div className="books-toolbar-controls">
            <select
              className="books-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort books"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <input
              type="search"
              placeholder="መጽሐፍ ይፈልጉ..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="books-search"
            />
          </div>
        </div>

        {Array.isArray(category.subcategories) ? (
          category.subcategories.map((subcategory) => (
            <section key={subcategory.id} className="book-subcategory">
              <h3>{subcategory.title}</h3>

              {subcategory.books?.length ? (
                <section className="book-part-block">
                  <h4>መጽሐፎች</h4>
                  {renderBookGrid(subcategory.books)}
                </section>
              ) : null}

              {renderParts(subcategory.parts)}

              {!subcategory.books?.length && !subcategory.parts?.length ? (
                <p className="book-empty">እዚህ ክፍል ላይ ገና መጽሐፍ አልተጨመረም።</p>
              ) : null}
            </section>
          ))
        ) : (
          <>
            {category.books?.length ? (
              <section className="book-subcategory">
                <h3>መጽሐፎች</h3>
                {renderBookGrid(category.books)}
              </section>
            ) : null}

            {category.parts?.length ? (
              <section className="book-subcategory">
                <h3>ክፍሎች</h3>
                {renderParts(category.parts)}
              </section>
            ) : null}

            {!category.books?.length && !category.parts?.length ? (
              <p className="book-empty">ይህ ምድብ ላይ ገና መጽሐፍ አልተጨመረም።</p>
            ) : null}
          </>
        )}
      </section>

    </div>
  );
}

export default BookCategoryDetails;
