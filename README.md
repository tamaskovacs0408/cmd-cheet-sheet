# Command Cheat Sheet

A single-page application for quickly looking up CLI commands across multiple tools. Built with React 19, TypeScript, and Vite 8.

## Categories

| Category       | Commands | Description                                               |
| -------------- | -------- | --------------------------------------------------------- |
| **Git**        | 48       | Branching, merging, rebasing, stashing, remotes, and more |
| **Bash**       | 53       | Navigation, file ops, text processing, searching, piping  |
| **cURL**       | 56       | HTTP methods, authentication, headers, body formats, SSL  |
| **Linux**      | 55       | System admin, networking, services, SSH, firewall, cron   |
| **PowerShell** | 50       | Cmdlets, pipeline, scripting, modules, services           |
| **Docker**     | 50       | Containers, images, Compose, Dockerfiles, databases       |

**312 commands total**

## Features

- Search and filter commands within each category
- Copy command syntax to clipboard with one click
- Dark / light theme toggle
- Responsive layout (mobile, tablet, desktop)
- Lazy-loaded routes for fast initial load

## Tech Stack

- **React 19** with React Router 7
- **TypeScript 5.7**
- **Vite 8** (build) with `@vitejs/plugin-react` 6
- **SCSS** with BEM naming convention
- **Vitest 3** + Testing Library for unit tests
- **ESLint 9** (flat config)
- **Yarn 4** (Berry, node-modules linker)

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `yarn dev`        | Start Vite dev server                |
| `yarn build`      | Type-check and build for production  |
| `yarn preview`    | Preview the production build locally |
| `yarn test`       | Run tests once                       |
| `yarn test:watch` | Run tests in watch mode              |
| `yarn lint`       | Lint source files with ESLint        |

## Project Structure

```
src/
├── components/       # Reusable UI components (CommandCard, CategoryCard, etc.)
├── context/          # React context (ThemeContext)
├── data/             # Command data files and types
│   ├── git.commands.ts
│   ├── bash.commands.ts
│   ├── curl.commands.ts
│   ├── linux.commands.ts
│   ├── powershell.commands.ts
│   ├── docker.commands.ts
│   ├── types.ts
│   └── index.ts
├── hooks/            # Custom hooks (useSearch, useTheme, useCopyToClipboard, useDebounce)
├── pages/            # Route pages (HomePage, CategoryPage)
├── router/           # React Router configuration with lazy loading
├── styles/           # Global styles, variables, mixins
└── test/             # Test setup
```

## License

MIT
