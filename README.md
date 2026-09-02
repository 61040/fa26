# 6.1040: Software Design

A course website for MIT's 6.1040 Software Design, built with
[Syncpress](https://github.com/mit-sdg/syncpress) and ready for GitHub Pages.

## Work locally

Syncpress requires Node.js 24.

```sh
npm install
npm run dev
```

Open <http://127.0.0.1:3000>. The checked-in `basePath` matches this template's
published URL; change it to `/` in `site.yaml` while previewing if you want local
links to use the server root.

Other useful commands:

```sh
npm run build
npm run inspect -- /
```

The static build is written to `dist/`.

## Structure

| Path | Purpose |
| --- | --- |
| `content/` | Markdown pages, projects, and posts |
| `templates/page.html` | Shared Liquid page layout |
| `public/styles.css` | The complete visual theme |
| `site.yaml` | Site metadata, collections, and build settings |
| `.github/workflows/pages.yml` | GitHub Pages build and deployment |

## Draft deployments

The deployment action script has a special feature allowing authors to publish
git branches to a public URL, so long as the branch name is prefixed with
`draft/` (e.g. `draft/new-assignment-page`). The branch will be visible at
`<BASE_URL>/draft/new-assigment-page/`, e.g.
`https://61040.github.io/fa26/draft/new-assignment-page/schedule`.

## Link syntax
- Link to other Markdown content files using relative links: `[link](about.md)`, `[link](./about.md)`, `[link](../posts/start.md)`, `[link](subfolder/index.md)`
- Link to non-Markdown files using absolute links: `[style](/styles.css)`

Absolute links are always OK (for content files, don't include the extension:
`[link](/about)`) but it is nicer for Obsidian and GitHub to use
relative links with Markdown extensions.
