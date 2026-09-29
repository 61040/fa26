---
title: Setting up MongoDB for local development
---

This guide gets MongoDB running on your own computer and shows you how to connect to it and test against it. We also set things up so a coding agent can start and reset the database on its own, since you'll probably be working with one.

Follow the numbered steps in order and you'll be set up. In step 1, you'll open the section for your operating system and follow it. Every other collapsed section, like the one below, is optional background.

<details>
<summary>Why run the database locally instead of in the cloud?</summary>

When you deploy an app, you might use a hosted database like MongoDB Atlas. While you're developing, though, we recommend a database on your own machine.

The biggest difference is speed. Every query to a cloud database makes a round trip over the internet, and a single test run can make thousands of them. Free cloud tiers also go to sleep or pause when they haven't been used for a while, so the first request is slow, or you have to log in and wake the database up.

A local database is also easier for coding agents to work with. An agent can start it, wipe it, and check its logs from the terminal, without a login or a web dashboard. It only holds practice data, so if you or an agent deletes the wrong thing, you reset it and keep going.

If you later deploy with a hosted database, you point your app at it by changing the connection string. The rest of your code stays as it is.

</details>

## 1. Install Podman and Compose

We'll run MongoDB inside a container. A container bundles a program with everything it needs to run, so MongoDB behaves the same way on every computer in the class. Containers start from images, which are packaged programs you download once. To run containers we use Podman, which works on macOS, Windows, and Linux. We also install Compose, which lets you describe your containers in a file instead of typing long commands. Podman uses the same images and Compose files as Docker, another popular container tool, so you'll see the name Docker in a few places.

Open the section for your operating system and follow its steps. Unlike the other collapsed sections, this one is required.

<details>
<summary>macOS</summary>

