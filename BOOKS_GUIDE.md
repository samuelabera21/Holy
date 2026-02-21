# Books Import Guide

This project now supports **bulk PDF import** from `public/books`.

## 1) Folder structure

Use this structure (already created):

- `public/books/gubae-bet/akwam/akwam-basic/`
- `public/books/gubae-bet/kine/`
- `public/books/gubae-bet/kidase/`
- `public/books/timhirte-haymanot/`

## 2) Add PDFs

Copy your local PDF files into the correct folder.

Optional (for book cover images):
- Add `cover.jpg` (or `cover.png`) in the same folder as the PDF.
- You can also use the same name as the PDF (example: `my-book.pdf` + `my-book.jpg`).

Example:
- `public/books/gubae-bet/akwam/akwam-basic/book-1.pdf`
- `public/books/gubae-bet/kidase/book-2.pdf`
- `public/books/timhirte-haymanot/introduction.pdf`

## 3) Sync books

Run:

```bash
npm run books:sync
```

This generates `src/data/books.auto.js` automatically.

## 4) Start app

```bash
npm run dev
```

Open `/books` and test the read/open buttons.

---

## Notes

- Do **not** use `C:\...` or `D:\...` in data.
- Just place PDFs in `public/books/...` and run sync.
- File name becomes book title automatically (e.g. `my-first-book.pdf` -> `My first book`).
- If you rename or remove a PDF, run `npm run books:sync` again.
