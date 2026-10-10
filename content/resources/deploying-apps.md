---
title: Deploying your app on 6.1040 Apps
description: Put your app online on the class platform, with its own address, database, and logs.
---

This guide puts your app online at `https://<name>.mit-sdg.dev`, using 6.1040 Apps, the class's platform at [mit-sdg.dev](https://mit-sdg.dev). You pick a commit on GitHub. The platform builds and runs it, gives your app its own database, restarts the app if it crashes, and keeps the logs. Once it's running, your classmates, or anyone else, can try your app.

It follows on from [Developing a sync-engine app locally](sync-engine-local-dev.md). The screenshots use the reservations app from that guide as a worked example; use your own app's repository and settings. Plan on about half an hour, most of it waiting for the first deployment. Follow the numbered steps in order. The collapsed sections cover optional features and background.

## Before you start

The platform builds your app from a commit on GitHub. It installs packages from your lockfile, runs your build script if you have one, then runs your start script. It doesn't use your `Dockerfile` or `compose.yaml`. You enter the settings on the site instead.

Your app needs:

- **Its code on GitHub**, including the lockfile: `bun.lock` for Bun, or `package-lock.json` for Node.js. Keep `.env` out of git, since project repositories are public.
- **One server that visitors reach.** It listens on the port in `PORT`, at the address in `HOST`. The platform sets `PORT` to the port you choose in step 3, and `HOST` to `0.0.0.0`. In the local guide's app, that server is the frontend server, which passes API requests on to the backend, and it already reads both. In a Vue app, it's your backend, once you make the changes [below](#vue).
- **A health check**, such as `/health`, that returns HTTP 2xx when the app can reach its database. If yours doesn't, copy the `/health` route from `src/main.ts` in the local guide's step 3, "Putting it together".
- **A list of the variables your code reads from `.env`**, especially the one for the database.

Most apps also need a few small code changes, below. Make the ones that apply, try the app, then commit and push.

### If you use Bun

`sync-engine setup` wrote `"packageManager": "bun@1.3.4"` in `package.json`. Change it to:

```json
  "packageManager": "bun@1.4.0",
```

The platform builds and runs your app with the version named here. On Bun 1.3.4, `bun run --parallel` runs only the first script, so only part of your app would start. Bun ignores this line on your computer, so you wouldn't see the problem until you deploy.

<h3 id="vue">If your frontend uses Vue</h3>

The local guide's frontend is plain TypeScript, which its Bun server builds when it starts. A Vue frontend is built by Vite instead, and Vite's development server doesn't run on the platform. Your backend can send the built files, so one server handles both the pages and the API.

These steps assume your frontend is in a folder named `frontend` at the root of your repository. `npm create vue@latest` makes a folder named after the project name you give it; if you chose another name, use it in place of `frontend`.

- **Build with Vite alone.** In `frontend/package.json`, set the build script to:

  ```json
      "build": "vite build",
  ```

  The build script from `create-vue` also runs `vue-tsc`, which fails on the platform, because the platform's Bun image has no Node.js. `create-vue`'s `type-check` script still runs `vue-tsc`, so run `bun run type-check` in `frontend` on your computer before you push.

- **Build the frontend and start the backend from the root.** In the root `package.json`:

  ```json
      "build": "bun run --cwd frontend build",
      "start": "bun src/main.ts",
  ```

- **Send the built files from the backend.** In `src/main.ts`, add a `page` function and pass it to `Bun.serve` as `fetch`:

  ```ts
  const dist = `${import.meta.dir}/../frontend/dist`;

  // Send a file that `vite build` made, or index.html for any other path, so Vue Router can show the page.
  async function page(request: Request) {
    const file = Bun.file(dist + new URL(request.url).pathname);
    return new Response((await file.exists()) ? file : Bun.file(`${dist}/index.html`));
  }

  const server = Bun.serve({
    // hostname, port, and routes stay as they are
    fetch: page,
  });
  ```

  Bun checks `routes` first, so `/api/...` and `/health` still reach your backend. Every other path calls `page`.

- **Call the API by path.** Make the frontend call `/api/...`, as the typed client does with `baseUrl: "/api"`, not `http://localhost:3000/api/...`. On the deployed app, `localhost` is each visitor's own computer. While you develop, Vite's `proxy` setting passes `/api` to your backend.

- **Install the frontend with Bun.** Run `bun install` in `frontend` and commit `frontend/bun.lock`, even if you created the frontend with npm. The platform needs a `bun.lock` in each folder it installs.

You still develop with Vite's dev server, as before.

<h3 id="sign-in">If your app signs people in</h3>

Requests to sign in, sign out, or do anything that needs a signed-in person are refused with status 403 and `{"error":"FORBIDDEN"}` unless the page that sent them is at the `publicOrigin` address in your `httpPolicy`. On the platform, that address is `https://<name>.mit-sdg.dev`, so where your code calls `httpPolicy`, read it from a variable:

```ts
  publicOrigin: process.env.PUBLIC_ORIGIN ?? "http://localhost:5173",
```

The fallback is the address in your browser's address bar while you develop, such as `http://localhost:5173` with Vite. `localhost` and `127.0.0.1` count as different addresses. You'll set `PUBLIC_ORIGIN` on the platform in step 4.

### Try it and push

Run your app the way the platform does. First stop `bun run dev` if it's running, since its backend uses port 3000, and start your local MongoDB (`bun run db:up` in the local guide's setup). Then:

