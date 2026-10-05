---
title: Developing a sync-engine app locally
---

This guide builds a small app and runs it on your own computer. The app has three parts: a backend made with sync-engine, a frontend that runs in the browser, and MongoDB. One command, `bun run dev`, starts all three. MongoDB runs in a container, and the backend and frontend run in watch mode, so the app updates as soon as you save a file. Another command runs all three in containers, the way the app will run once it's deployed. As in the MongoDB guide, we set things up so a coding agent can do all of this too.

This guide builds on [Setting up MongoDB for local development](mongodb-setup.md), so finish that one first. You'll need the Podman, Compose, and Bun installs from it. Follow the numbered steps in order. The collapsed sections are optional background. The finished app is in [mit-sdg/sync-engine-reservations](https://github.com/mit-sdg/sync-engine-reservations), if you want to compare your files with it.

## The stack

Each part of the app has more than one good option, so here's what we use and what else you could pick.

The backend runs on [Bun](https://bun.com). Bun runs TypeScript directly, installs packages, runs tests, and bundles code for the browser, so it does the jobs of Node, npm, and a bundler in one tool. sync-engine builds the application from your concepts and the composition that connects them. Its HTTP adapter, the `@mit-sdg/sync-engine-http` package, turns each endpoint into a URL like `/api/reservations/reserve` that accepts a JSON `POST` request.

The frontend is the part that runs in the browser. We write it in plain HTML, CSS, and TypeScript, with a small Bun server that sends the page to the browser. Bun turns the TypeScript into JavaScript that the browser can run. To call the backend, the frontend uses the typed client from the HTTP adapter. The client knows every endpoint, so TypeScript catches a misspelled endpoint or a missing field before you run anything.

The database is MongoDB, running in a container as in the MongoDB guide. sync-engine doesn't store your data for you. Each concept keeps its own state, so each concept's class decides where and how that state is stored.

<details>
<summary>Using React, Svelte, or another frontend framework</summary>

Frameworks like React, Svelte, and Vue usually come with Vite, a tool that serves the frontend while you develop and builds it for deployment. Vite would take the place of the frontend server we write in step 5. Its `proxy` setting passes API requests on to the backend, the same way ours does. In `vite.config.ts`:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: { "/api": process.env.BACKEND_URL ?? "http://127.0.0.1:3000" },
  },
});
```

`BACKEND_URL` is the backend's address, which changes to `http://backend:3000` inside containers, as you'll see in step 6. The typed client works the same way in any framework, with `baseUrl: "/api"`. For deployment, `vite build` turns the frontend into plain files that any web server can send.

Next.js runs a full server of its own. Its `rewrites` setting can pass `/api` requests to the backend in the same way.

</details>

<details>
<summary>Using SQLite or Postgres instead of MongoDB</summary>

Since each concept stores its own state, switching databases means changing the concept classes. Nothing in sync-engine changes.

SQLite keeps the whole database in one file and runs inside your app, so there's no server or container to start. Bun has it built in as `bun:sqlite`. It fits a small app that runs as a single process.

Postgres is a relational database server. It runs in a container just like MongoDB, from the `docker.io/library/postgres` image, and Bun has a built-in Postgres client called `Bun.sql`. The rest of this guide works the same way with a Postgres service in `compose.yaml` in place of `mongo`.

We use MongoDB for the projects in this class, so the rest of this guide sticks with it.

</details>

## 1. Create the project

Make a new, empty folder for the app and set it up with sync-engine. We'll call the app `reservations`:

```sh
mkdir reservations
cd reservations
bunx --package @mit-sdg/sync-engine@1.1.0 sync-engine setup
```

`setup` creates a `package.json` with sync-engine pinned to version 1.1.0, installs it, and writes a few starter files. Run it while the folder is still empty. In a folder that already has files, it doesn't install anything.

Then add the HTTP adapter and the MongoDB driver:

```sh
bun add --exact @mit-sdg/sync-engine-http@1.1.0
bun add mongodb
```

The HTTP adapter's version has to match sync-engine's exactly, so it's pinned to 1.1.0 too.

The finished app pins MongoDB's BSON dependency to 7.2.0 for Bun 1.3 compatibility.
Add this top-level section to `package.json`, then run `bun install`:

```json
  "overrides": {
    "bson": "7.2.0"
  }
```

Bun 1.4 also works with this pin.

Next, create a file called `.env` with the connection string from the MongoDB guide:

```
MONGODB_URL=mongodb://dev:dev@127.0.0.1:27017/myapp?authSource=admin
```

The `/myapp` part names the database. `authSource=admin` tells MongoDB where to
check the credentials, because the container's root user belongs to `admin`.
When you use managed MongoDB, keep the database name and authentication settings
from its connection string.

Save the same line in `.env.example`, which is the copy you commit. The `.gitignore` that `setup` wrote ignores every file whose name starts with `.env.`, and that includes `.env.example`. Add this line at the end of `.gitignore`, so `.env.example` can be committed while `.env` stays on your computer:

