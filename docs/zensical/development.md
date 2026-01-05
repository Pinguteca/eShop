---
title: Development
icon: lucide/git-commit-vertical
tags:
  - .NET
  - Node.js
  - Docker
robots: noindex, nofollow
---

This page documents common developer workflows and useful commands to work on eShop.

## Prerequisites

- .NET SDK — the project pins a supported SDK in `global.json`.
- Node.js/npm — required for `ClientApp` and frontend tooling.
- Docker (optional) — useful when running multiple services locally.

## Common commands

From the repository root:

- Restore dependencies and build all projects:

```bash
dotnet restore
dotnet build
```

- Run a single project (example):

```bash
cd src/Identity.API
dotnet run
```

- Run unit tests:

```bash
dotnet test
```

- Run frontend dev server (if working on ClientApp):

```bash
cd src/ClientApp
npm install
npm run dev
```

## Working with Docker

Some developers prefer to run dependent services in containers. A `docker-compose` file may be present in individual service folders or in tooling directories — search the repo for the compose files you need.

## Branching and PRs

- Follow the contribution guidelines in `CONTRIBUTING.md`.
- Use descriptive branch names and open PRs against `main` (or the repository's default branch).

## Troubleshooting

- If SDK versions mismatch, ensure your local SDK matches `global.json` or use `dotnet-install` to add the required version.
- For CI-related failures, check logs in `.github/workflows` to mirror the CI steps locally.