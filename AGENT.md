# AGENT.md — Atlas Workspace Rules

Rules for cross-repository dependency tracing.

## Execution
- Always scan the target workspace structure before making alterations to common dependencies.
- Map the internal package reachability tree using `findDependents()` to verify potential downstream breaks.

## Ripple Edits
- Coordinate with `smith` to automatically propagate signature changes to all packages identified in the dependency graph.
