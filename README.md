# Bruno Senzio-Savino — Portfolio Website

A personal portfolio presenting Bruno Senzio-Savino Barzellato’s research, projects, publications, and writing. The site combines an interactive arcade-inspired homepage with dedicated project, publication, and blog pages.

## Pages

- `index.html` — homepage, résumé and portfolio links, skill cards, arcade, career timeline, featured projects, and latest blog stories.
- `projects.html` — interactive project observatory with category filters, map and collection views, and project details.
- `publications.html` — searchable catalog of publications, patents, theses, talks, workshops, and other academic activities.
- `blog.html` — searchable and filterable stories with an interactive carousel and individual story reader.

## Project structure

```text
.
├── index.html
├── projects.html
├── publications.html
├── blog.html
├── css/
│   ├── style.css                 # Shared site styles
│   └── pages/                    # Styles specific to each page
└── js/
    ├── index.js                  # Homepage behavior and data
    ├── projects.js               # Project catalog and observatory
    ├── publications.js           # Publication catalog and filters
    └── blog.js                   # Blog entries, filters, and reader
```

The page-specific CSS files live in `css/pages/`. Keep the relative paths intact when moving or deploying the files. Each HTML page loads its corresponding JavaScript bundle; shared libraries and visual components are loaded by those page bundles or from the existing external providers.

## Run locally

Use a local HTTP server from the project root so browser requests for scripts, story text, and WebGL resources work as expected.

With Python 3:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>. Do not launch the site from a subfolder unless that folder contains the complete site structure and its `assets/` directory.

## Required assets

The HTML and JavaScript expect the project’s existing `assets/` directory. It contains images, backgrounds, 3D models, résumé and portfolio PDFs, blog story files, audio effects, ROMs, and other media. Keep this directory beside the four HTML pages.

The optional Unity WebGL game is loaded from `unity/staygood/index.html`; its `Build/` directory must remain at `unity/staygood/Build/`. If you use Stay Good, include the full `unity/` directory when running or deploying the site. Unity WebGL content should be served over HTTP or HTTPS rather than opened as a `file://` URL.

Some visual and document features also use third-party resources loaded from their configured CDN URLs, including Font Awesome, Google Fonts, the 3D model viewer, and the PDF-generation library. Those features require an internet connection unless you replace those dependencies with local copies.

## Content updates

- Add or edit projects in `js/projects.js`.
- Add or edit publication records in `js/publications.js`.
- Add blog entries and their story-file references in `js/blog.js` and the corresponding files under `assets/blog/`.
- Update career history in `js/index.js`.

Keep filenames and data fields consistent with the existing entries so the filters, links, thumbnails, and detail views continue to work.

## Formatting

The HTML, CSS, and JavaScript use [Prettier](https://prettier.io/) formatting. The repository includes `.prettierrc.json` with the formatting preferences used for these files.

To check formatting after making changes:

```bash
npx prettier --check "*.html" "css/**/*.css" "js/*.js"
```

To format them:

```bash
npx prettier --write "*.html" "css/**/*.css" "js/*.js"
```

Check JavaScript syntax with Node.js:

```bash
for file in js/*.js; do node --check "$file"; done
```

## Deployment

Deploy the complete site tree to the web root of a static host. Preserve the `css/`, `js/`, `assets/`, and optional `unity/` directories. The homepage is `index.html`; the other pages use the filenames shown above. GitHub Pages can serve the site directly from a repository root or a configured publishing directory.