```
!.env.example
```

Finally, add the commands we'll use. Open `package.json` and replace the `"scripts"` section with this:

```json
  "scripts": {
    "generate": "sync-engine artifacts pin",
    "check": "sync-engine check && sync-engine artifacts check && tsc --noEmit",
    "start": "bun src/main.ts",
    "check:design": "sync-engine check-design design/concepts/*.md design/types.md design/compositions/*.md",
    "dev": "bun run db:up && bun run --parallel dev:backend dev:frontend",
    "dev:backend": "bun --watch src/main.ts",
    "dev:frontend": "bun --watch web/server.ts",
    "up": "podman compose up -d --build && bun scripts/check-api.ts http://127.0.0.1:8080 --wait",
    "down": "podman compose down",
    "logs": "podman compose logs backend frontend",
    "db:up": "podman compose up -d mongo",
    "db:shell": "podman compose exec mongo mongosh -u dev -p dev",
    "db:logs": "podman compose logs mongo",
    "db:reset": "podman compose down -v"
  }
```

The first three are the ones `setup` wrote. We'll go through the rest as we use them.

<details>
<summary>What did setup create?</summary>

Besides `package.json` and its lockfile, `setup` wrote these files:

- `tsconfig.json` configures TypeScript for Bun.
- `src/text.d.ts` lets TypeScript import Markdown files as text, which the concept's registration does in step 3.
- `src/concepts.ts` lists the app's concepts. It starts out empty.
- `src/assembly.ts` builds the application from the concepts and the composition.
- `src/main.ts` is the program that `bun run start` runs.
- `generated.config.ts` tells sync-engine's tools how to build the app and where its design files are.

You'll replace the last four in step 3. `setup` never overwrites a file that already exists, so running it again is safe.

</details>

## 2. Write the design

