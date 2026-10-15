---
title: Deploying your app on 6.1040 Apps
description: Put your app online on the class platform, with its own address, database, and logs.
---

With [6.1040 Apps](https://mit-sdg.dev), the class platform, you can put your app online at `https://<name>.mit-sdg.dev`. You pick a commit on GitHub, and the platform builds and runs it. You can add a database and read the logs on the same site. The platform also restarts your app if it crashes. Once it's running, your classmates, or anyone else, can try it.

This guide follows on from [Developing a sync-engine app locally](sync-engine-local-dev.md). The screenshots use an app called `reservations` as a worked example; use your own app's repository and settings. How much preparation you need depends on what you've already set up. Start with the checks below, test and push your changes, then follow the numbered steps. The deployment itself takes 10 to 20 minutes, most of which you can spend away from the page.

<nav class="toc" id="contents" aria-label="Table of contents">

**Contents**

- [Before you start](#prepare)
- [1. Sign in](#platform-sign-in)
- [2. Create the app](#create)
- [3. Fill in the settings](#settings)
- [4. Add a database and your variables](#variables)
- [5. Deploy](#deploy)
- [6. Manage your app](#manage)
- [If something goes wrong](#troubleshooting)
- [More](#more)

</nav>

<h2 id="prepare">Before you start</h2>

The platform builds and runs your app from a commit on GitHub. It runs `bun install` in each folder you list, then your build script, then your start script. These instructions use the Bun runtime, which doesn't include Node.js. You won't run Vite's development server on the platform either; your app will serve the built pages instead. The platform doesn't use your local `Dockerfile`, `compose.yaml`, or `.env`. You'll enter the deployment settings and environment variables on the site.

Keep demo videos out of your repository. The files in the commit you deploy must total at most **50 MB**; larger commits are rejected before the build starts. Upload videos to Google Drive or YouTube and put a link in your README or project page instead. Check that classmates and course staff can open the link. If you've already committed a video, follow [Remove a committed video](#source-size).

If you copied [ConceptBox](#conceptbox) or kept the [local guide's plain TypeScript frontend](#typescript), open those instructions first. You can skip most of the checks below.

For a Vue frontend, read each check. If it already matches your code, you can leave the section closed. If not, or if you're unsure, open it for instructions and an explanation. You can also give a coding agent this page's address and ask it to follow "Before you start".

<details>
<summary>If your whole app is a copy of ConceptBox</summary>
<div id="conceptbox"></div>

Check the [Bun version](#bun), then skip the Vue checks. Leave `.db("conceptbox")` unchanged. It names only the local in-memory database; with the platform's MongoDB, ConceptBox calls `client.db()` with no name.

When you reach [Try it and push](#test), first run `bun run storage:setup` once if you haven't run ConceptBox locally before, as its README describes. Then run `bun run storage` in a second terminal and leave it running for the local preview. Add this `preview` script to the root `package.json`:

```json
    "preview": "bun run build && NODE_ENV=production PORT=3000 PUBLIC_ORIGIN=http://localhost:3000 bun run start",
```

Use `localhost` in the addresses you open; local file storage accepts uploads only from `localhost`. In [step 4](#variables), add MongoDB and [S3 storage](#s3), and keep the suggested variable names for both.

</details>

<details>
<summary>If you kept the local guide's plain TypeScript frontend</summary>
<div id="typescript"></div>

The local guide's app runs two servers and has no separate build step. Bun builds the page when the frontend server first serves it. Run `bun --version`; if it's older than 1.3.9, run `bun upgrade` so you can use `bun run --parallel` to start both servers.

Check the [Bun version](#bun). If your app uses cookie-based sign-in, also follow [If you use cookie-based sign-in](#sign-in), with `http://127.0.0.1:8080` as the default address. You can skip the other Vue checks and keep your existing scripts. In [step 3](#settings), use `.` alone for **Package directories** and leave **Build script** empty.

The `start` script runs both servers with `bun run --parallel`. The frontend listens on `PORT` at `0.0.0.0`, and the backend stays on `127.0.0.1:4000`, so don't pick 4000 for **Port**. The frontend passes `/health` to the backend, so the health check covers the frontend, backend, and database.

For [Try it and push](#test), add this `preview` script to the root `package.json`:

```json
    "preview": "bun run db:up && NODE_ENV=production PORT=3000 PUBLIC_ORIGIN=http://127.0.0.1:3000 bun run start",
```

If Windows asks whether to let Bun through the firewall, click **Cancel**; the app still works on your computer.

With `NODE_ENV=production`, Bun builds the page once, as it will on the platform, instead of rebuilding it for every change.

<figure class="guide-step">
  <img src="assets/deploying-apps/logs.png" alt="Logs showing the reservations app's start command, backend listening on 127.0.0.1:4000, and frontend listening on 0.0.0.0:3000">
  <figcaption>On the platform, <strong>Logs</strong> shows both servers starting, with the frontend on the port visitors reach.</figcaption>
</figure>

</details>

<details>
<summary><strong>Bun version:</strong> does <code>packageManager</code> in the root <code>package.json</code> match <code>bun --version</code>?</summary>
<div id="bun"></div>

Run `bun --version` and set `packageManager` in the root `package.json` to that version. For example, if it prints `1.4.0`:

```json
  "packageManager": "bun@1.4.0",
```

The platform installs and runs your app with this exact version of Bun. `sync-engine setup` wrote `bun@1.3.4`, and Bun 1.3.4 can't read a lockfile written by Bun 1.4 or later.

</details>

<h3 id="vue">If your frontend uses Vue</h3>

These checks use `frontend` for the Vue folder. If you named it `vue-project` or something else, use that name in the paths and scripts below.

<details>
<summary><strong>Frontend packages:</strong> is <code>bun.lock</code> the only lockfile in <code>frontend</code>?</summary>
<div id="frontend-packages"></div>

The lockfile records the package versions to install. The platform uses `bun.lock` in each folder. If you installed with npm, as `create-vue` suggests, run `bun install` in `frontend` to copy the versions from `package-lock.json` into `bun.lock`. Then delete `frontend/package-lock.json` and commit `frontend/bun.lock`. Use `bun add` for new packages so the Bun lockfile stays up to date.

</details>

<details>
<summary><strong>Build scripts:</strong> is <code>build</code> set to <code>bun run --cwd frontend build</code> in the root package, and <code>vite build</code> in the frontend package?</summary>
<div id="build"></div>

In the root `package.json`, add this `build` script under `scripts`:

```json
    "build": "bun run --cwd frontend build",
```

In `frontend/package.json`, replace the `build` script that `create-vue` writes for TypeScript projects, `run-p type-check "build-only {@}" --`, with:

```json
    "build": "vite build",
```

With TypeScript, the build script from `create-vue` also runs `vue-tsc` to check for type errors. That command requires Node.js, which isn't included in the platform's Bun runtime. Run `npm run type-check` in `frontend` on your computer before pushing instead; `npm run` runs the script without changing your lockfiles. If your frontend imports the typed client, `type-check` also needs your design files. In `frontend/tsconfig.app.json`, add `"@design/*": ["../design/*"]` under `paths` and `"../src/text.d.ts"` under `include`.

</details>

<details>
<summary><strong>Pages:</strong> does <code>start</code> run only the backend, and does that backend serve the files in <code>frontend/dist</code>?</summary>
<div id="pages"></div>

Vite's development server doesn't run on the platform, so your backend sends the pages. Set the root `start` script to run only your backend:

```json
    "start": "bun src/main.ts",
```

Add a `fetch` function to the existing `Bun.serve` call in `src/main.ts`, keeping the `hostname`, `port`, and `routes` settings:

```ts
const dist = `${import.meta.dir}/../frontend/dist`;

const server = Bun.serve({
  // hostname, port, and routes stay as they are
  async fetch(request) {
    const file = Bun.file(dist + new URL(request.url).pathname);
    return new Response((await file.exists()) ? file : Bun.file(`${dist}/index.html`));
  },
});
```

Bun checks `routes` first, so `/api/...` and `/health` still reach your backend. For other paths, the backend sends a file from `frontend/dist` if one exists, or `index.html` so Vue Router can display the page. This also lets a visitor reload an inner page, such as `/reservations`. You can leave the local guide's other scripts and the `web` folder in place; the platform doesn't use them.

</details>

<details>
<summary><strong>API calls:</strong> does the frontend use <code>/api/...</code> rather than a full <code>localhost</code> address?</summary>
<div id="api"></div>

Use `/api/...` instead of `http://localhost:3000/api/...` or an address from a `VITE_` variable. In a visitor's browser, `localhost` refers to their computer, not your deployed app. With the typed client, set `baseUrl: "/api"`. For local development, add a proxy for `/api` inside `defineConfig` in `frontend/vite.config.ts` (or `.js`), merging it with any existing `server` settings. Vite will forward those requests to your backend:

```ts
  server: { proxy: { "/api": "http://127.0.0.1:3000" } },
```

</details>

<details>
<summary><strong>Frontend variables:</strong> open this if <code>frontend/src</code> uses <code>VITE_</code>.</summary>
<div id="vite-variables"></div>

Vite puts `VITE_` values into the frontend during the build. The environment variables you enter on the platform are supplied when the app runs, after the build, so they won't be available to Vite. Replace API addresses with `/api/...`, as in [API calls](#api). Put fixed values, such as a title, directly in the code. For a public value that changes between deployments, read it on the backend and return it through an API endpoint. Keep API keys and other secrets on the server; don't return them to the browser. Move variables still used by the backend to the root `.env`, then delete `frontend/.env`.

</details>

<details>
<summary><strong>Database:</strong> does your code call <code>client.db()</code> with no database name?</summary>
<div id="database-name"></div>

For connections to the platform's MongoDB, call `client.db()` with no name. This selects the database specified in the connection string, rather than a name you used locally.

</details>

<details>
<summary><strong>If you use cookie-based sign-in:</strong> does <code>publicOrigin</code> read <code>PUBLIC_ORIGIN</code>, with no <code>browser</code> setting?</summary>
<div id="sign-in"></div>

If your app uses a cookie to remember who is signed in, the backend accepts sign-in requests and requests using that cookie only from the `publicOrigin` address. Find this setting in the HTTP policy (`src/http.ts` in the local guide). Read it from `PUBLIC_ORIGIN`, which you'll set to the deployed address in [step 4](#variables). When the variable isn't set, use the address you open while developing. With Vite's development server, that's `http://localhost:5173`:

```ts
  publicOrigin: process.env.PUBLIC_ORIGIN ?? "http://localhost:5173",
```

`localhost` and `127.0.0.1` count as different addresses, so use the one in your browser's address bar. If the policy also has a `browser` setting, remove it; on the platform, pages and the API share one address.

</details>

<h3 id="test">Try it and push</h3>

For Vue, add this `preview` script to the root `package.json`. For [ConceptBox](#conceptbox) or [plain TypeScript](#typescript), use the script in that section instead.

```json
    "preview": "bun run db:up && bun run build && NODE_ENV=production PORT=3000 PUBLIC_ORIGIN=http://127.0.0.1:3000 bun run start",
```

Stop `bun run dev`, since its backend uses port 3000. Then, in the root folder:

```sh
bun run preview
```

You may see a build warning that modules were "externalized for browser compatibility". This can happen because the typed client imports server code that isn't used in the browser. It doesn't by itself mean the build failed; continue with the steps below.

For ConceptBox, use `localhost` instead of `127.0.0.1` in both addresses below. Open http://127.0.0.1:3000/health and check that it reports `ok`. Then open http://127.0.0.1:3000 and try your app, including signing in if you've added sign-in. Create something and reload the page to check that it's still there. With Vue Router, also reload a page other than the home page. When you're done, press Ctrl+C in the terminal to stop the preview. Then commit and push your changes, including the lockfiles. Keep `.env` out of git.

<h2 id="platform-sign-in">1. Sign in</h2>

Open [mit-sdg.dev](https://mit-sdg.dev) and click **Sign in with your class account**. It's the same account you use on Commons. The first time, you're asked whether `mit-sdg.dev` may see your name, username, and email. Click **Allow**.

<figure class="guide-step guide-step--compact">
  <img src="assets/deploying-apps/sign-in.png" alt="Commons permission page for mit-sdg.dev, showing the user's name, username, and email, with Cancel and Allow buttons">
  <figcaption>To change your answer later, remove mit-sdg.dev from the apps listed in your Commons settings.</figcaption>
</figure>

<h2 id="create">2. Create the app</h2>

Each student can have two apps. Only course staff can delete an app. Use one for your personal project and keep the other for your team project. On a team, one person creates the team's app and adds the others, as [step 6](#manage) shows.

Click **Create app** and type a name. The name becomes your app's address, such as `https://reservations.mit-sdg.dev`, and you can't change it later.

<figure class="guide-step guide-step--compact">
  <img src="assets/deploying-apps/create-app.png" alt="Create app form with reservations entered as the app name and the naming rule below it">
  <figcaption>The example app is called <code>reservations</code>. Use your own app's name.</figcaption>
</figure>

<h2 id="settings">3. Fill in the settings</h2>

After you create the app, the **Settings** tab opens. Fill in these fields:

<div role="region" aria-label="Deployment settings" tabindex="0" style="overflow-x: auto;">

| Field | Value | Why |
| --- | --- | --- |
| **Repository URL** | Your repository on GitHub | The platform fetches the commit you pick from it. |
| **Branch** | `main`, or the branch you push to | You pick an exact commit from this branch each time you deploy. |
| **Runtime** | **Bun** | The Bun version comes from `package.json`. |
| **Package directories** | `.` and, on a second line, `frontend`; plain TypeScript: `.` alone | The platform runs `bun install` in each one, from its `bun.lock`. |
| **Build script** | `build`; plain TypeScript: leave empty | It runs before your app starts, and builds the frontend. |
| **Start script** | `start` | Enter the script name, not the full command. The platform runs `bun run start`. |
| **Port** | `3000` | The platform sets `PORT` to this value and forwards requests to that port. It matches the local preview above. |
| **Health check path** | `/health` | Visitors reach a new deployment only after this path returns a successful HTTP response (a status from 200 to 299). |

</div>

Click **Save settings**.

<figure class="guide-step">
  <img src="assets/deploying-apps/settings.png" alt="Settings form with branch main, Bun selected, package directories set to a dot and frontend, build script build, start script start, port 3000, and health check path /health">
  <figcaption>Settings for a Vue app; the repository is an example.</figcaption>
</figure>

<details>
<summary>Deploying from a private repository</summary>

To deploy from a private repository, add a deploy key to it on GitHub. The key lets the platform read that one repository. Someone with admin access to the repository must add it.

1. Save the repository URL in **Settings**. Under **Private repository**, click **Create deploy key** and copy the key.
2. On GitHub, open the repository's **Settings**, then **Deploy keys**, then **Add deploy key**. Paste the key and leave **Allow write access** off.
3. Return to your app's **Settings** tab and click **Check access**. You should see `GitHub accepts the key.`, followed by the commit your branch is on.

</details>

<h2 id="variables">4. Add a database and your variables</h2>

Further down the **Settings** tab, under **Databases and storage**, click **Add MongoDB**, and confirm.

<figure class="guide-step">
  <img src="assets/deploying-apps/storage-add.png" alt="Databases and storage section showing PostgreSQL, MongoDB, and S3 storage as not added, with a button to add each">
  <figcaption>Add the database or storage your app uses.</figcaption>
</figure>

The next dialog suggests `MONGODB_URI` as the name of the variable that holds the connection string. Change it to the name your code reads, `MONGODB_URL` in the local guide's code, then click **Save variables**. ConceptBox reads `MONGODB_URI`, so keep the suggestion for a copy of ConceptBox. The platform supplies the connection string; you don't need to copy it from your local `.env`.

<figure class="guide-step guide-step--compact">
  <img src="assets/deploying-apps/mongodb.png" alt="MongoDB variables dialog with uri mapped to MONGODB_URL and a Save variables button">
  <figcaption>The variable name must match your code. The platform supplies the connection string.</figcaption>
</figure>

Wait until the database no longer shows **Setting up** before you save other variables or deploy; the platform makes one change at a time. The new database starts empty; your local data stays on your computer. Add starting data through your deployed app.

For ConceptBox, also add [S3 storage](#s3) and keep its suggested names. Wait for storage setup to finish before adding other variables.

If your code reads `PUBLIC_ORIGIN`, add it under **Environment variables** with your app's address, such as `https://reservations.mit-sdg.dev`, with no slash at the end. Add the other variables from your root `.env`, such as API keys. The platform sets the database variable, `PORT`, `HOST`, and `NODE_ENV` itself, so leave those out. Secrets belong here rather than in git, since anyone who can see your repository can read what's committed.

<h2 id="deploy">5. Deploy</h2>

Open the **Deploy** tab and pick the newest commit. Click **Review deployment**, check that your variables, such as `MONGODB_URL`, are listed, then click **Deploy**.

<figure class="guide-step">
  <img src="assets/deploying-apps/commit.png" alt="Deploy tab with the newest commit selected, a passing check for package.json, scripts, and lockfile, a note requesting Bun 1.4.0, and the saved app settings">
  <figcaption>The platform checks the commit before you deploy it.</figcaption>
</figure>

A deployment takes 10 to 20 minutes, mostly while CSAIL's servers start the machines that build and run your app. You can close the page and come back; **Overview** shows how it went.

<figure class="guide-step">
  <img src="assets/deploying-apps/progress.png" alt="Deploy tab showing a commit deployment marked In progress while the app is marked Not deployed">
  <figcaption>On the first deployment, the app stays marked "Not deployed" until it finishes.</figcaption>
</figure>

When it finishes, you'll see "Deployment succeeded. Your app is running this commit." If it fails, see [If something goes wrong](#troubleshooting).

<figure class="guide-step">
  <img src="assets/deploying-apps/succeeded.png" alt="Deployment marked Deployed, with the message Deployment succeeded. Your app is running this commit. and a View app button">
  <figcaption>The selected commit is now running at your app's address.</figcaption>
</figure>

**View app** opens **Overview**. To try the deployed app, open the address under the app's name. Create something, reload the page, and check that it's still there.

For later changes, push your code, then click **Deploy latest** on **Overview** and confirm with **Deploy**. Pushing alone doesn't deploy.

<h2 id="manage">6. Manage your app</h2>

**Overview** shows your app's health and the commit it's running, with buttons to deploy, stop, or restart it.

<figure class="guide-step">
  <img src="assets/deploying-apps/overview.png" alt="Overview tab showing the app as Healthy, its current commit, Deploy latest and Deploy buttons, and Stop app and Restart app controls">
  <figcaption>"Healthy" means the app is running and its health check passes.</figcaption>
</figure>

- **Logs** shows what your app prints, with separate **Output** and **Errors** views.
- On **Team**, the app's owner adds or removes teammates by their Commons username. Each teammate must sign in to 6.1040 Apps once first. Teammates can change settings, deploy, and read logs.
- **Deployments** lists past deployments; open one for its build output and the exact Bun version it used. If a deployment fails, your app keeps running the previous commit. To go back to an earlier commit, open its deployment and click **Deploy this commit again**, then **Review deployment** and **Deploy**. The redeployment uses your current settings and variables, and doesn't restore earlier data.

<figure class="guide-step">
  <img src="assets/deploying-apps/deployment.png" alt="Successful deployment details showing its commit, repository, Bun 1.4.0 from packageManager, image digest, Deploy this commit again button, and build output">
  <figcaption>The <strong>Runtime</strong> row records the version used and where it was specified.</figcaption>
</figure>

<h2 id="troubleshooting">If something goes wrong</h2>

If a build fails, open it on **Deployments** and read the build output. If the build succeeded but the app stopped, click **See why it stopped** on **Deploy** or **Overview**. If the app is running but isn't working as expected, check **Logs**. If you're still stuck, post on the class forum on Commons.

**Signing in to mit-sdg.dev says "Sign-in was cancelled" or "That sign-in expired".** Click **Sign in with your class account** again. If you clicked **Cancel** on Commons, you're asked again next time.

**The Deploy tab says "This commit will fail to build".** Read the reason below it. If it names a missing lockfile, run `bun install` in that folder, commit `bun.lock`, push, and pick the new commit. If it says "frontend isn't a folder in this commit.", check that **Package directories** names your Vue folder and that the folder is committed. If the folder shows on GitHub as a single entry you can't open, it was committed as a separate repository. If you didn't intend that, move the hidden `frontend/.git` folder to a backup location outside your project so you keep its history. From the project root, run `git rm --cached frontend`, then `git add frontend`. Check that the frontend files appear in `git diff --cached --stat`, then commit and push. If you intended to use a Git submodule, ask the course staff before changing it.

<div id="source-size"></div>

**The deployment fails before the build starts after adding a video or another large file.** Check the files in the commit you selected on GitHub. The source limit is **50 MB for all files combined**, so a 54 MB demo video alone exceeds it. The failure message may not name the size limit.

To remove a committed video:

1. Upload it to Google Drive or YouTube, check the sharing permissions, and replace the video link in your README with the shared link.
2. From your repository's root folder, run the command below, replacing `MVP Demo.mp4` with your video's path. This stops tracking the video in git and keeps your local copy.

   ```sh
   git rm --cached "MVP Demo.mp4"
   ```

3. Add the video's path to `.gitignore` so you don't commit it again. Adding it to `.gitignore` alone won't remove an already tracked file. Then commit and push the removal and link:

   ```sh
   git add .gitignore README.md
   git commit -m "Link demo video instead of committing it"
   git push
   ```

4. On GitHub, check that the new commit no longer contains the video. In the **Deploy** tab, select that new commit and deploy again. Remove other large files too if the remaining source still exceeds 50 MB.

You don't need to rewrite git history: only the files in the commit you deploy count toward this limit.

**The build says "lockfile had changes, but lockfile is frozen".** The platform installs packages without changing `bun.lock`. If the lines above say "Unknown lockfile version", the lockfile was written by a newer version of Bun than the one in `packageManager`; update that setting as in [Bun version](#bun). Otherwise, the packages listed in `package.json` and `bun.lock` don't match, often after running `npm install`. Run `bun install` in that folder, commit `bun.lock`, push, and pick the new commit.

**The build says `vite: command not found`.** The frontend's packages weren't installed. Add `frontend` under **Package directories** in **Settings**.

**The build says `Cannot find module './App.vue'`.** The frontend's build script runs `vue-tsc`. Set it to `vite build`, as in [Build scripts](#build).

**`type-check` says `Cannot find module '@design/...'`.** The typed client imports your backend's concepts. In `frontend/tsconfig.app.json`, add `"@design/*": ["../design/*"]` under `paths` and `"../src/text.d.ts"` under `include`.

**"Your app exited with code 1".** Read **Errors** below it to find what failed.

<figure class="guide-step">
  <img src="assets/deploying-apps/failed.png" alt="Why it stopped panel reporting exit code 1 after three restarts, with Errors showing MONGODB_URL is not set">
  <figcaption>Here, <code>MONGODB_URL</code> was missing. The error names <code>.env</code>, because the same code runs locally.</figcaption>
</figure>

For a missing variable on the platform, check the name under **Databases and storage** or **Environment variables** in **Settings**. Changes to database variables take effect on the next deployment, so deploy again after correcting one.

**"Your app started but didn't pass the health check".** Check that `Bun.serve` listens on `process.env.PORT` at `process.env.HOST`, as in the local guide; the platform sets `HOST` to `0.0.0.0`. Check that `/health` returns HTTP 2xx. If it reads the database, also check that the database variable's name matches your code and that `client.db()` names no database.

**Every page says "Something went wrong!", or returns 404.** The app is running, but the frontend's files weren't built or aren't sent; **Errors** may name `index.html`. For Vue, check that **Build script** is `build`, and that the backend sends the built files from your Vue folder's `dist`, as in [Pages](#pages). For the local guide's plain TypeScript app, check that `start` runs both servers.

**Reads and writes fail with "not authorized on myapp to execute command".** Your code names a database, as in `client.db("myapp")`. For connections to the platform's MongoDB, use `client.db()` so the driver uses the database in the connection string. Leave the separate local in-memory database in ConceptBox unchanged.

**Saving data fails with "not authorized", but reading still works.** The database is over its 2 GB limit, and **Settings** says "Writes are paused because this database is over its size limit." Delete enough data to leave at least 5% free, and writes resume within a few minutes. If your app needs more space, ask the course staff.

**A new deployment stops with `too many connections for role "u_…"`.** During a deployment, the new version starts while the old one is still running, so both use database connections at once. If the old version already holds most of the connections, the new one can't connect. Give your database client a smaller pool, such as `new SQL({ max: 5 })` with Bun's SQL client, so two versions fit, or ask the course staff to raise the limit.

**Signing in to your app gets `FORBIDDEN`.** Check that `PUBLIC_ORIGIN` is your app's `https://` address, and that your code reads it. For a local preview, the browser address must match `PUBLIC_ORIGIN`, or the default in your code if the variable isn't set. `localhost` and `127.0.0.1` count as different addresses.

**Signing in locally doesn't stick after a reload.** Safari may drop the session cookie on `http` addresses. Try Chrome or Firefox; the deployed `https` app isn't affected.

**Errors say "read-only file system", or files disappear after a deployment.** Your code saves files on the server. The app's folders are read-only, and each deployment starts on a fresh machine. Save data in the database and files in [S3 storage](#s3).

**It works locally but fails after deployment.** Check for a variable you haven't added in **Settings**, a file git ignores, a commit you haven't pushed, or a `localhost` or `127.0.0.1` address in `frontend/src`.

**The deployment is still going after 30 minutes.** Open it on **Deployments** to watch its build output. The platform waits 10 minutes for the health check to pass before the deployment fails, and CSAIL's servers sometimes take longer to start machines. If nothing there explains it, post on the forum.

**Saving or deploying is refused with a message about another change.**

| Message | What to do |
| --- | --- |
| "Check the change in the app's Overview before trying again." | Another change, such as setting up the database, hasn't finished. Wait, then try again. |
| "Finish the previous deployment" or "Finish the previous change" | **Overview** shows **Needs attention**. Click **Resume** there. If a variable change stopped, click **Finish change** under **Environment variables** in **Settings** and enter the value again. |
| "Wait for your current operation to finish." | A change to another of your apps is still running. |

<h2 id="more">More</h2>

<details>
<summary>Letting people sign in</summary>

You can let people sign in with their class account, with a password, or both. ConceptBox includes code for each option that you can copy into a sync-engine app. [Copy parts into your app](https://github.com/mit-sdg/conceptbox#copy-parts-into-your-app) in the README lists the files and how to connect them.

- **With a class account**, classmates and course staff sign in through Commons, as you did in step 1. This works at `https://<name>.mit-sdg.dev`, and at `localhost` or `127.0.0.1` while you develop. To write sign-in yourself, [Commons' deployment guide](https://github.com/mit-sdg/commons/blob/main/DEPLOYMENT.md#sign-in-with-commons-for-course-apps) lists the requests your server makes.
- **With a password**, anyone can sign up. Copy the sign-in code from ConceptBox rather than writing your own. It stores an argon2id hash for checking the password, not the password itself. Even so, you're responsible for other people's account information. Ask only for the information your app needs, and avoid collecting sensitive details.

Either way, read `PUBLIC_ORIGIN` as in [If you use cookie-based sign-in](#sign-in), and set it in [step 4](#variables).

</details>

<details>
<summary>Storing files with S3</summary>
<div id="s3"></div>

Your app's folders are read-only, and each deployment starts on a fresh machine, so keep uploaded files in S3 storage. Under **Databases and storage**, click **Add S3 storage** and confirm, then click **Save variables** in the next dialog, and deploy again to set them. ConceptBox reads the names the dialog suggests, so a copy of its storage needs no changes.

| Variable | What your app uses it for |
| --- | --- |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Credentials. Keep them on the server. |
| `S3_REGION` | The region. Use the supplied value. |
| `S3_BUCKET` | Your app's bucket. |
| `S3_ENDPOINT` | The private address for requests from your server. |
| `S3_PUBLIC_ENDPOINT` | The public address for URLs sent to browsers. |

Bun's S3 client reads all of these except `S3_PUBLIC_ENDPOINT` by itself, so you only pass in the public address:

```ts
import { S3Client } from "bun";

// For your server's own reads and writes.
export const s3 = new S3Client();

// Only for signing URLs that browsers will use.
export const publicS3 = new S3Client({ endpoint: process.env.S3_PUBLIC_ENDPOINT });
```

Use `s3` on the server to read and write files, as in `await s3.write("notes/hello.txt", "Hello!")` and `await s3.file("notes/hello.txt").text()`.

For a browser upload, your server can create a signed URL that grants temporary permission to upload one file. The browser sends the file to that URL without receiving your storage credentials:

```ts
// On the server
const key = `uploads/${crypto.randomUUID()}`;
const url = publicS3.presign(key, { method: "PUT", expiresIn: 600 });

// In the browser, with the url from the server
await fetch(url, { method: "PUT", body: file });
```

Save `key` in your database so you can fetch the file later. For downloads, use `publicS3.presign(key, { expiresIn: 300 })`.

- Check the person's permission to use a file before signing its URL. Anyone with that URL can use it until it expires.
- Always set `expiresIn`. Bun's default is a whole day.
- Browsers can upload only from `https` pages on `mit-sdg.dev`, so try browser uploads on your deployed app, not on `localhost`. Other tools can still use a signed URL from anywhere.
- Each upload can be up to about 100 MB, and your app's storage holds up to 5 GB and 100,000 files.

S3 storage added before October 14 keeps the older names: **Edit variables** next to the storage shows names starting with `AWS_`, such as `AWS_ACCESS_KEY_ID`. Code written for those names keeps working, but the code above and ConceptBox read the `S3_` names. To switch, click **Edit variables**, then **Reset to defaults** and **Save variables**, update your code if it reads the old names, and deploy again.

</details>

<details>
<summary>Limits and behavior</summary>

**Apps.** Each student can create two apps, and a stopped app still counts. Names can't be changed, and only the course staff can delete an app or a database. Each app can have one MongoDB database, one PostgreSQL database, and one S3 bucket.

**Running.** Your app has a fixed memory limit, and going over it stops the app. The platform restarts an app that crashes, up to three times within five minutes.

**Changes.** The platform makes one change at a time, across all your apps. Changes to settings and to database and S3 variables take effect on the next deployment. Saving an environment variable restarts the app right away.

**Health checks.** Visitors reach a new deployment only after its health check returns HTTP 2xx, with a body of at most 4 KB and no redirect. The platform waits up to 10 minutes for that before the deployment fails. A failed deployment leaves the previous one running.

**MongoDB.** Your database runs on a separate server, with separate memory, CPU, and disk limits. It holds 2 GB and allows 10 connections at a time. The connection string already sets the connection limit, so create one `MongoClient` when your app starts and reuse it throughout your code. If the database grows past 2 GB, writes pause until at least 5% of the space is free. Reads and deletes still work. The course staff can raise the limit.

**PostgreSQL.** Your database holds 2 GB and allows 20 connections.

**Files.** S3 storage holds up to 5 GB and 100,000 files, with uploads of up to about 100 MB each.

**Backups.** Databases and S3 files go into encrypted backups every night.

</details>

<details>
<summary>Other runtimes and databases</summary>

**Bun and Node.js versions.** `packageManager` names an exact Bun version. To give a range instead, remove that line and use `engines`, such as `"engines": { "bun": ">=1.3.9" }` or `"engines": { "node": ">=22" }`. A range selects the newest release it allows; for Node.js, the newest long-term support one. Without either, the platform reads `.bun-version`, `.nvmrc`, or `.node-version`, and otherwise uses its default. Node.js before 20 and Bun before 1.1 aren't supported. The **Deploy** tab shows the version a commit specifies.

**Node.js apps.** Choose **Node.js** under **Runtime** and commit `package-lock.json` in each package directory. The platform installs with `npm ci`.

**S3 from Node.js.** Use `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`. The AWS SDK doesn't read the `S3_` variables, so pass them in, along with `forcePathStyle`:

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const options = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
};
const s3 = new S3Client({ ...options, endpoint: process.env.S3_ENDPOINT });
const publicS3 = new S3Client({ ...options, endpoint: process.env.S3_PUBLIC_ENDPOINT });

const key = `uploads/${crypto.randomUUID()}`;
const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
const url = await getSignedUrl(publicS3, command, { expiresIn: 600 });
```

**PostgreSQL.** Click **Add PostgreSQL** instead of **Add MongoDB**. With the suggested variable names, your app gets `DATABASE_URL`, which includes the password, and the standard `PG` variables, such as `PGHOST` and `PGUSER`. Most PostgreSQL clients can connect with `DATABASE_URL` alone.

</details>

<details>
<summary>How the platform works underneath</summary>

6.1040 Apps runs in a project on CSAIL's OpenStack cloud, run by TIG, CSAIL's infrastructure group. OpenStack is open-source software for running your own cloud of virtual machines, much like a private AWS.

Every machine runs NixOS. Its image is built from one commit of the platform repository and boot-tested before use. Machines aren't updated in place; an update replaces the machine.

There are five kinds of machines:

- The admin machine runs Nomad, which schedules app containers, and the controller that manages deployments.
- The ingress machine runs Traefik, which routes each app's address to the right app.
- The storage machine runs a separate PostgreSQL or MongoDB server for each app's database, each with separate memory, CPU, and disk limits. It also runs Garage, an S3-compatible file store shared by all apps with a separate bucket for each, and the private registry for app images.
- Each app gets its own worker machine, with no SSH and no persistent disk.
- Each build gets a single-use builder machine.

When you deploy, the platform fetches the exact commit, and a fresh builder uses BuildKit to build a container image from the official Bun or Node.js image. The builder pushes the image to the private registry and is then deleted. The platform starts a fresh worker for your app, and Nomad runs the image there. Traffic switches only after the app, the scheduler, and the public address all pass their health checks. Starting these virtual machines takes most of the deployment's time.

Public traffic reaches Cloudflare first, which handles HTTPS. Traefik then forwards it to the app.

Students don't get SSH, OpenStack, or database-admin access.

The code is public. You can read the [platform repository](https://github.com/mit-sdg/openstack-deployment-infra) and [Commons](https://github.com/mit-sdg/commons), the class site whose accounts you use to sign in.

</details>
