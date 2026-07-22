import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { findWorkspacePackages, buildDependencyGraph, findDependents } from '../lib/atlas.js';

test('Atlas traces package dependencies and reachability', () => {
  const tempDir = path.resolve('test/temp_workspace');
  const pkgADir = path.join(tempDir, 'pkg-a');
  const pkgBDir = path.join(tempDir, 'pkg-b');
  const pkgCDDir = path.join(tempDir, 'pkg-c');

  fs.mkdirSync(pkgADir, { recursive: true });
  fs.mkdirSync(pkgBDir, { recursive: true });
  fs.mkdirSync(pkgCDDir, { recursive: true });

  fs.writeFileSync(path.join(pkgADir, 'package.json'), JSON.stringify({ name: 'pkg-a', dependencies: {} }), 'utf8');
  fs.writeFileSync(path.join(pkgBDir, 'package.json'), JSON.stringify({ name: 'pkg-b', dependencies: { 'pkg-a': '^1.0.0' } }), 'utf8');
  fs.writeFileSync(path.join(pkgCDDir, 'package.json'), JSON.stringify({ name: 'pkg-c', dependencies: { 'pkg-b': '^1.0.0' } }), 'utf8');

  // Scan and parse
  const packages = findWorkspacePackages(tempDir);
  assert.strictEqual(packages.length, 3);

  // Build graph
  const graph = buildDependencyGraph(packages);
  assert.deepStrictEqual(graph['pkg-c'], ['pkg-b']);
  assert.deepStrictEqual(graph['pkg-b'], ['pkg-a']);
  assert.deepStrictEqual(graph['pkg-a'], []);

  // Trace dependents
  const dependents = findDependents('pkg-a', graph);
  assert.ok(dependents.includes('pkg-b'));
  assert.ok(dependents.includes('pkg-c'));
  assert.strictEqual(dependents.length, 2);

  // Clean up
  fs.rmSync(tempDir, { recursive: true, force: true });
});
