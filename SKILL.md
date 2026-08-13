---
name: atlas
status: implemented
description: >-
  Recursive package.json scanner for one directory tree: builds a same-workspace
  dependency graph from declared dependency names, and does reverse-DFS to find
  a package's dependents. Use for "what depends on this package" within one
  already-cloned workspace. Never rebuild the graph expecting trellis output --
  this builds its own; never use across repos you haven't already cloned --
  there is no multi-repo or git-remote awareness.
---

# Atlas

**Single-workspace package dependency mapper.** Recursively finds every `package.json` under one root, builds a graph from declared dependency names that match other packages in the scan, and answers "what depends on X" via reverse DFS. Real, working code for a monorepo you already have checked out locally.

## What it actually does
- `findWorkspacePackages(rootDir)` walks the tree (skipping `node_modules`/dot-dirs), reads every
  `package.json`, records `{ name, path, dependencies }`.
- `buildDependencyGraph(packages)` builds an adjacency list from name matches against
  `dependencies`/`devDependencies` within the same scan.
- `findDependents(targetName, graph)` reverse-DFS to find every package that depends on it,
  directly or transitively.

## What it does not do (despite "multi-repository orchestrator")
- **No cross-repo support.** Repos not already cloned into the scanned tree are invisible — no
  git-remote awareness, no fetching.
- **No `trellis` consumption.** Builds its own graph from `package.json` names; doesn't read
  `.ast-cache.json` or any `trellis` output.
- **No symbol/import tracking.** Package-name-to-package-name only, from manifest declarations.
- **Only `package.json` is parsed** — `go.mod`/`Cargo.toml` are not, despite earlier docs.

## Usage (library, not a CLI)

```js
import { findWorkspacePackages, buildDependencyGraph, findDependents } from './lib/atlas.js';

const packages = findWorkspacePackages('/path/to/workspace/root');
const graph = buildDependencyGraph(packages);
const dependents = findDependents('@myorg/shared-auth', graph);
```

## When to use

- One workspace/monorepo checked out locally, and you want to know which packages depend on a
  given package, based on `package.json` declarations.

## When NOT to use

- **Repos not all cloned into one tree** — nothing fetches or resolves separate repos.
- **Symbol- or import-level impact analysis** → use `trellis` on the specific repo.