A sync-engine app starts with its design. The design files in `design/` say what each concept does and how the app connects the concepts, and later `bun run check` makes sure the code agrees with them. Finish all of the design before you write any code. This guide is about running an app rather than designing one, so we'll go quickly. The [background docs](../resources.md#background) explain how to design concepts, and sync-engine's [authoring guide](https://github.com/mit-sdg/sync-engine/blob/v1.1.0/docs/user/guide/authoring.md) explains each file.

We'll reuse Reserving from the MongoDB guide, trimmed down to reserving and cancelling. Save its specification as `design/concepts/Reserving.md`:

````md
# Reserving

## Purpose

Hold a resource for one user at a time, so two people never end up with the same table.

## Principle

Barish reserves friday-7pm-table-4. When Eagon then tries to reserve the same table, the
request is refused. After Barish cancels, Carmel can reserve it.

## Types

```types
external User
  The person who holds a reservation.

external Resource
  The thing being reserved, such as a table at a certain time.
```

## State

```state
a set of Reservations with
  a User
  a unique Resource
```

## Actions

```actions
reserve(user: User, resource: Resource) : returns (reservation: Reservation)
  where resource is already reserved
  then
    refuses ALREADY_RESERVED "That resource is already reserved."
  where resource is not reserved
  then
    add a new reservation with user and resource
    returns reservation

cancel(reservation: Reservation) : returns (reservation: Reservation)
  where reservation is in Reservations
  then
    remove reservation
    returns reservation
  where reservation is not in Reservations
  then
    refuses NO_SUCH_RESERVATION "There is no such reservation."
```

## Queries

```queries
_all() : many (reservation: Reservation, user: User, resource: Resource)
  Answers every reservation, ordered by resource, and no rows when there are none.
```
````

In State, a field written as just a type is named after that type. So `a User` gives each reservation a `user`, and `a unique Resource` gives it a `resource` that no other reservation shares.

The app's design lists every concept instance and what fills in its external types. Save this as `design/types.md`:

````md
# Application types

Guests type their own name, and each reservation holds one table at one time.

```types
concrete Name
  The name a guest types in when reserving.

concrete Table
  A table at a certain time, such as friday-7pm-table-4.
```

```instances
instantiate Reserving with
  User is Name
  Resource is Table
```
````

The composition describes the app's endpoints, which are the requests the frontend can make. Save this as `design/compositions/Reservations.md`:

````md
# Reservations

Anyone can [list the reservations](reaction:Reservations.List). The
[reservation book](former:Reservations.ReservationBook) gathers them in table order.

```endpoints
Reservations.List at /reservations/list
```

A guest [reserves a table](reaction:Reservations.Reserve) under their name, and anyone can
[cancel a reservation](reaction:Reservations.Cancel).

```endpoints
Reservations.Reserve at /reservations/reserve
Reservations.Cancel at /reservations/cancel
```
````

The links like `reaction:Reservations.List` name the declarations that step 3 writes in code. Now check the design:

```sh
bun run check:design
```

You should see `Design form check passed for 3 files.` This checks how the files are written, before there's any code. Once the code exists, `bun run check` also compares the two.

<details>
<summary>Troubleshooting</summary>

**"an action's signature resolves with `: returns (…)`."** The specification uses the keywords from sync-engine 1.0.0. Since 1.1.0, an action's signature uses `: returns (...)`, and each branch ends with `returns` or `refuses`. The check lists every line to change.

**Any other message.** It names the file, the line, and what it expected there. The [concept specification reference](https://github.com/mit-sdg/sync-engine/blob/v1.1.0/docs/user/reference/concept-specification.md) shows the whole format.

</details>

## 3. Write the backend

Now the backend, from the concept's class to the server. It's all in `src/`.

### Connecting to MongoDB

The connection uses the URI from `.env`, including its database name. Save this as `src/db.ts`:

```ts
import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error("MONGODB_URL is not set. Add it to your .env file.");
}

export const client = new MongoClient(url);
export const db = client.db();
```

### The concept

The class implements the specification and keeps the unique index from the MongoDB guide. Save it as `src/concepts/Reserving.ts`:

```ts
import { MongoServerError, type Collection, type Db } from "mongodb";

export class AlreadyReserved extends Error {}
export class NoSuchReservation extends Error {}

interface Reservation {
  _id: string;
  user: string;
  resource: string;
}

export class ReservingConcept {
  private readonly reservations: Collection<Reservation>;
  private indexed = false;

  constructor(db: Db) {
    this.reservations = db.collection<Reservation>("reserving.reservations");
  }

  async reserve({ user, resource }: { user: string; resource: string }) {
    if (!this.indexed) {
      // The unique index stops a resource from being reserved twice.
      await this.reservations.createIndex({ resource: 1 }, { unique: true });
      this.indexed = true;
    }
    const reservation = crypto.randomUUID();
    try {
      await this.reservations.insertOne({ _id: reservation, user, resource });
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new AlreadyReserved("That resource is already reserved.");
      }
      throw error;
    }
    return { reservation };
  }

  async cancel({ reservation }: { reservation: string }) {
    const result = await this.reservations.deleteOne({ _id: reservation });
    if (result.deletedCount === 0) {
      throw new NoSuchReservation("There is no such reservation.");
    }
    return { reservation };
  }

  async _all(_input: Record<string, never>) {
    const rows = await this.reservations.find().sort({ resource: 1 }).toArray();
    return rows.map(({ _id, user, resource }) => ({ reservation: _id, user, resource }));
  }
}
```

sync-engine calls each action with one object and expects one back, and query names start with an underscore. To refuse, an action throws one of the concept's own error classes, and sync-engine turns it into the refusal named in the specification.

The index is created on the first reservation, not in the constructor, and that's on purpose. `bun run generate` and `bun run check` build the app too, but they don't need a database. If the constructor talked to MongoDB, they would hang on the open connection, or fail when MongoDB isn't running.

Now register the concept with its specification and its refusals. Replace `src/concepts.ts` with this:

```ts
import { conceptSet, registerConcept } from "@mit-sdg/sync-engine/assembly";
import spec from "@design/concepts/Reserving.md" with { type: "text" };
import { AlreadyReserved, NoSuchReservation, ReservingConcept } from "./concepts/Reserving.ts";

const reserving = registerConcept({
  class: ReservingConcept,
  spec,
  refusals: { ALREADY_RESERVED: AlreadyReserved, NO_SUCH_RESERVATION: NoSuchReservation },
});

export const applicationConceptSet = conceptSet({ Reserving: reserving });
export const { concepts } = applicationConceptSet;
```

### The endpoints

These are the declarations that the composition's design names. Save them as `src/compositions/Reservations.ts`:

```ts
import { endpoint, receive, respond } from "@mit-sdg/sync-engine/boundary";
import { each, form, former } from "@mit-sdg/sync-engine/language";
import { concepts } from "../concepts.ts";

const { Reserving } = concepts;

const ReservationBook = former("the reservation book", (_input, { reservation, user, resource }) =>
  form({
    reservations: each(Reserving._all({}).is({ reservation, user, resource })).form({
      reservation,
      user,
      resource,
    }),
  }),
);

const List = endpoint("/reservations/list", () =>
  receive({}).then(respond({ book: ReservationBook({}) })),
);

const Reserve = endpoint(
  "/reservations/reserve",
  ({ user, resource, reservation }) =>
    receive({ user, resource })
      .then(Reserving.reserve({ user, resource }).responds({ reservation }))
      .then(respond({ reservation })),
  { input: { required: ["user", "resource"] } },
);

const Cancel = endpoint(
  "/reservations/cancel",
  ({ reservation }) =>
    receive({ reservation })
      .then(Reserving.cancel({ reservation }).responds({ reservation }))
      .then(respond({ reservation })),
  { input: { required: ["reservation"] } },
);

export const composition = { ReservationBook, List, Reserve, Cancel };
```

`List` answers with the reservation book, which the `ReservationBook` former builds from the concept's query. `Reserve` and `Cancel` pass their input to the concept and answer with the reservation's id. If the concept refuses, the endpoint answers with the refusal instead.

### Putting it together

The application gets built in `src/assembly.ts`. Replace it with this:

```ts
import { assemble } from "@mit-sdg/sync-engine/assembly";
import { composition } from "./compositions/Reservations.ts";
import { ReservingConcept } from "./concepts/Reserving.ts";
import { applicationConceptSet } from "./concepts.ts";
import { db } from "./db.ts";

export function assembleApplication() {
  return assemble({
    conceptSet: applicationConceptSet,
    instances: { Reserving: new ReservingConcept(db) },
    composition: { Reservations: composition },
    // Print what went wrong. Otherwise a failure only shows up as INTERNAL_ERROR.
    rawFaultReporter: ({ error }) => console.error(error),
  });
}
```

sync-engine usually creates each concept's object by itself, but `ReservingConcept` needs the database, so `instances` hands it one.

Next, decide how the endpoints look over HTTP. Save this as `src/http.ts`:

```ts
import { httpPolicy } from "@mit-sdg/sync-engine-http/policy";

export const policy = httpPolicy({
  basePath: "/api",
  publicErrors: { ALREADY_RESERVED: "CONFLICT", NO_SUCH_RESERVATION: "NOT_FOUND" },
});
```

`basePath` puts every endpoint under `/api`, so reserving a table is a `POST` to `/api/reservations/reserve`. `publicErrors` decides what the browser sees when the concept refuses. `ALREADY_RESERVED` becomes `CONFLICT` with status 409, and `NO_SUCH_RESERVATION` becomes `NOT_FOUND` with status 404. Anything not listed shows up as `INTERNAL_ERROR`, so the details of a failure stay on the server.

The server puts the endpoints on the network. Replace `src/main.ts` with this:

```ts
import { createGateway } from "@mit-sdg/sync-engine/boundary";
import { createHttpHandler } from "@mit-sdg/sync-engine-http/handler";
import { assembleApplication } from "./assembly.ts";
import { policy } from "./http.ts";
import { db } from "./db.ts";

const application = assembleApplication();
const gateway = createGateway({ application });
const api = createHttpHandler({ application, gateway, policy });

const server = Bun.serve({
  hostname: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/api/*": api,
    "/health": async () => {
      try {
        await db.collection("reserving.reservations").findOne({}, { maxTimeMS: 2000, timeoutMS: 3000 });
        return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
      } catch {
        return Response.json(
          { status: "unavailable" },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      }
    },
  },
});

console.log(`Backend listening on ${server.url}`);
```

`createHttpHandler` turns the application into a function that answers HTTP requests, and `Bun.serve` runs it on port 3000. The server listens on `127.0.0.1` unless the `HOST` environment variable says otherwise, which the container in step 6 uses. Its `/health` route returns HTTP 200 when it can read MongoDB, or 503 while the database is unavailable.

Last, replace `generated.config.ts`, which tells sync-engine's tools where everything is:

```ts
import { httpWire } from "@mit-sdg/sync-engine-http/tooling";
import { assembleApplication } from "./src/assembly.ts";
import { policy } from "./src/http.ts";

export default {
  assemble: assembleApplication,
  title: "Reservations",
  wireName: "ReservationsWire",
  design: {
    version: 1,
    documents: [
      new URL("./design/types.md", import.meta.url),
      new URL("./design/compositions/Reservations.md", import.meta.url),
    ],
  },
  projections: [httpWire({ policy, name: "ReservationsWireHttp" })],
};
```

Now generate the wire types and check everything:

```sh
bun run generate
bun run check
```

`generate` writes two files to the `generated` folder. `wire.ts` describes every endpoint's input, output, and errors as TypeScript types, for the code that calls the backend. `reservations.md` is a summary of the assembled app for you to read. `check` compares the code with the design and typechecks everything. It should end with `Application diagnostic check passed`. It may also mention a few advisories, which are suggestions and don't fail the check.

<details>
<summary>Troubleshooting</summary>

**"MONGODB_URL is not set."** `src/db.ts` reads the connection string from `.env`, and the tools load the app's code too. Create `.env` as in step 1.

**"Cannot find package '@design/concepts'."** The specification isn't where `src/concepts.ts` expects it. Check that it's saved as `design/concepts/Reserving.md`, with the `design` folder at the top of the project.

**"the action `cancel` declares the inputs `reservation` but the class takes `id`."** A message like this one means the design and the code disagree. The names in the specification have to match the class exactly, including the action, query, and field names, and the message says which one differs. Decide which side is right. If it's the design, fix the code. If the design needs to change, change it first and run `bun run check:design` again.

**"reservations.md and wire.ts differ from generated output."** The generated files are out of date. Run `bun run generate` again. You need to do this after every change to an endpoint or a design file.

</details>

## 4. Run the backend

The backend is finished, so let's run it. It needs MongoDB, and Compose starts it from a file called `compose.yaml`. Save this in the project folder, just as in the MongoDB guide:

```yaml
services:
  mongo:
    image: docker.io/library/mongo:8.0
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: dev
      MONGO_INITDB_ROOT_PASSWORD: dev
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

The MongoDB container from your `mongo-practice` folder uses the same port as this one, so stop it first if it's still running. In the `mongo-practice` folder, run:

```sh
bun run db:down
```

Then, back in `reservations`, start MongoDB and the backend:

```sh
bun run db:up
bun run dev:backend
```

`db:up` starts MongoDB in its container, in the background. `dev:backend` runs the backend with `bun --watch src/main.ts`, which restarts the server whenever you save one of its files. You should see `Backend listening on http://127.0.0.1:3000/`. It keeps running until you press Ctrl+C.

There's no frontend yet, so try the backend from a script. Save this as `scripts/try-api.ts`:

```ts
import { createHttpClient } from "@mit-sdg/sync-engine-http/client";
import type { ReservationsWireHttp } from "../generated/wire.ts";

const client = createHttpClient<ReservationsWireHttp>({ baseUrl: "http://127.0.0.1:3000/api" });

console.log("barish:", await client.reservations.reserve({ user: "barish", resource: "friday-7pm-table-4" }));
console.log("eagon:", await client.reservations.reserve({ user: "eagon", resource: "friday-7pm-table-4" }));
console.log("carmel:", await client.reservations.reserve({ user: "carmel", resource: "friday-8pm-table-4" }));

const result = await client.reservations.list({});
if (!("error" in result)) {
  for (const { resource, user } of result.book.reservations) {
    console.log(`${resource} is reserved by ${user}`);
  }
}
```

The client comes from the HTTP adapter and gets its types from `generated/wire.ts`. So `client.reservations.reserve` takes a user and a resource, and TypeScript flags a typo in either one. Every call returns either the endpoint's answer or an object with an `error` field. That's why the code checks `"error" in result` before it uses the answer.

Run it in a second terminal:

```sh
bun scripts/try-api.ts
```

Barish and Carmel get their tables, and Eagon gets `{ error: "CONFLICT" }`, because the unique index refused a second reservation for the same table. Run it again, and this time everyone gets a conflict, since the reservations from the first run are saved in MongoDB. To see them there, run `bun run db:shell`, then `use myapp` and `db.reserving.reservations.find()`.

Now change the backend while it's running. In `src/main.ts`, change `Backend listening on` to `Backend ready on` and save. The server restarts right away and prints the new message. If you save a typo, Bun prints the error and keeps waiting, and the server comes back as soon as you fix it.

<details>
<summary>Why don't the backend and frontend run in containers while you develop?</summary>

They could, but then saving a file wouldn't restart them on every computer. Bun restarts a server when it hears that a file changed. On macOS and Windows, containers run inside a virtual machine, and if you share your project folder with a container, saving a file doesn't notify the programs inside it. Bun would keep running your old code. Compose has a watch feature that copies each change into the container instead, but it needs Docker's Compose tool, which Linux setups usually don't have.

Running Bun directly on your computer restarts the server instantly on every system. MongoDB doesn't change while you work, so it stays in its container. Step 6 runs everything in containers when you want to see the app the way it'll be deployed.

</details>

<details>
<summary>Why does the server only listen on 127.0.0.1?</summary>

`127.0.0.1` is your computer's loopback address, which only programs on your computer can reach. If the server listened on every address instead, anyone on the same café or campus network could reach your app. That's the same reason `compose.yaml` publishes MongoDB's port on `127.0.0.1` only.

</details>

<details>
<summary>Troubleshooting</summary>

**"address already in use" for port 27017.** Another MongoDB is using the port, most likely the one in `mongo-practice`. Run `bun run db:down` in that folder, or run `podman ps` to find the container that has the port.

**"Failed to start server. Is port 3000 in use?"** Another program is using port 3000. It might be a second copy of the backend in another terminal, or the containers from step 6. Stop it, or run `bun run down` if it's the containers.

**Podman says it can't connect.** On macOS and Windows, this usually means the Podman machine isn't running. Run `podman machine start`.

**MongoDB doesn't start, or stops right away.** Run `bun run db:logs` to see what it printed. The MongoDB guide's troubleshooting covers the common causes.

**The API answers `INTERNAL_ERROR`.** Something failed in the backend. Its terminal shows the actual error, thanks to the `rawFaultReporter` line in `src/assembly.ts`. If MongoDB isn't running, the error appears after about 30 seconds, when the driver gives up.

</details>

## 5. Write the frontend

With the backend running, the frontend can use it. The frontend lives in its own folder, `web`. First, add `web` to the `include` list in `tsconfig.json`, so that `bun run check` typechecks it too:

```json
  "include": ["src", "web", "generated.config.ts", "generated"]
```

The page goes in `web/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Reservations</title>
    <link rel="stylesheet" href="./styles.css" />
    <script type="module" src="./app.ts"></script>
  </head>
  <body>
    <h1>Reservations</h1>
    <form id="reserve">
      <input name="user" placeholder="Your name" required />
      <input name="resource" placeholder="friday-7pm-table-4" required />
      <button>Reserve</button>
    </form>
    <p id="status"></p>
    <ul id="reservations"></ul>
  </body>
</html>
```

The styles go in `web/styles.css`:

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
}

form {
  display: flex;
  gap: 0.5rem;
}

li {
  margin: 0.5rem 0;
}
```

The code that runs in the browser goes in `web/app.ts`. It uses the same client as the script in step 4:

```ts
import { createHttpClient } from "@mit-sdg/sync-engine-http/client";
import type { ReservationsWireHttp } from "../generated/wire.ts";

const client = createHttpClient<ReservationsWireHttp>({ baseUrl: "/api" });

const form = document.querySelector<HTMLFormElement>("#reserve")!;
const status = document.querySelector<HTMLParagraphElement>("#status")!;
const list = document.querySelector<HTMLUListElement>("#reservations")!;

async function showReservations() {
  const result = await client.reservations.list({});
  if ("error" in result) {
    status.textContent = `Could not load reservations: ${result.error}`;
    return;
  }
  list.replaceChildren(
    ...result.book.reservations.map(({ reservation, user, resource }) => {
      const cancel = document.createElement("button");
      cancel.textContent = "Cancel";
      cancel.addEventListener("click", async () => {
        await client.reservations.cancel({ reservation });
        await showReservations();
      });
      const item = document.createElement("li");
      item.append(`${resource}, reserved by ${user} `, cancel);
      return item;
    }),
  );
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const result = await client.reservations.reserve({
    user: String(data.get("user")),
    resource: String(data.get("resource")),
  });
  status.textContent = "error" in result ? `Could not reserve: ${result.error}` : "Reserved!";
  await showReservations();
});

