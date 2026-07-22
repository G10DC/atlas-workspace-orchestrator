# Atlas — Benchmark Strategy

## Target Goals
- Find packages: < 20ms for workspaces with 50 packages.
- DFS Traversal: < 1ms.

## Strategy
Create dummy directory structures with nested package config files and benchmark find/traverse loops using `performance.now()`.