```sh
bun run build    # only if your app has a build script
PORT=3000 PUBLIC_ORIGIN=http://127.0.0.1:3000 bun run start
```

Open http://127.0.0.1:3000/health and check that it returns `ok`. Then open http://127.0.0.1:3000 and use the app, including signing in if it has sign-in. Press Ctrl+C, then commit and push.

## 1. Sign in

Open [mit-sdg.dev](https://mit-sdg.dev) and click **Sign in with your class account**. It's the same account you use on Commons. The first time, Commons asks whether `mit-sdg.dev` may see your name, username, and email. Click **Allow**.

<figure class="guide-step guide-step--compact">
  <img src="assets/deploying-apps/sign-in.png" alt="Commons permission page for mit-sdg.dev, showing the user's name, username, and email, with Cancel and Allow buttons">
  <figcaption>To change your answer later, remove mit-sdg.dev from the apps listed in your Commons settings.</figcaption>
</figure>

## 2. Create the app

Click **Create app** and type a name: 3 to 40 lowercase letters, numbers, and single hyphens, starting with a letter and ending with a letter or number. If someone has taken the name, or it's reserved, like `admin`, you'll see an error.

Choose carefully, because you can't change it later. It becomes part of your app's address: the example named `reservations` gets `https://reservations.mit-sdg.dev`.

<figure class="guide-step guide-step--compact">
  <img src="assets/deploying-apps/create-app.png" alt="Create app form with reservations entered as the app name and the naming rule below it">
  <figcaption>The example app is called <code>reservations</code>. Use your own app's name.</figcaption>
</figure>

You can create two apps, and a stopped app still counts. Use one for your personal project and keep the other for your team project. On a team, one person creates the team's app and adds the others, as step 6 shows.

## 3. Fill in the settings

Creating the app opens its **Settings** tab. Fill in the fields for your app.

- **Repository URL**: your repository on GitHub. The screenshot uses `https://github.com/mit-sdg/sync-engine-reservations`. If your repository is private, save the settings first, then open "Deploying from a private repository" below.
- **Branch**: usually `main`. You'll pick an exact commit from it each time you deploy.
- **Runtime**: **Bun** or **Node.js**, whichever your app uses.
- **Package directories**: `.`, the repository root. For a Vue app with its own `frontend` folder, add `frontend` on a second line.
- **Build script**: `build` for a Vue app. Leave it empty if your app has no build step, like the reservations app.
- **Start script**: the name of the script in `package.json` that starts your app, usually `start`. Give the name, not the command. On Bun, the platform runs it as `bun run start`.
- **Port**: `3000` works for most apps, and the example uses it. With the local guide's two servers, don't pick `4000`, which the backend uses.
- **Health check path**: your app's health check, such as `/health`.

Click **Save settings**.

<figure class="guide-step">
  <img src="assets/deploying-apps/settings.png" alt="Settings form for sync-engine-reservations, with branch main, Bun selected, package directories set to a dot, an empty build script with a grey build placeholder, start script start, port 3000, and health check path /health">
  <figcaption>The reservations app's settings.</figcaption>
</figure>

<details>
<summary>If your app has a frontend server and a backend server</summary>

One start script can run both servers. The reservations app uses `bun run --parallel start:backend start:frontend`. Its frontend listens on `PORT` at `0.0.0.0`, while the backend stays on `127.0.0.1:4000`. Visitors reach the frontend, which passes API requests to the backend.

In the local guide, the frontend used port 8080 because `PORT` wasn't set. With the settings above, it uses 3000. The frontend also passes `/health` to the backend, which answers successfully only when it can read MongoDB. That checks the connection through all three parts of the app.

</details>

<details>
<summary>Deploying from a private repository</summary>

To deploy a private repository, you add a deploy key to it on GitHub. The key lets the platform read that one repository. Someone with admin access to the repository must add it.

1. Save the repository URL in **Settings**. Under **Private repository**, click **Create deploy key** and copy the key.
2. On GitHub, open the repository's **Settings**, then **Deploy keys**, then **Add deploy key**. Paste the key and leave **Allow write access** off.
3. Return to your app's **Settings** tab and click **Check access**. You should see `GitHub accepts the key.`, followed by the commit your branch is on.

</details>

<details>
<summary>Choosing the Bun or Node.js version</summary>

The `packageManager` line from "Before you start" names an exact Bun version. To specify a range, use `engines` instead:

```json
  "engines": { "node": ">=22" }
```

`engines.bun` works the same way. If `package.json` doesn't specify a version, the platform checks `.nvmrc` or `.node-version` for Node.js, or `.bun-version` for Bun. Without any of these, it uses the platform's default.

A range selects the newest release it allows. For Node.js, the platform prefers the newest long-term support (LTS) release in the range, so `>=22` won't select a short-lived odd-numbered release. Node.js versions before 20 and Bun versions before 1.1 aren't supported.

The **Deploy** tab shows which version a commit specifies, and each deployment records the exact version it used.

</details>

## 4. Add a database and your variables

If your app uses MongoDB, scroll down to **Databases and storage** on the **Settings** tab, click **Add MongoDB**, and confirm. You can't remove a database yourself later, so only add one your app needs.

<figure class="guide-step">
  <img src="assets/deploying-apps/storage-add.png" alt="Databases and storage section showing PostgreSQL, MongoDB, and S3 storage as not added, with a button to add each">
  <figcaption>Add the database or storage your app uses.</figcaption>
</figure>

In the next dialog, type the name of the variable your code reads for the connection string. The field starts as `MONGODB_URI`. If you followed the local guide, your code reads `MONGODB_URL`, so change it. Click **Save variables**.

<figure class="guide-step guide-step--compact">
  <img src="assets/deploying-apps/mongodb.png" alt="MongoDB variables dialog with uri mapped to MONGODB_URL and a Save variables button">
  <figcaption>The variable name must match your code. The platform supplies the connection string.</figcaption>
</figure>

Pass that connection string to the MongoDB client unchanged. It already includes the database name and password. Call `client.db()` with no name, so the driver uses that database; your app's database user can't use any other. The new database is empty, and your local MongoDB data stays on your computer.

Wait until the database no longer shows **Setting up**. Until then, a deploy or a variable change is refused with "Check the change in the app's Overview before trying again." The platform makes one change at a time, across all your apps.

<details>
<summary>Using PostgreSQL instead</summary>

Click **Add PostgreSQL**. With the suggested variable names, your app gets `DATABASE_URL`, which includes the password, and the standard `PG` variables, such as `PGHOST` and `PGUSER`. Most PostgreSQL clients can connect with `DATABASE_URL` alone.

</details>

Under **Environment variables**, add the other variables from your `.env`, such as API keys. Leave out the database's variable, `PORT`, and `HOST`, which the platform sets. Saved values aren't shown again, and saving one restarts the app if it's running. Variables reach your app when it runs, not while it builds, so a `VITE_` variable never reaches the built pages. If the frontend needs a value, have the backend return it from an endpoint.

If your app signs people in, add `PUBLIC_ORIGIN` with your app's address, such as `https://reservations.mit-sdg.dev`. Start it with `https://`, and leave off any slash at the end.

## 5. Deploy

Open the **Deploy** tab and pick a commit from your branch, usually the newest. The platform checks that it has `package.json`, the scripts you named, and the lockfile, and shows which Bun or Node.js version it specifies.

<figure class="guide-step">
  <img src="assets/deploying-apps/commit.png" alt="Deploy tab with the newest commit selected, a passing check for package.json, scripts, and lockfile, a note requesting Bun 1.4.0, and the saved app settings">
  <figcaption>Check the selected commit and settings before deploying.</figcaption>
</figure>

Click **Review deployment**, check that the commit is the one you meant and that your variables are listed, then click **Deploy**. Progress appears on the **Deploy** tab.

<figure class="guide-step">
  <img src="assets/deploying-apps/progress.png" alt="Deploy tab showing a commit deployment marked In progress while the app is marked Not deployed">
  <figcaption>On the first deployment, the app stays marked "Not deployed" until it finishes.</figcaption>
</figure>

A deployment can take 10 to 15 minutes. The platform starts new machines to build and run your app, and CSAIL's servers take a while to launch them, so a slow deployment is normal. You can close the page and come back later. The deployment keeps going, and **Overview** shows how it went.

If you stay on the page, you'll see "Deployment succeeded. Your app is running this commit." when it finishes.

<figure class="guide-step">
  <img src="assets/deploying-apps/succeeded.png" alt="Deployment marked Deployed, with the message Deployment succeeded. Your app is running this commit. and a View app button">
  <figcaption>The selected commit is now running at your app's address.</figcaption>
</figure>

**View app** opens the app's **Overview**. Your app itself is at the link under its name at the top of the page. Open it and try the app. Test something that saves data: create an item, reload the page, and check that it's still there. If the deployment fails, the **Deploy** tab explains why, and [If something goes wrong](#troubleshooting) has the common causes.

For later changes, push your code to GitHub, then choose the new commit on the **Deploy** tab. Pushing alone doesn't deploy it. **Deploy latest** on **Overview** is a shortcut to deploy the newest commit on your branch.

## 6. Manage your app

The **Overview** tab shows your app's health and the commit it's running. You can also deploy, stop, or restart it there.

<figure class="guide-step">
  <img src="assets/deploying-apps/overview.png" alt="Overview tab showing the app as Healthy, its current commit, Deploy latest and Deploy buttons, and Stop app and Restart app controls">
  <figcaption>"Healthy" means the app is running and its health check passes.</figcaption>
</figure>

Open **Deployments** to see past deployments and their build output. Each one records the commit and the exact Bun or Node.js version used. If a deployment fails, your app goes on running the previous commit.

If a version deploys successfully but breaks something, open an earlier deployment and click **Deploy this commit again**. This redeploys the old code with your current settings and environment variables. It doesn't restore earlier database contents.

<figure class="guide-step">
  <img src="assets/deploying-apps/deployment.png" alt="Successful deployment details showing its commit, repository, Bun 1.4.0 from packageManager, image digest, Deploy this commit again button, and build output">
  <figcaption>The <strong>Runtime</strong> row records the version used and where it was specified.</figcaption>
</figure>

The **Logs** tab shows what the running app prints, with **Output** and **Errors** kept apart, much like `bun run logs` did locally.

<figure class="guide-step">
  <img src="assets/deploying-apps/logs.png" alt="Logs showing the reservations app's start command, backend listening on 127.0.0.1:4000, and frontend listening on 0.0.0.0:3000">
  <figcaption>The example runs both servers, with the frontend on the port visitors reach.</figcaption>
</figure>

On **Team**, the app's owner adds or removes teammates by their Commons username. Each teammate must sign in to 6.1040 Apps once before you can add them. Teammates can change settings, deploy, and read logs.

<h2 id="troubleshooting">If something goes wrong</h2>

For a failed build, open its build output on **Deployments**. If the app built but stopped, click **See why it stopped** on **Deploy**. For an app that runs but behaves incorrectly, check **Logs**. If you're stuck, post on the class forum on Commons.

**The Deploy tab says "This commit will fail to build".** Read the reason below it. If it asks for a lockfile, run `bun install` (or `npm install` on Node.js) in the folder it names, commit the lockfile, push, and select the new commit.

**The build says `vite: command not found`.** The frontend's packages weren't installed. Add `frontend` under **Package directories** in **Settings**.

**The build says `Cannot find module './App.vue'`.** The build script runs `vue-tsc`. Make `frontend`'s build script `vite build`, as in [If your frontend uses Vue](#vue).

**The deployment is still going after 15 minutes.** CSAIL's servers sometimes take longer to launch. Give it more time. If it hasn't finished after half an hour, post on the forum.

**Deploying or saving a variable says "Check the change in the app's Overview before trying again."** Another change to the app hasn't finished, such as the database being set up. Wait for it, then try again. "Wait for your current operation to finish." means a change to another of your apps is still running.

**Overview shows Needs attention.** A deployment or change stopped partway. Click **Resume**, or **Finish change**, there.

**"Your app started but didn't pass the health check".** Check that the server listens on the **Port** from **Settings**, at `0.0.0.0`, and that the **Health check path** exists and returns HTTP 2xx. If **Logs** shows only one of your servers starting, check that `package.json` names `bun@1.4.0`. If the check reads the database, check that the database variable's name matches your code.

**"Your app exited with code 1".** Click **See why it stopped** and read **Errors** to find what failed.

<figure class="guide-step">
  <img src="assets/deploying-apps/failed.png" alt="Why it stopped panel reporting exit code 1 after three restarts, with Errors showing MONGODB_URL is not set">
  <figcaption>In this example, the backend stopped because <code>MONGODB_URL</code> was missing.</figcaption>
</figure>

The example's error says to add the variable to `.env`, because the same code runs locally. On the platform, check the variable name under **Databases and storage** in **Settings** instead.

**The page is blank, or your app's address returns 404.** The app is running, but no server sends the frontend's files. For a Vue app, see [If your frontend uses Vue](#vue). With the local guide's two servers, check that `start` runs both.

**Errors say "not authorized on myapp to execute command".** Your code names a database, as in `client.db("myapp")`. Use `client.db()`, so the driver uses the database in the connection string.

**Signing in works locally but gets `FORBIDDEN` on the platform.** Check that `PUBLIC_ORIGIN` is your app's `https://` address with no slash at the end, and that your code reads it, as in [If your app signs people in](#sign-in).

**Data or uploaded files disappear after a deployment.** Your code saved them as files on the server, and each deployment starts on a fresh machine. Save data in the database and files in S3 storage.

**Signing in to mit-sdg.dev says "Sign-in was cancelled" or "That sign-in expired".** Click **Sign in with your class account** again. If you clicked **Cancel** on Commons, it asks again next time.

**It works locally but fails after deployment.** Check for a setting that only exists in `.env`, an ignored file the app needs, or a commit you haven't pushed. If you used the local guide's setup, try `bun run up`. It runs the app from an image without `.env`, much like the platform does.

## More

<details>
<summary>Letting people sign in</summary>

Your app can sign people in with their class account, with a password, or both. ConceptBox, the example app from lecture, has each as a part you can copy into a sync-engine app. Its README's [Copy parts into your app](https://github.com/mit-sdg/conceptbox#copy-parts-into-your-app) lists the files and how to connect them.

- **With a class account**, classmates and course staff sign in through Commons, as you did in step 1. This works at `https://<name>.mit-sdg.dev`, and at `http://localhost:<port>` or `http://127.0.0.1:<port>` while you develop. Copy the "Signing in with Commons" part. To write sign-in yourself, [Commons' deployment guide](https://github.com/mit-sdg/commons/blob/main/DEPLOYMENT.md#sign-in-with-commons-for-course-apps) lists the requests your server makes.
- **With a password**, anyone can sign up. Copy the "Signing in with a password" part rather than writing your own. It saves a hash of each password, made with argon2id, never the password itself. Your app will hold strangers' passwords, so ask only for what it needs, and don't collect anything sensitive.

Either way, set `PUBLIC_ORIGIN`, as in [If your app signs people in](#sign-in).

</details>

<details>
<summary>Storing files with S3</summary>

Files your code writes to disk can disappear on a restart or deployment. Keep data in the database and uploaded files in S3 storage. Under **Databases and storage**, click **Add S3 storage** and keep the suggested variable names.

| Variable | What your app uses it for |
| --- | --- |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Credentials. Keep them on the server. |
| `AWS_REGION` | The region. Use the supplied value. |
| `S3_BUCKET` | Your app's bucket. |
| `AWS_ENDPOINT_URL_S3` | The private address for requests from your server. |
| `S3_PUBLIC_ENDPOINT` | The public address for URLs sent to browsers. |

Bun's S3 client reads the credentials, region, and bucket from these variables. Pass in the addresses:

```ts
import { S3Client } from "bun";

// For your server's own reads and writes.
export const s3 = new S3Client({ endpoint: process.env.AWS_ENDPOINT_URL_S3 });

// Only for signing URLs that browsers will use.
export const publicS3 = new S3Client({ endpoint: process.env.S3_PUBLIC_ENDPOINT });
```

Use `s3` on the server to read and write files, as in `await s3.write("notes/hello.txt", "Hello!")` and `await s3.file("notes/hello.txt").text()`.

For a browser upload, your server can make a temporary signed URL. The browser sends the file there without needing your storage credentials:

```ts
// On the server
const key = `uploads/${crypto.randomUUID()}`;
const url = publicS3.presign(key, { method: "PUT", expiresIn: 600 });

// In the browser, with the url from the server
await fetch(url, { method: "PUT", body: file });
```

Save `key` in your database so the app can find the file later. For downloads, use `publicS3.presign(key, { expiresIn: 300 })`.

A few rules for signed URLs:

- Check the person's permission to use a file before signing its URL. Anyone with that URL can use it until it expires.
- Always set `expiresIn`. Bun's default is a whole day.
- Browsers can upload only from `https` pages on `mit-sdg.dev`, so try browser uploads on your deployed app, not on `localhost`. This doesn't stop someone using a signed URL from another tool.
- Each upload can be up to 100 MB.

For Node.js, use `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`. They read the same credentials and region variables. Pass in the endpoints and set `forcePathStyle` on the client that signs browser URLs:

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ endpoint: process.env.AWS_ENDPOINT_URL_S3, forcePathStyle: true });
const publicS3 = new S3Client({ endpoint: process.env.S3_PUBLIC_ENDPOINT, forcePathStyle: true });

const key = `uploads/${crypto.randomUUID()}`;
const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
const url = await getSignedUrl(publicS3, command, { expiresIn: 600 });
```

</details>

<details>
<summary>How the platform works underneath</summary>

6.1040 Apps runs in a project on CSAIL's OpenStack cloud, which TIG, CSAIL's infrastructure group, runs. OpenStack is open-source software for running your own cloud of virtual machines, much like a private AWS.

Every machine runs NixOS. Its image is built from one commit of the platform repository and boot-tested before use. Machines aren't updated in place; an update replaces the image.

There are five kinds of machines:

- The admin machine runs Nomad, which schedules app containers, and the controller that manages deployments.
- The ingress machine runs Traefik, which routes each app's address to the right app.
- The storage machine runs PostgreSQL, MongoDB, Garage (an S3-compatible file store), and the private registry for app images.
- Each app gets its own worker machine, with no SSH and no persistent disk.
- Each build gets a single-use builder machine.

When you deploy, the platform fetches the exact commit, and a fresh builder uses BuildKit to build a container image from the official Node.js or Bun image. It pushes the result to the private registry, then is deleted. The platform starts a fresh worker for your app, and Nomad runs the image there. Traffic switches only after the app, the scheduler, and the public address all pass their health checks. Starting these virtual machines is most of the 10 to 15 minutes.

Public traffic reaches Cloudflare first, which handles HTTPS. Traefik then forwards it to the app. Databases and S3 files go into encrypted backups every night.

Students don't get SSH, OpenStack, or database-admin access. Secrets and environment values stay on the platform and aren't shown again after saving.

The code is public. You can read the [platform repository](https://github.com/mit-sdg/openstack-deployment-infra) and [Commons](https://github.com/mit-sdg/commons), the class site whose accounts you use to sign in.

</details>
