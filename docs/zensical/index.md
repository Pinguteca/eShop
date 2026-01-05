---
icon: lucide/rocket
tags:
  - .NET
  - GitHub
---

# Introduction

This site contains documentation for the eShop example application. It complements the project README by focusing on developer workflows, repository layout, and handy commands to get started locally.

<div class="hero">
	<h1>eShop — Developer documentation</h1>
	<p>Quickly find the information you need to run, test and extend the sample microservices.</p>
</div>

<div class="card-grid">
	<div class="card">
		<h3>Development</h3>
		<p><a href="development">Setup, build, and run</a></p>
	</div>
	<div class="card">
		<h3>Architecture</h3>
		<p><a href="architecture">System overview & diagrams</a></p>
	</div>
</div>

## Quick links

- [Development setup](development.md) — getting the repo running locally
- [Architecture](architecture.md) — high-level overview of folders and services

## Overview

eShop is a sample microservices-style application used as a reference for building cloud-native .NET applications. The repository contains multiple services and supporting projects under the `src/` folder and tests in `tests/`.

Use this documentation to:

- Quickly onboard a new contributor
- Find development commands and tips
- Understand the repository structure and where to make changes

## Quick start

Prerequisites: `dotnet` SDK (version in `global.json`), Node.js (for ClientApp), and Docker if you run services in containers.

Clone and build:

```bash
git clone https://github.com/Pinguteca/eShop.git
cd eShop
dotnet restore
dotnet build
```

Run a single API locally (example):

```bash
cd src/Identity.API
dotnet run
```

Run tests:

```bash
dotnet test ./tests/Ordering.UnitTests
```

## Contributing

Please see the repository `CONTRIBUTING.md` and `CODE-OF-CONDUCT.md` at the project root for contribution guidelines.

If you're adding or changing a workflow, see `.github/workflows` and remember to avoid committing secrets in workflow files.

---
