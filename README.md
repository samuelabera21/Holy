# Orthodox Church Web App

This is a React + Vite site for Orthodox church content, including books, videos, history, and holy angel sections.

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run books:sync` - regenerate book records from `public/books` (local PDFs)

## Book PDFs (Google Drive)

Books are configured in [src/data/books.auto.js](src/data/books.auto.js). The project is currently set to use Google Drive links for all book PDFs.

Behavior:

- `አንብብ` opens the Drive `/view` page in a new tab.
- `PDF ክፈት` uses a direct download URL (Drive `usercontent` endpoint) and supports large files as much as Drive allows.

### Important

Running `npm run books:sync` will overwrite `books.auto.js` with local `/books/...` paths from `public/books`.
If you want to keep Drive-only links, do not run `books:sync`.

### Updating Drive Links

Edit the `pdfUrl` fields in [src/data/books.auto.js](src/data/books.auto.js) and paste Drive URLs in this format:

```
https://drive.google.com/file/d/<FILE_ID>/view?usp=drive_link
```

## Large PDF Downloads (Drive Limitations)

Google Drive may still show a warning page for very large files (virus scan limit). This behavior is controlled by Google Drive and cannot be fully bypassed from frontend code.