showReservations();
```

Last comes the frontend's server, which sends the page to the browser. Save it as `web/server.ts`:

```ts
import homepage from "./index.html";

const backend = process.env.BACKEND_URL ?? "http://127.0.0.1:3000";

// Pass API requests and health checks on to the backend.
function proxy(request: Request) {
  const url = new URL(request.url);
  return fetch(new URL(url.pathname + url.search, backend), request).catch(
    () => Response.json({ error: "UNAVAILABLE" }, { status: 503 }),
  );
}

const server = Bun.serve({
  hostname: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT ?? 8080),
  routes: {
    "/": homepage,
    "/api/*": proxy,
    "/health": proxy,
  },
});

console.log(`Frontend listening on ${server.url}`);
```

Importing `index.html` hands Bun the whole frontend. Bun reads the page, finds `app.ts` and `styles.css` in it, turns the TypeScript into JavaScript, and serves the result at `/`. Unless `NODE_ENV` is set to `production`, the server runs in development mode. It rebuilds the page whenever you save one of its files and tells the browser to update. Requests under `/api/`, and the `/health` check, go on to the backend, and if the backend can't be reached, the frontend answers with an `UNAVAILABLE` error instead.

Now that both servers exist, replace `start` in `package.json` and add two scripts:

```json
    "start": "bun run --parallel start:backend start:frontend",
    "start:backend": "HOST=127.0.0.1 PORT=4000 bun src/main.ts",
    "start:frontend": "HOST=0.0.0.0 BACKEND_URL=http://127.0.0.1:4000 bun web/server.ts"