1. Download the Podman installer (the `.pkg` file) from [podman.io](https://podman.io) and run it.
2. Install Compose. If you use [Homebrew](https://brew.sh), run the command below. If you don't, install [Podman Desktop](https://podman-desktop.io) and set up Compose under Settings, then Resources.

   ```sh
   brew install docker-compose
   ```

3. Create the Podman machine. Containers need Linux, so on macOS Podman runs them inside a small Linux virtual machine. You only do this once.

   ```sh
   podman machine init
   ```

4. Start the machine:

   ```sh
   podman machine start
   ```

After you restart your computer, run `podman machine start` again before using Podman.

</details>

<details>
<summary>Windows</summary>

On Windows, Podman runs containers inside WSL 2, the Windows Subsystem for Linux.

1. Open PowerShell as Administrator and install WSL. Restart your computer if it asks you to. If you already have WSL, skip this step.

   ```powershell
   wsl --install
   ```

2. Install Podman and Compose. You can also get Podman from the installer on [podman.io](https://podman.io).

   ```powershell
   winget install RedHat.Podman
   winget install -e --id Docker.DockerCompose
   ```

3. Open a new PowerShell window (this one doesn't need Administrator) and create the Podman machine. You only do this once.

   ```powershell
   podman machine init
   ```

4. Start the machine:

   ```powershell
   podman machine start
   ```

After you restart your computer, run `podman machine start` again before using Podman.

Use PowerShell for the rest of the guide. We've kept every command on one line, so it works in PowerShell as written.

</details>

<details>
<summary>Linux</summary>

Linux runs containers directly, so there's no virtual machine to set up. Install Podman and Compose with your package manager:

```sh
# Ubuntu and Debian
sudo apt-get update && sudo apt-get install -y podman podman-compose

# Fedora
sudo dnf install -y podman podman-compose

# Arch
sudo pacman -S podman podman-compose
```

After that, you don't need `sudo` to run containers. Podman runs them under your own user.

If you already have Docker installed, `podman compose` uses Docker's Compose tool instead of `podman-compose`. Docker's tool talks to Podman through a background service, so turn that service on once:

```sh
systemctl --user enable --now podman.socket
```

</details>

Now check that both work:

```sh
podman run --rm docker.io/library/hello-world
podman compose version
```

The first command should print a message starting with "Hello from Docker!" That's expected, since the image comes from Docker Hub. The second should print a version number. Podman may also mention that it's running an external compose provider, which is normal.

<details>
<summary>What's the difference between an image and a container?</summary>

An image doesn't change once you've downloaded it. A container is a running copy of an image, with its own state, and you can start several containers from the same image.

Image names have three parts. In `docker.io/library/mongo:8.0`, `docker.io` is the registry the image comes from (Docker Hub), `library/mongo` is the image itself, and `8.0` after the colon is the tag, which picks the version.

</details>

<details>
<summary>Why do we write out full image names?</summary>

You could write `mongo:8.0` instead of `docker.io/library/mongo:8.0`. With a short name, though, Podman sometimes stops to ask which registry you mean. That's easy to answer when you're at the keyboard. An agent running the command in the background can't answer, so its command fails. With the full name, Podman never has to ask.

</details>

<details>
<summary>Using Docker instead of Podman</summary>

Docker works just as well. Install Docker Desktop on macOS or Windows, or Docker Engine on Linux. Both come with Compose, and you can skip the `podman machine` steps. Then replace `podman` with `docker` in every command, including the scripts in step 4.

On Linux, ports published by Docker can get around firewalls like ufw. That's part of why we bind every port to `127.0.0.1` in the next step.

</details>

## 2. Start MongoDB

For this guide, you'll work in a new, empty practice folder. Create one and move into it:

```sh
mkdir mongo-practice
cd mongo-practice
```

Run the rest of the commands in this guide from inside this folder. Now create a file called `compose.yaml` here:

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

This file describes one container, called `mongo`:

- `image` is MongoDB 8.0 from Docker Hub.
- `ports` makes MongoDB's port, 27017, reachable from your computer only.
- `environment` creates a user named `dev` with the password `dev` the first time MongoDB starts. After that, every connection has to log in.
- `volumes` keeps MongoDB's data in a volume named `mongo-data`, outside the container, so it's still there after the container stops. The empty `mongo-data:` at the bottom is on purpose. It tells Compose to create that volume with the default settings.

Start it:

```sh
podman compose up -d
```

The first run takes a little while because Podman has to download the image. The `-d` flag runs MongoDB in the background. To check that it's up, ask it for a ping:

```sh
podman compose exec mongo mongosh --quiet --eval "db.runCommand({ ping: 1 })"
```

If you see `{ ok: 1 }`, you're all set. If you get a connection error, MongoDB is probably still starting, so wait a few seconds and try again.

These are the commands you'll use most:

```sh
podman compose stop       # stop MongoDB, keeping your data
podman compose up -d      # start it again
podman compose logs       # see what it has printed
podman compose down -v    # delete the container and all its data
```

After you restart your computer, start the Podman machine if you're on macOS or Windows, then run `podman compose up -d`. In step 4 we'll turn these commands into short scripts.

<details>
<summary>Starting MongoDB without Compose</summary>

Compose isn't required. This single command starts the same container:

```sh
podman run -d --name mongo -p 127.0.0.1:27017:27017 -e MONGO_INITDB_ROOT_USERNAME=dev -e MONGO_INITDB_ROOT_PASSWORD=dev -v mongo-data:/data/db docker.io/library/mongo:8.0
```

We prefer Compose because the file is easier to read than a long command, and it lives in your project. Anyone who clones the project, including an agent, gets the same setup.

</details>

<details>
<summary>More on the port and the volume</summary>

The port is written as `address:host-port:container-port`. Putting `127.0.0.1` at the front means only programs on your own computer can connect. If you write `27017:27017` instead, the port opens on every network your computer is connected to, and anyone on the same café or campus network could try to log in.

A volume is storage that Podman manages outside the container. MongoDB writes its files to `/data/db` inside the container, and those files actually end up in the volume. That's why stopping or deleting the container doesn't lose your data. Compose adds the folder's name to the front, so the volume is called `mongo-practice_mongo-data`. You can list volumes with `podman volume ls`. The data is only gone after `podman compose down -v`.

On macOS and Windows, volumes live inside the Podman machine, so you won't find them among your regular files. If you ever remove the Podman machine, its volumes go with it.

</details>

<details>
<summary>Why use a password for a local database?</summary>

Only your computer can reach this database, so you could get away without one. We turn it on anyway because a hosted database will need one. If your code works with a username and password from the start, moving to a hosted database later only means changing the connection string. You'll also run into login problems now, on your own machine, instead of on the day you deploy.

The password is `dev` because it only protects throwaway local data. Never use a password like that anywhere else.

MongoDB creates the user only once, the first time it starts with an empty volume. If you change the username or password in `compose.yaml` later, MongoDB ignores the change. Run `podman compose down -v` and start again so the new values take effect.

</details>

<details>
<summary>How do I look at my data?</summary>

This opens an interactive `mongosh` session, logged in as `dev`:

```sh
podman compose exec mongo mongosh -u dev -p dev
```

From there you can run commands like `show dbs`, `use myapp`, and `show collections`. Once you've made a reservation in step 3, `db.reserving.reservations.find()` lists it. Type `exit` to leave.

If you'd rather click around, install MongoDB Compass, MongoDB's free desktop app, and connect it to `mongodb://dev:dev@127.0.0.1:27017`. There's also a MongoDB extension for VS Code that does much of the same from inside your editor.

</details>

<details>
<summary>Troubleshooting</summary>

**"looking up compose provider failed."** Podman couldn't find Compose. Go back to step 1, install it, and open a new terminal afterward.

**Podman says it can't connect.** On macOS and Windows, this usually means the Podman machine isn't running. Run `podman machine start`.

**"failed to connect to the docker API" on Linux.** Podman is using Docker's Compose tool, and Podman's background service isn't running. Run `systemctl --user enable --now podman.socket`, then try again.

**"address already in use."** Something else is already using port 27017. It might be a MongoDB you installed some other way, or another container. `podman ps` lists running containers. To find other programs, run `lsof -i :27017` on macOS or Linux, or `netstat -ano | findstr 27017` on Windows. You can stop the other program, or change the port in `compose.yaml` to `"127.0.0.1:27018:27017"` and use 27018 in your connection string.

**MongoDB stops right after starting, and the logs mention AVX.** MongoDB 5.0 and later need a processor with AVX support. Most computers from the last decade have it, though some budget Intel Celeron and Pentium chips don't. Apple Silicon Macs aren't affected. If your processor lacks AVX, change the image to `docker.io/library/mongo:4.4`. It's an old release that MongoDB no longer supports, but it's fine for coursework.

</details>

## 3. Connect from your code

The rest of this guide uses [Bun](https://bun.com) to run TypeScript. If you don't have it yet, follow the install instructions on the Bun website, then check that `bun --version` prints a version number.

Turn your practice folder into a Bun project, then add the official MongoDB driver:

```sh
bun init -y
bun add mongodb
```

`bun init` creates a `package.json`, a TypeScript config, and a few starter files next to your `compose.yaml`. The `-y` accepts the defaults without asking any questions.

Next, tell your app where to find the database. Create a file called `.env` in the same folder with this line:

```
MONGODB_URL=mongodb://dev:dev@127.0.0.1:27017
```

The `dev:dev` part is the username and password from `compose.yaml`. Bun reads `.env` automatically whenever it runs your code, and the value shows up as `process.env.MONGODB_URL`.

Also save the same line in a file called `.env.example`. Your `.env` stays on your computer, since the `.gitignore` that `bun init` created already lists it. `.env.example` is the copy you commit, so teammates and agents know what to put in their own `.env`.

Now let's make sure your code can reach MongoDB. Create a folder called `scripts`, and save this in it as `check-db.ts`:

```ts
import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL ?? "mongodb://127.0.0.1:27017";
// With --wait, keep trying for 30 seconds. That gives a fresh container time to start.
const timeout = process.argv.includes("--wait") ? 30_000 : 3_000;
const client = new MongoClient(url, { serverSelectionTimeoutMS: timeout });

try {
  await client.connect();
  const db = client.db("myapp");
  await db.command({ ping: 1 });
  const checks = db.collection("setup_checks");
  await checks.insertOne({ at: new Date() });
  console.log(`Connected to ${db.databaseName}. It has ${await checks.countDocuments()} check(s).`);
} catch (error) {
  console.error(`Could not reach MongoDB at ${url}`);
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.close();
}
```

Then run it:

```sh
bun scripts/check-db.ts
```

You should see `Connected to myapp. It has 1 check(s).` Here `myapp` is the name of the database, chosen in the code with `client.db("myapp")`. MongoDB creates it the first time you write to it. In a real project, you'd name it after the project. Run it again and the count goes up, which tells you the data is being saved. If something's wrong, it prints "Could not reach MongoDB" along with the reason. By default it gives up after three seconds. With `--wait`, it keeps trying for thirty seconds, which step 4 uses.

The script is a one-off check. In your actual app, create one client when the app starts and share it everywhere. The client keeps a pool of connections open and reuses them, so making a new client for every request is slow and can run out of connections. Create a folder called `src`, and save this in it as `db.ts`. The example below uses it.

```ts
import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error("MONGODB_URL is not set. Add it to your .env file.");
}

export const client = new MongoClient(url);
export const db = client.db("myapp");
```

Other files in `src` can then `import { db } from "./db.ts"` and use `db.collection(...)`. You don't need to call `connect()` yourself. The driver connects the first time you run a query.

### A small example

Here's an example based on the restaurant reservations from the [Designing State lecture](/lectures/designing-state.pdf). A user can reserve a resource, like a table at a certain time, and claim the reservation when they show up. The rule that matters is that a resource can't be reserved twice, and a unique index in MongoDB enforces it. Reservations live in a collection named `reserving.reservations`. The dot is just part of the name. We'll also test this class in step 5. Save it as `src/reserving.ts`:

```ts
import { MongoServerError, type Collection, type Db } from "mongodb";

export interface Reservation {
  _id: string;
  user: string;
  resource: string;
  claimed: boolean;
}

export class Reserving {
  private readonly reservations: Collection<Reservation>;
  private readonly ready: Promise<string>;

  constructor(db: Db) {
    this.reservations = db.collection<Reservation>("reserving.reservations");
    // The unique index stops a resource from being reserved twice.
    this.ready = this.reservations.createIndex({ resource: 1 }, { unique: true });
  }

  async reserve(user: string, resource: string): Promise<string> {
    await this.ready;
    const reservation: Reservation = { _id: crypto.randomUUID(), user, resource, claimed: false };
    try {
      await this.reservations.insertOne(reservation);
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new Error(`${resource} is already reserved`);
      }
      throw error;
    }
    return reservation._id;
  }

  async claim(id: string): Promise<void> {
    const result = await this.reservations.updateOne({ _id: id, claimed: false }, { $set: { claimed: true } });
    if (result.matchedCount === 0) {
      throw new Error("No unclaimed reservation with that id");
    }
  }

  async cancel(id: string): Promise<void> {
    const result = await this.reservations.deleteOne({ _id: id, claimed: false });
    if (result.deletedCount === 0) {
      throw new Error("No unclaimed reservation with that id");
    }
  }

  async forUser(user: string): Promise<Reservation[]> {
    return this.reservations.find({ user }).toArray();
  }
}
```

To try it, save this as `scripts/try-reserving.ts`:

```ts
import { client, db } from "../src/db.ts";
import { Reserving } from "../src/reserving.ts";

const reserving = new Reserving(db);

try {
  const id = await reserving.reserve("barish", "friday-7pm-table-4");
  console.log("barish reserved friday-7pm-table-4");
  await reserving.claim(id);
  console.log("barish claimed the reservation");
} catch (error) {
  console.log(`barish: ${(error as Error).message}`);
}

try {
  await reserving.reserve("eagon", "friday-7pm-table-4");
  console.log("eagon reserved friday-7pm-table-4");
} catch (error) {
  console.log(`eagon: ${(error as Error).message}`);
}

try {
  await reserving.reserve("carmel", "friday-8pm-table-4");
  console.log("carmel reserved friday-8pm-table-4");
} catch (error) {
  console.log(`carmel: ${(error as Error).message}`);
}

console.log(await reserving.forUser("barish"));
await client.close();
```

Run it with `bun scripts/try-reserving.ts`. Barish reserves the table and claims it, Eagon is turned away because the table is taken, and Carmel gets the 8pm table. Run it again, and this time everyone is turned away, because the reservations from the last run are still in the database.

<details>
<summary>Why not check first, then insert?</summary>

The obvious way to write `reserve` is to look for an existing reservation with `findOne`, and insert only if there isn't one. That works as long as one person uses the app at a time. When two requests arrive together, both can run `findOne` before either one inserts. Both see no reservation, both insert, and now two people have the same table.

The unique index closes that gap, because MongoDB itself refuses the second insert. One of the tests in step 5 reserves the same table twice at the same moment to check exactly this. If you rewrite `reserve` the check-first way, that test fails.

</details>

<details>
<summary>Why 127.0.0.1 and not localhost?</summary>

You'll see `localhost` in a lot of tutorials, and it often works. The trouble is that `localhost` can mean either the IPv4 address `127.0.0.1` or the IPv6 address `::1`, and which one gets tried first depends on your system. MongoDB only listens on `127.0.0.1`, because that's the address in `compose.yaml`. If your code happens to try `::1`, the connection is refused even though MongoDB is running fine. Writing `127.0.0.1` takes the guesswork out.

</details>

<details>
<summary>Keeping connection strings out of your code</summary>

We keep the connection string in `.env` instead of writing it into the code because it's different in different places. On your computer it points at `127.0.0.1` with a throwaway password. Once you deploy, it points at a hosted database with a real password, and that version is a secret.

</details>

<details>
<summary>Troubleshooting</summary>

**"connect ECONNREFUSED" or "Server selection timed out."** MongoDB isn't running, or it's still starting. Run `podman compose up -d`, wait a few seconds, and try again.

**"Command insert requires authentication."** Your connection string has no username and password. Check `.env` against the example above.

**"Authentication failed."** The username or password in `.env` doesn't match what MongoDB was first started with. MongoDB only creates the user once, so if you changed `compose.yaml` afterward, run `podman compose down -v` and start again.

</details>

## 4. Make it one command

You and your agent will start, check, and reset the database a lot. Instead of remembering the commands, give them short names. Open `package.json` and paste this right after the first `{` line:

```json
  "scripts": {
    "db:up": "podman compose up -d && bun scripts/check-db.ts --wait",
    "db:down": "podman compose down",
    "db:reset": "podman compose down -v && bun run db:up",
    "db:logs": "podman compose logs mongo",
    "db:shell": "podman compose exec mongo mongosh -u dev -p dev",
    "db:check": "bun scripts/check-db.ts"
  },
```

Try it:

```sh
bun run db:up
```

This starts MongoDB and then runs the check script with `--wait`, so the command only finishes once the database is ready to use. You should see `Connected to myapp` at the end.

The other scripts do the following:

- `db:down` stops and removes the container. Your data stays in the volume.
- `db:reset` also deletes the volume, then starts MongoDB again with an empty database.
- `db:logs` shows what MongoDB has printed.
- `db:shell` opens `mongosh`, already logged in.
- `db:check` runs the connection check by itself.

When you start your real project, copy `compose.yaml`, `.env.example`, `scripts/check-db.ts`, and these scripts into it. Anyone who clones it can then copy `.env.example` to `.env`, run `bun run db:up`, and get the same database.

Finally, tell your agent about these scripts. Agents look for instructions in a file called `AGENTS.md` at the root of your project. A short section is enough:

```md
## Database

This project uses MongoDB, defined in `compose.yaml`. The connection string is in `.env`.

- `bun run db:up` starts MongoDB and waits until it accepts connections.
- `bun run db:check` checks that the app can connect.
- `bun run db:reset` deletes all local data and starts fresh. It is safe to run at any time.
- `bun run db:logs` shows MongoDB's output.
- Only use the local database. Never connect to a hosted one.
```

## 5. Test against MongoDB

We give each test file its own fresh database with a random name, so tests never touch the data in `myapp`, and two test runs never get in each other's way.

The helper below has two modes. By default, tests use the real MongoDB that `bun run db:up` starts. In memory mode, which you turn on with `TEST_MONGO=memory`, they start a temporary MongoDB just for the test run. Memory mode is useful when you can't run a container, like in a cloud workspace or on an automated test server, or when your computer is low on memory. You won't need it otherwise, but we'll try it once so you know it works.

The temporary MongoDB comes from the `mongodb-memory-server` package. Add it to your project:

```sh
bun add -d mongodb-memory-server
```

Then create a folder called `tests`, and save this helper in it as `test-db.ts`:

```ts
import { MongoClient, type Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

export interface TestDb {
  db: Db;
  close(): Promise<void>;
}

// Opens a fresh database for one test file. By default it uses the real MongoDB
// from compose.yaml. Set TEST_MONGO=memory to start a temporary MongoDB instead.
export async function openTestDb(): Promise<TestDb> {
  let url = process.env.MONGODB_URL;
  let server: MongoMemoryServer | undefined;

  if (process.env.TEST_MONGO === "memory") {
    server = await MongoMemoryServer.create();
    url = server.getUri();
  }
  if (!url) {
    throw new Error("MONGODB_URL is not set. Add it to .env, or run `bun run test:memory` instead.");
  }

  const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 });
  try {
    await client.connect();
  } catch {
    throw new Error("Could not reach MongoDB. Start it with `bun run db:up`, or run `bun run test:memory` instead.");
  }
  const db = client.db(`test-${crypto.randomUUID()}`);

  return {
    db,
    async close() {
      await db.dropDatabase();
      await client.close();
      await server?.stop();
    },
  };
}
```

Now write a few tests for the `Reserving` class from step 3. Save this as `tests/reserving.test.ts`:

```ts
import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { Reserving } from "../src/reserving.ts";
import { openTestDb, type TestDb } from "./test-db.ts";

let testDb: TestDb;
let reserving: Reserving;

beforeAll(async () => {
  testDb = await openTestDb();
}, 120_000);

beforeEach(async () => {
  await testDb.db.dropDatabase();
  reserving = new Reserving(testDb.db);
});

afterAll(async () => {
  await testDb.close();
});

test("a table can only be reserved once", async () => {
  await reserving.reserve("barish", "table-4");
  await expect(reserving.reserve("eagon", "table-4")).rejects.toThrow("table-4 is already reserved");
});

test("when two people reserve at the same moment, only one gets the table", async () => {
  const results = await Promise.allSettled([
    reserving.reserve("barish", "table-4"),
    reserving.reserve("eagon", "table-4"),
  ]);
  const succeeded = results.filter((result) => result.status === "fulfilled");
  expect(succeeded).toHaveLength(1);
});

test("a reservation can only be claimed once", async () => {
  const id = await reserving.reserve("barish", "table-4");
  await reserving.claim(id);
  await expect(reserving.claim(id)).rejects.toThrow("No unclaimed reservation");
});

test("a claimed reservation can't be cancelled", async () => {
  const id = await reserving.reserve("barish", "table-4");
  await reserving.claim(id);
  await expect(reserving.cancel(id)).rejects.toThrow("No unclaimed reservation");
});

test("cancelling frees the table for someone else", async () => {
  const id = await reserving.reserve("barish", "table-4");
  await reserving.cancel(id);
  await expect(reserving.reserve("carmel", "table-4")).resolves.toBeString();
});
```

`beforeAll` opens the test database once for the whole file. `beforeEach` empties it and creates a fresh `Reserving`, which builds the unique index again, so every test starts from nothing. `afterAll` deletes the test database and closes the connection. The long timeout on `beforeAll` is for memory mode, because the very first run downloads MongoDB, and that takes longer than Bun's default of five seconds.

The second test is the interesting one. It makes two reservations for the same table at the same moment and checks that only one of them succeeds.

Next, add two lines to the `scripts` section of `package.json`, right after the `db:check` line. Put a comma at the end of the `db:check` line first:

```json
    "test": "bun test",
    "test:memory": "TEST_MONGO=memory bun test"
```

Run the tests against the real MongoDB:

```sh
bun run db:up
bun run test
```

You should see `5 pass` and `0 fail`. Now try memory mode. It doesn't need the container, so you can stop it first with `bun run db:down` if you like:

```sh
bun run test:memory
```

The first time, this downloads MongoDB, which can take a minute. After that the download is cached, and the tests should pass the same way.

Add both commands to the `AGENTS.md` section from step 4, so your agent knows how to run the tests:

```md
- `bun run test` runs the tests against the local MongoDB. Run `bun run db:up` first.
- `bun run test:memory` runs the tests with a temporary MongoDB and needs no container.
```

<details>
<summary>Which mode should I use?</summary>

Both modes run the real MongoDB server program, so your queries behave the same way in either one. Memory mode isn't a fake. `mongodb-memory-server` downloads the actual MongoDB binary, keeps the data in a temporary folder, and deletes everything when the tests finish.

The container is the same MongoDB you use while developing, with the same password, so the tests also catch connection and login problems. It's faster too, since it's already running. Memory mode starts a new MongoDB for every test file, which adds a second or two each time. In exchange it needs no Podman and nothing running in the background.

We suggest using the container day to day, and memory mode wherever containers aren't available.

</details>

<details>
<summary>Troubleshooting</summary>

**"Could not reach MongoDB."** The tests are in the default mode, but MongoDB isn't running. Run `bun run db:up`, or use `bun run test:memory` instead.

**Memory mode times out or fails to download.** The first run needs an internet connection to download MongoDB, and it can be slow. Run it again once the download finishes. If it keeps failing, check that your network allows downloads from `fastdl.mongodb.org`.

**Memory mode fails on an older computer.** Like the container, it needs a processor with AVX support. See the troubleshooting section in step 2.

</details>
