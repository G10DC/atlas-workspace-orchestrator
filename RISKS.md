# Atlas — Risks and Mitigations

## Risks
- **Cyclic Dependencies**: Monorepos with circular dependency loops causing endless traversal.
  * *Mitigation*: Depth-first search (DFS) uses a `visited` set tracking visited nodes to prevent cycles.
- **Symlink Infinite Loops**: Symbolic links inside monorepos causing recursive directory scan failure.
  * *Mitigation*: Scan files by tracking absolute paths; ignore repeated folders.