```

`bun run start` runs both servers together. The frontend accepts
connections on port 8080, or the `PORT` you set, and the backend stays on the
internal port 4000. If your deployment platform sets `PORT`, configure its app
port to match and use `/health` as its readiness check. The `dev` commands keep
the separate local ports used below.

Now the whole app can run. Press Ctrl+C to stop `bun run dev:backend`, then start everything:

```sh
bun run dev
```

This runs `db:up`, then runs `dev:backend` and `dev:frontend` side by side. Each line of output starts with the name of the one that printed it. You should see `Backend listening on` and `Frontend listening on http://127.0.0.1:8080/`. Ctrl+C stops both. MongoDB keeps running in its container until you run `bun run down`.

Open http://127.0.0.1:8080. The reservations from your script are already there. Reserve a table, then try to reserve the same table under another name. The second try says `Could not reserve: CONFLICT`.

Now leave the page open, change something, and save:

- Change a style in `styles.css`, like the `max-width`, and the page updates without reloading.
- Change `app.ts` or `index.html`, and the page reloads.
- Change a backend file, and the backend restarts. The page keeps working.

Then run `bun run check` to typecheck the frontend too.

<details>
<summary>Why does the frontend pass API requests on to the backend?</summary>

The browser treats `http://127.0.0.1:8080` and `http://127.0.0.1:3000` as different origins, because their ports differ. If the page called the backend directly, every API call would be a cross-origin request. The backend would need extra settings to allow those, called CORS, and cookies would have extra rules on top. Since the frontend server passes `/api` requests along, the browser only ever talks to one origin, and none of that comes up.

