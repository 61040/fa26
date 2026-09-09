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
`templates/page.html` includes on the home page. Syncpress 0.2.1 does not
resolve `render` names in template subdirectories, so this include has to stay
at the templates root.

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
