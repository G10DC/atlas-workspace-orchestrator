# atlas

Multi-repository and monorepo workspace dependency orchestrator. Atlas scans workspaces recursively to discover packages, mapping direct and indirect dependency trees to trace the reach of API modifications and breaking changes.

## Features
- **Monorepo / Multi-repo Scanning**: Discovers package root folders by scanning recursively for `package.json` configurations (skips `node_modules` and hidden files).
- **Dependency Graph Construction**: Maps topological relations between workspace-managed packages.
- **Breaking-Change Impact Analyzer**: Traces which local packages depend directly or transitively on a target library, pointing out exactly which modules need updates when a library API changes.

## Installation

```bash
npm install
```

## Usage

```javascript
import { findWorkspacePackages, buildDependencyGraph, findDependents } from './lib/atlas.js';

// 1. Scan workspace packages recursively
const packages = findWorkspacePackages('/Users/dev/workspace');
console.log('Found packages:', packages.map(p => p.name));

// 2. Build dependency relationships graph
const graph = buildDependencyGraph(packages);
console.log('Dependency graph:', graph);
/*
  {
    'shared-auth': [],
    'user-api': ['shared-auth'],
    'gateway-service': ['user-api']
  }
*/

// 3. Trace who is impacted by changes in 'shared-auth'
const impacted = findDependents('shared-auth', graph);
console.log('Downstream dependents to refactor:', impacted);
// ['user-api', 'gateway-service']
```

## API Reference

### `findWorkspacePackages(rootDir)`
Recursively traverses `rootDir`. Returns an array of package configurations:
```javascript
{
  name: "package-name",
  path: "/absolute/path/to/package",
  dependencies: { ... } // Combined dependencies and devDependencies
}
```

### `buildDependencyGraph(packages)`
Builds a directed dependency graph showing how workspace packages depend on other workspace packages. Packages outside the workspace are ignored.

### `findDependents(targetName, graph)`
Returns an array containing all package names in the graph that directly or transitively depend on `targetName`.

## Running Tests

```bash
npm test
```

## License

MIT