The HTTP adapter can handle a frontend on another origin if you need one. Its [README](https://github.com/mit-sdg/sync-engine/blob/main/packages/http/README.md) shows the `browser` setting for that.

</details>

<details>
<summary>Adding sessions with cookies</summary>

The HTTP adapter can keep a session in a cookie. For that, its policy needs a `publicOrigin`, which is the address the browser uses. Here that's the frontend's address, `http://127.0.0.1:8080`, since the browser only talks to the frontend. The adapter refuses requests that set or use the cookie, like signing in, when they come from any other origin. That includes `http://localhost:8080`, so always open the app at the same address.

sync-engine's [Message Board example](https://github.com/mit-sdg/sync-engine/tree/main/examples/message-board) is a complete app with sessions.

</details>

<details>
<summary>Troubleshooting</summary>

**`bun run dev` stops right away, and one side says "Module not found".** One of the two servers couldn't start, so `bun run dev` stopped the other one too. Check that the file it names exists, such as `web/server.ts`.

**The page says "Build Failed".** Bun couldn't turn your frontend code into JavaScript, often because of a typo. The terminal shows the error and the line it's on. Fix it and save, and the page reloads.

**The page says `Could not load reservations: UNAVAILABLE`.** The frontend couldn't reach the backend. Look in the terminal for an error from the backend.

**"Failed to start server. Is port 8080 in use?"** Another program is using port 8080, maybe the containers from step 6. Stop it, or run `bun run down` if it's the containers.

**The browser console mentions `import.meta.hot.accept`.** Bun is noting that it reloaded the whole page instead of swapping in only the changed code. You can ignore it.

</details>

## 6. Run everything in containers

`bun run dev` is for working on the app. To see it the way it'll run once it's deployed, run all three parts in containers. A deployed app runs from an image, gets its settings from environment variables, and can't see the files on your computer. Trying that setup locally catches problems before you deploy, like a file that the image is missing or a setting that only exists in your `.env`. It also lets a teammate or an agent start the whole app with one command.

The steps to build an image for the app go in a file called `Dockerfile`. Podman reads Docker's file formats, so the file keeps Docker's name. Save this in the project folder:

```dockerfile
FROM docker.io/oven/bun:1.4
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY . .
ENV NODE_ENV=production HOST=0.0.0.0
```

Each line is one step of the build:

- `FROM` starts from the official Bun image, version 1.4.
- `WORKDIR` makes `/app` the folder for the steps that follow.
- The first `COPY` and the `RUN` install the packages listed in your lockfile, leaving out the ones under `devDependencies`.
- The second `COPY` adds the rest of the project.
- `ENV` sets two environment variables for every program that runs from the image. With `NODE_ENV=production`, Bun builds and minifies the page once, instead of rebuilding it for every change. `HOST=0.0.0.0` lets the servers accept connections from outside their containers.

The backend and the frontend both run from this one image, so the image doesn't say which command to run. `compose.yaml` gives each one its own.

Installing the packages before copying the rest of the project makes rebuilds fast. Podman saves the result of each step and reuses it until something that step depends on changes. A change to your code only affects the second `COPY`, so a rebuild after a code change skips the install.

That second `COPY` would also copy `node_modules` and `.env`, which don't belong in the image. Leave them out with a file called `.dockerignore`:

```
node_modules
.env
.git
```

Now add the backend and the frontend to `compose.yaml`. Replace it with this:

```yaml
services:
  mongo:
    image: docker.io/library/mongo:8.0
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: dev
      MONGO_INITDB_ROOT_PASSWORD: dev
    volumes:
      - mongo-data:/data/db

  backend:
    build: .
    command: bun src/main.ts
    init: true
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      MONGODB_URL: mongodb://dev:dev@mongo:27017/myapp?authSource=admin
    depends_on:
      - mongo

  frontend:
    build: .
    command: bun web/server.ts
    init: true
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      BACKEND_URL: http://backend:3000
    depends_on:
      - backend

volumes:
  mongo-data:
```

The `mongo` service is the same as before. The two new services work like this:

- `build` builds the image from the `Dockerfile` in this folder.
- `command` is what the container runs, which is the backend's server or the frontend's.
- `init` adds a tiny program that passes stop signals on to Bun, so the container stops right away.
- `ports` makes the servers reachable at the same addresses as with `bun run dev`, from your computer only.
- `environment` tells the backend to find the database at `mongo`, and the frontend to find the backend at `backend`. Those are the services' names.
- `depends_on` starts the services in order, MongoDB first.

This setup runs in the background, so you need a way to tell when it's ready. Save this as `scripts/check-api.ts`:

```ts
import { createHttpClient } from "@mit-sdg/sync-engine-http/client";
import type { ReservationsWireHttp } from "../generated/wire.ts";

const address = process.argv.slice(2).find((arg) => !arg.startsWith("--")) ?? "http://127.0.0.1:3000";
// With --wait, keep trying for 60 seconds. That gives the containers time to start.
const deadline = Date.now() + (process.argv.includes("--wait") ? 60_000 : 0);
const client = createHttpClient<ReservationsWireHttp>({ baseUrl: `${address}/api` });

while (true) {
  const result = await client.reservations.list({});
  if (!("error" in result)) {
    console.log(`The API at ${address} answered. It has ${result.book.reservations.length} reservation(s).`);
    break;
  }
  if (Date.now() > deadline) {
    console.error(`Could not reach the API at ${address}. The client says ${result.error}.`);
    process.exit(1);
  }
  await Bun.sleep(1000);
}
```

The containers use the same ports as `bun run dev`, so stop `bun run dev` with Ctrl+C first. Then start everything in containers:

```sh
bun run up
```

This runs `podman compose up -d --build`, which builds the image and starts all three containers in the background. The first build downloads the Bun image, so it takes a minute or two. Then it runs `scripts/check-api.ts` with `--wait`, which keeps asking for the reservations through the frontend until it gets an answer. That only works once all three services are up. You should see `The API at http://127.0.0.1:8080 answered.` at the end. Open http://127.0.0.1:8080 and try the app.

These are the commands you'll use with the containers:

```sh
bun run logs     # see what the backend and frontend have printed
bun run up       # rebuild and restart after you change code
bun run down     # stop and remove the containers, keeping your data
```

The containers don't pick up your changes on their own, so run `bun run up` again after you change code. It only rebuilds what changed, so it's quick after the first time. To go back to `bun run dev`, run `bun run down` first. `bun run dev` starts MongoDB again by itself, with your data still there.

<details>
<summary>How do the services find each other?</summary>

Compose puts the containers on a private network and gives each one its service name as a hostname. Inside the backend's container, `mongo` means the MongoDB container. `127.0.0.1` would mean the backend's container itself, where nothing is listening on port 27017. The frontend reaches the backend at `backend` in the same way.

From your computer it's the other way around. The services are reachable at `127.0.0.1` through their published ports, and names like `mongo` mean nothing. That's why `.env` and `compose.yaml` have different connection strings. The containers never see `.env`, because `.dockerignore` keeps it out of the image.

`depends_on` only controls the order the containers start in. It doesn't wait for MongoDB to be ready. That's fine here, because the MongoDB driver keeps trying to connect for up to 30 seconds before it gives up.

</details>

<details>
<summary>Why do the servers listen on 0.0.0.0 in a container?</summary>

A container has its own loopback address, separate from your computer's. The published port forwards connections to the container's network address, not to its loopback, so a server listening only on `127.0.0.1` inside the container never sees them. `0.0.0.0` means every address the container has. The app is still private, because `compose.yaml` publishes each port on `127.0.0.1` of your computer only.

</details>

<details>
<summary>What does init do?</summary>

To stop a container, Podman sends its main program a signal asking it to exit, and forces it to stop ten seconds later. On Linux, a container's main program ignores that signal unless it has set up its own way of handling it, and Bun hasn't. Without `init`, every `bun run down` would take ten seconds or more. `init` makes a tiny program the main one instead. It starts Bun and passes the signal on, and Bun exits right away.

</details>

<details>
<summary>Troubleshooting</summary>

**"address already in use" for port 3000 or 8080.** `bun run dev` is probably still running. Stop it with Ctrl+C, then run `bun run up` again.

**"lockfile had changes, but lockfile is frozen."** `package.json` lists packages that `bun.lock` doesn't. Run `bun install` on your computer to update the lockfile, then run `bun run up` again.

**"Could not reach the API at http://127.0.0.1:8080."** The app didn't answer within a minute. Run `bun run logs` to see why. If it says `MONGODB_URL is not set`, check the `environment` section of `compose.yaml`.

**The page answers with an error, but works with `bun run dev`.** In production mode, Bun doesn't print why it couldn't build the page. Run `bun run down`, start `bun run dev`, and open the page there. The terminal shows the error.

**"failed to connect to the docker API" on Linux.** Podman's background service isn't running, as in the MongoDB guide. Run `systemctl --user enable --now podman.socket`, then try again.

**The disk fills up with old images.** Every rebuild leaves the previous image behind, without a name. Run `podman image prune` now and then to delete those.

</details>

## 7. Tell your agent

Agents read `AGENTS.md` at the root of a project, and they can work out most of the rest from the code. A few lines about the commands are enough:

```md
## Running the app

- `bun run dev` starts MongoDB in a container, then the backend at http://127.0.0.1:3000 and the frontend at http://127.0.0.1:8080, both in watch mode.
- `bun run up` runs all three in containers. `bun run down` stops them, and `bun run db:reset` deletes the local data.
- Change `design/` before the code. Check it with `bun run check:design`, then run `bun run generate` and `bun run check`.
```
