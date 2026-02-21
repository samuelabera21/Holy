import { Link, Navigate, useParams } from "react-router-dom";
import { getBookByIds } from "../data/books";
import { getEmbeddablePdfUrl } from "../utils/pdfUrl";
import "../styles/Books.css";

function BookReader() {
  const { categoryId, bookId } = useParams();
  const payload = getBookByIds(categoryId, bookId);

  if (!payload?.book?.pdfUrl) {
    return <Navigate to="/books" replace />;
  }

  const { category, sectionTitle, partTitle, book } = payload;
  const readerSubtitle = partTitle
    ? `${sectionTitle} • ${partTitle}`
    : sectionTitle;

  return (
    <div className="books-page book-reader-page">
      <header className="books-hero compact">
        <nav className="books-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">መነሻ</Link>
          <span aria-hidden="true">/</span>
          <Link to="/books">መጽሐፎች</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/books/${category.id}`}>{category.title}</Link>
          <span aria-hidden="true">/</span>
          <span>{book.title}</span>
        </nav>

        <div className="books-hero-content">
          <h1>{book.title}</h1>
          <p>{readerSubtitle}</p>
        </div>
      </header>

      <section className="books-section reader-shell">
        <iframe
          title={book.title}
          src={getEmbeddablePdfUrl(book.pdfUrl)}
          className="book-reader-frame"
        />
      </section>
    </div>
  );
}

export default BookReader;
