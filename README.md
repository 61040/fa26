# 6.1040: Software Design

A course website for MIT's 6.1040 Software Design, built with
[Syncpress](https://github.com/mit-sdg/syncpress) and ready for GitHub Pages.

## Work locally

Syncpress requires Node.js 24.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:3000>. The checked-in `basePath` is `/` for local
preview. The deployment workflow sets `/fa26/` or the appropriate draft prefix
when publishing to GitHub Pages.

Other useful commands:

```sh
npm run build
npm run inspect -- /
```

The static build is written to `dist/`.

### Image build performance

Syncpress 0.5.1 caches verified image renditions across builds and `dev` restarts.
The Pages workflow also caches these renditions across runs. Deleting the image
cache only causes regeneration; it does not delete sources or published files.

`site.yaml` requests WebP plus exact original fallbacks, avoiding the cold-build
cost of AVIF encoding. This trades AVIF's potential download-size savings for
faster builds. Default rendition widths remain available for large instructional
screenshots. Portraits declare `sizes="200px"` to match their CSS display size,
so browsers do not choose a rendition as if each portrait filled the viewport.
Original images and PDFs are kept unchanged.

## Structure

| Path | Purpose |
| --- | --- |
| `content/` | Markdown pages, projects, and posts |
| `content/announcements/` | Announcement posts listed on the front page |
| `templates/page.html` | Shared Liquid page layout |
| `templates/announcements.html` | Front-page announcement list |
| `public/styles.css` | The complete visual theme |
| `site.yaml` | Site metadata, collections, and build settings |
| `.github/workflows/pages.yml` | GitHub Pages build and deployment |

## Announcements

Announcement posts live in `content/announcements/` as one Markdown file each:

```md
---
title: Problem Set 1 released
date: 2026-09-15
published: true
---

The one- or two-sentence summary that appears on the front page.

<!--more-->

The rest of the post, shown only on the announcement page itself.
```

| Field | Purpose |
| --- | --- |
| `title` | Heading, used on the front page and the announcement page |
| `date` | Sorts the front-page list, newest first |
| `published` | `true` lists it on the front page; `false` hides it from the list |

`published: false` only controls the front-page list. The post is still built
into `dist/announcements/<slug>/` and stays reachable at its own URL, which is
handy for staging a post or sharing a link before it goes up on the front page.

Everything above `<!--more-->` is the excerpt shown on the front page. Without
that separator the list shows the title and date only.

The front-page list is rendered by `templates/announcements.html`, which
`templates/page.html` includes on the home page. `render` names are relative
to `templates/`; if the file moves into a subdirectory, update the render name
to include that subdirectory.

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
`[link](/about/)`) but it is nicer for Obsidian and GitHub to use
relative links with Markdown extensions.
