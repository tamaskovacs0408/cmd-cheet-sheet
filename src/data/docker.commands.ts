import type { Command } from "./types";

export const dockerCommands: Command[] = [
  // ── Core Container Lifecycle ──────────────────────────────────────────

  {
    id: "docker-run",
    syntax: "docker run -d --name <name> -p <host>:<container> <image>",
    label: "Run a container",
    description:
      "Creates and starts a new container from an image. The `-d` flag runs it detached (in the background). `-p 3000:3000` maps port 3000 on your machine to port 3000 in the container — this is how you access your frontend dev server, API, or database from the host. `--name` gives the container a human-readable name instead of a random one. Without `-d`, the container runs in the foreground and you see its logs directly. You can combine multiple `-p` flags for multiple port mappings.",
    keywords: [
      "run",
      "start",
      "container",
      "create",
      "port",
      "detach",
      "background",
    ],
    category: "docker",
  },
  {
    id: "docker-run-interactive",
    syntax: "docker run -it --rm <image> /bin/sh",
    label: "Run a temporary interactive container",
    description:
      "Starts a container with an interactive terminal attached. `-i` keeps stdin open, `-t` allocates a pseudo-TTY, and `--rm` automatically removes the container when you exit. This is perfect for quickly testing a base image, debugging build issues, or running one-off commands. Use `/bin/sh` for Alpine-based images or `/bin/bash` for Debian/Ubuntu-based ones.",
    keywords: ["interactive", "terminal", "shell", "temporary", "rm", "debug"],
    category: "docker",
  },
  {
    id: "docker-run-env",
    syntax: "docker run -d --env-file .env -p 3000:3000 <image>",
    label: "Run a container with environment variables",
    description:
      "Passes environment variables from a `.env` file into the container. This is how you inject API keys, database URLs, feature flags, and other config without baking them into the image. You can also use `-e KEY=value` for individual variables. In frontend projects, this is critical for separating build-time env vars (baked into the bundle) from runtime config (injected at container start).",
    keywords: [
      "env",
      "environment",
      "variables",
      "config",
      "env-file",
      "secrets",
    ],
    category: "docker",
  },
  {
    id: "docker-run-volume",
    syntax: "docker run -d -v $(pwd)/src:/app/src -p 3000:3000 <image>",
    label: "Run a container with a bind mount",
    description:
      "Mounts a host directory into the container using `-v host:container`. This is the foundation of Docker-based development workflows — your source code on the host is live-synced into the container, so changes trigger hot reload just like local development. For a Next.js or Vite project, you'd mount the `src/` folder so edits appear instantly. Use `:ro` suffix for read-only mounts when the container shouldn't modify your files.",
    keywords: ["volume", "mount", "bind", "sync", "development", "hot reload"],
    category: "docker",
  },
  {
    id: "docker-ps",
    syntax: "docker ps",
    label: "List running containers",
    description:
      "Shows all currently running containers with their ID, image, command, creation time, status, ports, and name. This is usually the first command you run to check what's up. Add `-a` to include stopped containers too. The PORTS column shows you exactly which host ports are mapped — essential for knowing where your app is accessible.",
    keywords: ["ps", "list", "running", "containers", "status"],
    category: "docker",
  },
  {
    id: "docker-ps-all",
    syntax: "docker ps -a",
    label: "List all containers (including stopped)",
    description:
      "Shows every container, running or stopped. Stopped containers still exist on disk and consume space. Check this when `docker run` fails silently — the container might have started and immediately crashed. The STATUS column shows the exit code which helps diagnose the issue.",
    keywords: ["ps", "all", "stopped", "exited", "containers", "list"],
    category: "docker",
  },
  {
    id: "docker-stop",
    syntax: "docker stop <container>",
    label: "Stop a running container",
    description:
      "Sends SIGTERM to the main process in the container, giving it 10 seconds to shut down gracefully. If the process doesn't stop in time, Docker sends SIGKILL. Use `docker stop $(docker ps -q)` to stop ALL running containers at once — handy when you have a multi-container setup and want to tear everything down.",
    keywords: ["stop", "halt", "shutdown", "container", "graceful"],
    category: "docker",
  },
  {
    id: "docker-start",
    syntax: "docker start <container>",
    label: "Start a stopped container",
    description:
      "Restarts a previously stopped container with its original configuration (ports, volumes, env vars). The container retains any filesystem changes made during its last run. This is different from `docker run` — start doesn't create a new container, it resumes an existing one.",
    keywords: ["start", "resume", "restart", "container"],
    category: "docker",
  },
  {
    id: "docker-restart",
    syntax: "docker restart <container>",
    label: "Restart a container",
    description:
      "Stops and then starts a container. Equivalent to `docker stop` followed by `docker start`. Useful after config changes or when a service is in a bad state. Add `--time 5` to change the grace period before force-killing.",
    keywords: ["restart", "reboot", "container", "reload"],
    category: "docker",
  },
  {
    id: "docker-rm",
    syntax: "docker rm <container>",
    label: "Remove a stopped container",
    description:
      "Deletes a stopped container and its writable layer. The container must be stopped first, or use `-f` to force-remove a running one. Run `docker rm $(docker ps -aq)` to remove ALL stopped containers. Containers you don't remove accumulate and waste disk space over time.",
    keywords: ["rm", "remove", "delete", "container", "cleanup"],
    category: "docker",
  },
  {
    id: "docker-exec",
    syntax: "docker exec -it <container> /bin/sh",
    label: "Open a shell inside a running container",
    description:
      "Attaches an interactive terminal to a running container. This is your primary debugging tool — you can inspect files, check environment variables, test network connectivity, and run commands inside the container's filesystem. For Node.js containers, you might run `node -e 'console.log(process.env)'` to verify environment variables are set correctly.",
    keywords: ["exec", "shell", "interactive", "debug", "terminal", "inside"],
    category: "docker",
  },
  {
    id: "docker-logs",
    syntax: "docker logs -f <container>",
    label: "Stream container logs",
    description:
      "Shows stdout and stderr from the container's main process. The `-f` flag follows the log output in real-time, like `tail -f`. Add `--tail 100` to show only the last 100 lines. Add `--timestamps` to see when each line was logged. This is where you'll see your server startup messages, request logs, errors, and anything your app writes to the console.",
    keywords: [
      "logs",
      "output",
      "follow",
      "stream",
      "debug",
      "stdout",
      "stderr",
    ],
    category: "docker",
  },
  {
    id: "docker-inspect",
    syntax: "docker inspect <container>",
    label: "Show detailed container information",
    description:
      "Returns a comprehensive JSON object with every detail about a container: network settings, mounted volumes, environment variables, health status, restart policy, and more. Use `docker inspect -f '{{.NetworkSettings.IPAddress}}' <container>` with Go templates to extract specific values. Essential for debugging networking and configuration issues.",
    keywords: [
      "inspect",
      "details",
      "info",
      "json",
      "configuration",
      "network",
    ],
    category: "docker",
  },

  // ── Image Management ──────────────────────────────────────────────────

  {
    id: "docker-images",
    syntax: "docker images",
    label: "List local images",
    description:
      "Shows all Docker images stored locally with their repository, tag, ID, creation date, and size. Images can be surprisingly large — a Node.js image based on Debian can be 900MB+, while Alpine-based ones are typically under 200MB. Use this to audit what's consuming disk space.",
    keywords: ["images", "list", "local", "size", "repository", "tag"],
    category: "docker",
  },
  {
    id: "docker-pull",
    syntax: "docker pull <image>:<tag>",
    label: "Download an image from a registry",
    description:
      "Downloads an image from Docker Hub (or another registry) to your local machine. If you don't specify a tag, `:latest` is used. For production, always pin a specific version tag like `node:22-alpine` instead of `node:latest` — this prevents unexpected breaking changes when the latest tag moves forward.",
    keywords: ["pull", "download", "image", "registry", "hub", "fetch"],
    category: "docker",
  },
  {
    id: "docker-rmi",
    syntax: "docker rmi <image>",
    label: "Remove a local image",
    description:
      "Deletes an image from local storage. The image can't be in use by any container (even stopped ones). Use `docker rmi $(docker images -q --filter 'dangling=true')` to remove all dangling (untagged) images that accumulate from rebuilds. These dangling images are a common source of disk space bloat.",
    keywords: ["rmi", "remove", "delete", "image", "cleanup"],
    category: "docker",
  },
  {
    id: "docker-tag",
    syntax: "docker tag <image> <registry>/<repo>:<tag>",
    label: "Tag an image for a registry",
    description:
      "Creates a new tag pointing to an existing image. This is how you prepare an image for pushing to a private registry or Docker Hub. For example: `docker tag my-app:latest ghcr.io/myuser/my-app:v1.2.0`. The same image can have multiple tags — they share the same layers and don't consume extra disk space.",
    keywords: ["tag", "label", "version", "registry", "rename"],
    category: "docker",
  },
  {
    id: "docker-push",
    syntax: "docker push <registry>/<repo>:<tag>",
    label: "Push an image to a registry",
    description:
      "Uploads a tagged image to a remote registry (Docker Hub, GitHub Container Registry, AWS ECR, etc.). You need to `docker login` first. Only the layers that don't already exist on the registry are uploaded, making subsequent pushes much faster. This is what your CI/CD pipeline does after building the production image.",
    keywords: ["push", "upload", "registry", "deploy", "publish"],
    category: "docker",
  },

  // ── Building Images ───────────────────────────────────────────────────

  {
    id: "docker-build",
    syntax: "docker build -t <name>:<tag> .",
    label: "Build an image from a Dockerfile",
    description:
      "Reads the Dockerfile in the current directory (`.`) and builds an image layer by layer. `-t` assigns a name and tag. Each instruction in the Dockerfile creates a cached layer — if a layer hasn't changed, Docker skips rebuilding it. This is why instruction order matters: put rarely-changing steps (like `npm install`) before frequently-changing ones (like `COPY . .`).",
    keywords: [
      "build",
      "dockerfile",
      "image",
      "create",
      "tag",
      "layers",
      "cache",
    ],
    category: "docker",
  },
  {
    id: "docker-build-no-cache",
    syntax: "docker build --no-cache -t <name>:<tag> .",
    label: "Build without using cache",
    description:
      "Forces Docker to rebuild every layer from scratch, ignoring cached layers. Use this when you suspect stale dependencies (e.g., `npm install` used a cached layer with old `package-lock.json` content), or when debugging build issues. Significantly slower than cached builds but guarantees a clean state.",
    keywords: ["build", "no-cache", "fresh", "clean", "rebuild"],
    category: "docker",
  },
  {
    id: "docker-build-target",
    syntax: "docker build --target <stage> -t <name>:<tag> .",
    label: "Build a specific stage from a multi-stage Dockerfile",
    description:
      "In a multi-stage Dockerfile, `--target` stops the build at a named stage. This lets you use the same Dockerfile for different purposes: `--target dev` for development (with devDependencies), `--target prod` for production (optimized, minimal). Multi-stage builds are essential for keeping production images small while having a rich development experience.",
    keywords: [
      "build",
      "target",
      "stage",
      "multi-stage",
      "development",
      "production",
    ],
    category: "docker",
  },

  // ── Dockerfile Patterns (Frontend Focus) ──────────────────────────────

  {
    id: "docker-dockerfile-node-alpine",
    syntax:
      'FROM node:22-alpine AS base\nWORKDIR /app\nCOPY package.json yarn.lock ./\nRUN yarn install --frozen-lockfile\nCOPY . .\nEXPOSE 3000\nCMD ["yarn", "dev", "--host"]',
    label: "Dockerfile — Node.js dev setup (Alpine)",
    description:
      "A typical development Dockerfile for a frontend project. `node:22-alpine` gives you a minimal ~180MB base image vs ~900MB for the full Debian variant. `WORKDIR /app` sets the working directory for all subsequent instructions. Copying `package.json` and lockfile first, then running `yarn install`, means Docker caches the dependency layer — you only re-install when dependencies actually change. `--frozen-lockfile` ensures reproducible installs. `--host` in the dev command binds to `0.0.0.0` so the server is accessible from outside the container.",
    keywords: [
      "dockerfile",
      "node",
      "alpine",
      "frontend",
      "dev",
      "setup",
      "workdir",
      "copy",
    ],
    category: "docker",
  },
  {
    id: "docker-dockerfile-multistage",
    syntax:
      'FROM node:22-alpine AS build\nWORKDIR /app\nCOPY package.json yarn.lock ./\nRUN yarn install --frozen-lockfile\nCOPY . .\nRUN yarn build\n\nFROM nginx:alpine AS production\nCOPY --from=build /app/dist /usr/share/nginx/html\nCOPY nginx.conf /etc/nginx/conf.d/default.conf\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]',
    label: "Dockerfile — Multi-stage production build",
    description:
      "The standard pattern for production frontend containers. Stage 1 (`build`) installs dependencies and runs the build — this stage has Node.js, all devDependencies, and the full source. Stage 2 (`production`) copies only the static output (`dist/`) into an nginx image. The final image is ~25MB instead of ~500MB+ because it contains only nginx and your built files — no Node.js, no node_modules. The `COPY --from=build` instruction is the key: it pulls files from the previous stage without carrying over any of its layers.",
    keywords: [
      "dockerfile",
      "multi-stage",
      "production",
      "nginx",
      "build",
      "optimize",
      "frontend",
    ],
    category: "docker",
  },
  {
    id: "docker-dockerfile-nextjs",
    syntax:
      'FROM node:22-alpine AS deps\nWORKDIR /app\nCOPY package.json yarn.lock ./\nRUN yarn install --frozen-lockfile\n\nFROM node:22-alpine AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN yarn build\n\nFROM node:22-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\nCOPY --from=builder /app/public ./public\nEXPOSE 3000\nCMD ["node", "server.js"]',
    label: "Dockerfile — Next.js standalone production",
    description:
      "Three-stage build optimized for Next.js with `output: 'standalone'` in `next.config.js`. The `deps` stage caches dependency installation. The `builder` stage compiles the app. The `runner` stage contains only the standalone server output — a self-contained Node.js server with all dependencies bundled. The final image is dramatically smaller than copying the full `node_modules`. This pattern is officially recommended by Vercel for Docker deployments.",
    keywords: [
      "dockerfile",
      "nextjs",
      "standalone",
      "production",
      "ssr",
      "vercel",
      "react",
    ],
    category: "docker",
  },
  {
    id: "docker-dockerignore",
    syntax:
      "node_modules\ndist\n.next\n.git\n*.md\n.env*\n.vscode\ncoverage\n.turbo",
    label: ".dockerignore — Essential excludes",
    description:
      "The `.dockerignore` file works like `.gitignore` but for Docker build context. Without it, `docker build` sends your entire project directory to the Docker daemon — including `node_modules` (which can be hundreds of MB), `.git`, build artifacts, and secrets. This slows down builds massively and can leak `.env` files into the image. Always exclude `node_modules` because the Dockerfile installs its own clean copy. Exclude `.env*` to prevent secrets from ending up in image layers.",
    keywords: [
      "dockerignore",
      "ignore",
      "exclude",
      "context",
      "build",
      "security",
      "env",
    ],
    category: "docker",
  },

  // ── Docker Compose ────────────────────────────────────────────────────

  {
    id: "docker-compose-up",
    syntax: "docker compose up -d",
    label: "Start all services in the background",
    description:
      "Reads `docker-compose.yml` (or `compose.yml`) and starts all defined services. `-d` runs them detached. On the first run, it builds images if needed and creates networks and volumes. This is the one command to spin up your entire local development environment — frontend, backend, database, cache — in seconds. Without `-d`, logs from all services are interleaved in your terminal.",
    keywords: ["compose", "up", "start", "services", "detach", "background"],
    category: "docker",
  },
  {
    id: "docker-compose-up-build",
    syntax: "docker compose up -d --build",
    label: "Start services and rebuild images",
    description:
      "Same as `up -d` but forces a rebuild of any service that uses a `build` context (Dockerfile). Use this after changing Dockerfile, package.json, or any file that affects the image but not the source code mounted via volumes. Without `--build`, Compose reuses the existing image even if the Dockerfile has changed.",
    keywords: ["compose", "up", "build", "rebuild", "force", "update"],
    category: "docker",
  },
  {
    id: "docker-compose-down",
    syntax: "docker compose down",
    label: "Stop and remove all services",
    description:
      "Stops all containers, removes them, and removes the default network. Your named volumes are preserved by default, so database data survives. Add `-v` to also remove volumes (destructive — your DB data is gone). Add `--rmi all` to also remove the images built by Compose. This is the clean counterpart to `docker compose up`.",
    keywords: ["compose", "down", "stop", "remove", "cleanup", "teardown"],
    category: "docker",
  },
  {
    id: "docker-compose-down-volumes",
    syntax: "docker compose down -v",
    label: "Stop services and remove volumes",
    description:
      "Tears down everything including named volumes. This is the nuclear option — your database data, Redis cache, and any other persisted state is wiped. Use this when you need to start completely fresh, like resetting a corrupted database or clearing stale cache data. Always think twice before using `-v`.",
    keywords: [
      "compose",
      "down",
      "volumes",
      "wipe",
      "reset",
      "cleanup",
      "destructive",
    ],
    category: "docker",
  },
  {
    id: "docker-compose-logs",
    syntax: "docker compose logs -f <service>",
    label: "Follow logs from a specific service",
    description:
      "Streams logs from a named service in your compose file. Without a service name, it shows logs from ALL services (interleaved, color-coded). The `-f` flag follows in real time. Add `--tail 50` to start from the last 50 lines instead of dumping the full history. Extremely useful when debugging startup failures — if a container keeps restarting, the logs tell you why.",
    keywords: ["compose", "logs", "follow", "service", "debug", "stream"],
    category: "docker",
  },
  {
    id: "docker-compose-ps",
    syntax: "docker compose ps",
    label: "List running compose services",
    description:
      "Shows the status of all services defined in the compose file. Includes state (running, exited), ports, and the command being executed. Quickly shows you whether all services started successfully or if any crashed.",
    keywords: ["compose", "ps", "status", "services", "list"],
    category: "docker",
  },
  {
    id: "docker-compose-exec",
    syntax: "docker compose exec <service> /bin/sh",
    label: "Open a shell in a running compose service",
    description:
      "Like `docker exec` but you reference the service name from your compose file instead of the container ID. Use this to run migrations, seed databases, debug running services, or check environment variables. For a Node.js service: `docker compose exec app node -e 'console.log(process.env.DATABASE_URL)'`.",
    keywords: ["compose", "exec", "shell", "service", "debug", "interactive"],
    category: "docker",
  },

  // ── Compose Config — Frontend Dev Stack ───────────────────────────────

  {
    id: "docker-compose-frontend-dev",
    syntax:
      'services:\n  app:\n    build:\n      context: .\n      target: dev\n    ports:\n      - "3000:3000"\n    volumes:\n      - .:/app\n      - /app/node_modules\n    environment:\n      - NODE_ENV=development',
    label: "compose.yml — Frontend dev with hot reload",
    description:
      "A compose service definition optimized for frontend development. The bind mount (`.:/app`) syncs your entire project into the container, enabling hot module replacement (HMR). The anonymous volume `/app/node_modules` is critical — it prevents the host's `node_modules` from overwriting the container's copy, which may have been installed for a different OS (Linux in container vs Windows/macOS on host). This pattern gives you the same DX as local development but inside a container.",
    keywords: [
      "compose",
      "frontend",
      "dev",
      "hot reload",
      "hmr",
      "volumes",
      "development",
    ],
    category: "docker",
  },
  {
    id: "docker-compose-nginx-spa",
    syntax:
      'services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n    volumes:\n      - ./dist:/usr/share/nginx/html:ro\n      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro',
    label: "compose.yml — Serve SPA with nginx",
    description:
      "Serves a pre-built SPA (Vite, CRA, etc.) from an nginx container. The `dist/` folder is mounted read-only (`:ro`). A custom `nginx.conf` is needed to handle client-side routing — without it, refreshing on `/about` returns 404. The config should include `try_files $uri $uri/ /index.html;` to redirect all routes to the SPA entry point. This is the simplest way to preview a production build locally.",
    keywords: [
      "compose",
      "nginx",
      "spa",
      "serve",
      "static",
      "production",
      "routing",
    ],
    category: "docker",
  },
  {
    id: "docker-compose-fullstack",
    syntax:
      'services:\n  frontend:\n    build: ./frontend\n    ports:\n      - "3000:3000"\n    depends_on:\n      - api\n  api:\n    build: ./backend\n    ports:\n      - "4000:4000"\n    depends_on:\n      db:\n        condition: service_healthy\n    environment:\n      - DATABASE_URL=postgres://user:pass@db:5432/mydb\n  db:\n    image: postgres:16-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=pass\n      - POSTGRES_DB=mydb\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U user"]\n      interval: 5s\n      timeout: 3s\n      retries: 5\nvolumes:\n  pgdata:',
    label: "compose.yml — Full-stack with DB (frontend + API + Postgres)",
    description:
      "A complete three-tier compose file. `depends_on` with `condition: service_healthy` ensures the API doesn't start until Postgres is actually ready to accept connections (not just the container running). The `healthcheck` uses `pg_isready` to verify the database is up. Services communicate via service names as hostnames — `db` resolves to the Postgres container's IP within the Docker network. The named volume `pgdata` persists database data across `docker compose down` (but not `down -v`).",
    keywords: [
      "compose",
      "fullstack",
      "postgres",
      "api",
      "frontend",
      "depends_on",
      "healthcheck",
    ],
    category: "docker",
  },

  // ── Database Containers ───────────────────────────────────────────────

  {
    id: "docker-postgres",
    syntax:
      "docker run -d --name postgres \\\n  -e POSTGRES_USER=admin \\\n  -e POSTGRES_PASSWORD=secret \\\n  -e POSTGRES_DB=myapp \\\n  -p 5432:5432 \\\n  -v pgdata:/var/lib/postgresql/data \\\n  postgres:16-alpine",
    label: "Run PostgreSQL",
    description:
      "Starts a PostgreSQL 16 container with a pre-created database and user. The env vars configure the initial superuser and database. The named volume `pgdata` persists data outside the container — without it, your data is lost when the container is removed. Port 5432 is exposed so your local tools (pgAdmin, DBeaver, Prisma Studio) can connect. Use the connection string: `postgres://admin:secret@localhost:5432/myapp`.",
    keywords: [
      "postgres",
      "postgresql",
      "database",
      "sql",
      "run",
      "volume",
      "persist",
    ],
    category: "docker",
  },
  {
    id: "docker-postgres-psql",
    syntax: "docker exec -it postgres psql -U admin -d myapp",
    label: "Connect to PostgreSQL with psql",
    description:
      "Opens the `psql` interactive terminal inside the running Postgres container. From here you can run SQL queries, inspect tables (`\\dt`), describe a table (`\\d tablename`), list databases (`\\l`), and switch databases (`\\c dbname`). Use `\\q` to quit. This is the quickest way to check if your migrations ran correctly or to inspect data without installing psql locally.",
    keywords: ["postgres", "psql", "connect", "sql", "terminal", "query"],
    category: "docker",
  },
  {
    id: "docker-mysql",
    syntax:
      "docker run -d --name mysql \\\n  -e MYSQL_ROOT_PASSWORD=secret \\\n  -e MYSQL_DATABASE=myapp \\\n  -e MYSQL_USER=admin \\\n  -e MYSQL_PASSWORD=secret \\\n  -p 3306:3306 \\\n  -v mysqldata:/var/lib/mysql \\\n  mysql:8",
    label: "Run MySQL",
    description:
      "Starts MySQL 8 with a pre-configured database and user. `MYSQL_ROOT_PASSWORD` is required — it sets the root account password. The additional `MYSQL_USER` and `MYSQL_PASSWORD` create a non-root user with full privileges on `MYSQL_DATABASE`. Named volume persists data. Connection string for your app: `mysql://admin:secret@localhost:3306/myapp`.",
    keywords: ["mysql", "database", "sql", "run", "volume", "persist"],
    category: "docker",
  },
  {
    id: "docker-mongo",
    syntax:
      "docker run -d --name mongo \\\n  -e MONGO_INITDB_ROOT_USERNAME=admin \\\n  -e MONGO_INITDB_ROOT_PASSWORD=secret \\\n  -p 27017:27017 \\\n  -v mongodata:/data/db \\\n  mongo:7",
    label: "Run MongoDB",
    description:
      "Starts MongoDB 7 with authentication enabled. The env vars create the initial admin user. Data is persisted via the named volume. Connection string: `mongodb://admin:secret@localhost:27017`. For frontend projects using MongoDB (e.g., with Mongoose or Prisma), this is all you need to get a local database running in seconds.",
    keywords: ["mongo", "mongodb", "nosql", "database", "run", "volume"],
    category: "docker",
  },
  {
    id: "docker-redis",
    syntax:
      "docker run -d --name redis \\\n  -p 6379:6379 \\\n  redis:7-alpine",
    label: "Run Redis",
    description:
      "Starts a Redis 7 in-memory data store. Redis is commonly used for caching, session storage, rate limiting, and pub/sub in web applications. The Alpine variant is only ~30MB. No authentication by default — for production, add `--requirepass <password>`. Connect from your app using `redis://localhost:6379`.",
    keywords: ["redis", "cache", "session", "run", "memory", "store"],
    category: "docker",
  },

  // ── Volumes & Networks ────────────────────────────────────────────────

  {
    id: "docker-volume-ls",
    syntax: "docker volume ls",
    label: "List all volumes",
    description:
      "Shows all Docker volumes on your system. Named volumes (created via compose or `docker volume create`) and anonymous volumes (created by `-v` without a name) both appear here. Volumes persist data independently of containers — they survive container removal and can be attached to new containers.",
    keywords: ["volume", "list", "storage", "data", "persist"],
    category: "docker",
  },
  {
    id: "docker-volume-prune",
    syntax: "docker volume prune",
    label: "Remove unused volumes",
    description:
      "Deletes all volumes not currently attached to any container. This is destructive — orphaned database volumes with real data will be removed. Docker will ask for confirmation. Use this periodically to reclaim disk space, but be careful if you have stopped containers whose data you want to keep.",
    keywords: ["volume", "prune", "cleanup", "remove", "unused", "disk"],
    category: "docker",
  },
  {
    id: "docker-network-ls",
    syntax: "docker network ls",
    label: "List Docker networks",
    description:
      "Shows all networks. Docker Compose creates a network per project automatically (e.g., `myproject_default`), and all services in that compose file can reach each other by service name. The default `bridge` network doesn't support service discovery — use custom networks or compose for inter-container communication.",
    keywords: [
      "network",
      "list",
      "bridge",
      "compose",
      "dns",
      "service discovery",
    ],
    category: "docker",
  },

  // ── Cleanup ───────────────────────────────────────────────────────────

  {
    id: "docker-system-prune",
    syntax: "docker system prune -a",
    label: "Remove all unused Docker data",
    description:
      "The nuclear cleanup command. Removes all stopped containers, unused networks, dangling AND unused images, and build cache. The `-a` flag removes images not referenced by any container (not just dangling ones). This can reclaim gigabytes of disk space. Add `--volumes` to also remove unused volumes. Docker will show you exactly what will be removed and ask for confirmation.",
    keywords: ["prune", "cleanup", "disk", "space", "remove", "all", "system"],
    category: "docker",
  },
  {
    id: "docker-system-df",
    syntax: "docker system df",
    label: "Show Docker disk usage",
    description:
      "Displays a summary of how much disk space Docker is using — broken down by images, containers, volumes, and build cache. Add `-v` for a detailed view showing every individual item. Check this before and after a prune to see how much space you reclaimed. It's common for Docker to consume 10–50GB on a developer machine.",
    keywords: ["disk", "usage", "space", "size", "storage", "system"],
    category: "docker",
  },
  {
    id: "docker-image-prune",
    syntax: "docker image prune -a",
    label: "Remove all unused images",
    description:
      "Deletes images not used by any existing container. Without `-a`, only dangling images (untagged layers from intermediate builds) are removed. With `-a`, all unreferenced images go — including base images you pulled but aren't actively using. This is the single most effective command for reclaiming disk space.",
    keywords: ["image", "prune", "cleanup", "dangling", "unused", "disk"],
    category: "docker",
  },

  // ── Advanced Patterns ─────────────────────────────────────────────────

  {
    id: "docker-compose-profiles",
    syntax:
      'services:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:16-alpine\n    profiles:\n      - with-db\n  redis:\n    image: redis:7-alpine\n    profiles:\n      - with-cache',
    label: "compose.yml — Service profiles",
    description:
      "Profiles let you optionally include services. Running `docker compose up` starts only `app` (no profile). Running `docker compose --profile with-db up` starts `app` + `db`. Use `--profile with-db --profile with-cache` for both. This is perfect when some developers need the full stack locally while others connect to shared dev services. Keeps the default `up` fast and lightweight.",
    keywords: [
      "compose",
      "profiles",
      "optional",
      "services",
      "conditional",
      "selective",
    ],
    category: "docker",
  },
  {
    id: "docker-compose-override",
    syntax:
      "# docker-compose.override.yml\nservices:\n  app:\n    volumes:\n      - .:/app\n      - /app/node_modules\n    environment:\n      - DEBUG=true\n    command: yarn dev --host",
    label: "compose.override.yml — Dev overrides",
    description:
      "Docker Compose automatically merges `docker-compose.yml` with `docker-compose.override.yml` if it exists. Use the base file for shared config and the override for local development tweaks: mounting source code, enabling debug mode, changing the startup command. The override file is typically git-ignored so each developer can customize their setup without affecting the team.",
    keywords: [
      "compose",
      "override",
      "development",
      "local",
      "customize",
      "merge",
    ],
    category: "docker",
  },
  {
    id: "docker-cp",
    syntax: "docker cp <container>:/path/to/file ./local-path",
    label: "Copy files between container and host",
    description:
      "Copies files or directories between a container and the host filesystem. Works in both directions — host to container or container to host. Useful for extracting log files, build artifacts, or database dumps from a container without mounting a volume.",
    keywords: ["cp", "copy", "file", "extract", "transfer", "host"],
    category: "docker",
  },
  {
    id: "docker-stats",
    syntax: "docker stats",
    label: "Monitor container resource usage",
    description:
      "Shows a live stream of CPU%, memory usage/limit, network I/O, and block I/O for all running containers. Like `top` but for containers. Add a container name to monitor a specific one. Essential for identifying memory leaks or CPU-heavy containers that are slowing your machine down.",
    keywords: ["stats", "monitor", "cpu", "memory", "resources", "performance"],
    category: "docker",
  },
];
