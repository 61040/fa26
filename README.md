# 6.1040: Software Design

A course website for MIT's 6.1040 Software Design, built with
[Syncpress](https://github.com/mit-sdg/syncpress) and ready for GitHub Pages.

## Use this template

1. Select **Use this template** on GitHub and create a public repository.
2. In the new repository, open **Settings → Pages** and select **GitHub Actions**
   as the source.
3. Edit `site.yaml`, the Markdown files in `content/`, and `public/styles.css`.
4. Push to `main`. The Pages workflow builds and publishes the site.

The workflow derives the production URL from the repository owner and name, so
you do not need to update `origin` or `basePath` after creating a repository from
this template.

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
