import fs from 'node:fs';
import path from 'node:path';

/**
 * Parses package.json files recursively to build workspace dependency maps.
 */
export function findWorkspacePackages(rootDir) {
  const packages = [];

  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    if (files.includes('node_modules')) {
      // Skip node_modules folder
    }

    if (files.includes('package.json')) {
      try {
        const filePath = path.join(dir, 'package.json');
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        packages.push({
          name: content.name || path.basename(dir),
          path: dir,
          dependencies: {
            ...content.dependencies,
            ...content.devDependencies
          }
        });
      } catch {
        // Skip invalid JSON files
      }
    }

    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (file !== 'node_modules' && !file.startsWith('.') && fs.statSync(fullPath).isDirectory()) {
        scan(fullPath);
      }
    }
  }

  scan(rootDir);
  return packages;
}

/**
 * Builds a workspace dependency graph based on parsed packages.
 */
export function buildDependencyGraph(packages) {
  const packageNames = new Set(packages.map(p => p.name));
  const graph = {};

  for (const pkg of packages) {
    graph[pkg.name] = [];
    if (pkg.dependencies) {
      for (const dep of Object.keys(pkg.dependencies)) {
        if (packageNames.has(dep)) {
          graph[pkg.name].push(dep);
        }
      }
    }
  }

  return graph;
}

/**
 * Finds all packages that directly or indirectly depend on target package.
 */
export function findDependents(targetName, graph) {
  const dependents = new Set();
  const visited = new Set();

  function dfs(current) {
    if (visited.has(current)) return;
    visited.add(current);

    for (const [pkgName, deps] of Object.entries(graph)) {
      if (deps.includes(current)) {
        dependents.add(pkgName);
        dfs(pkgName);
      }
    }
  }

  dfs(targetName);
  return Array.from(dependents);
}
