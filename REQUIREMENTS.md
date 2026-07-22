# Atlas — Requirements

## Functional
- Recursively scan workspace directories for package configurations.
- Parse dependencies and devDependencies keys.
- Map directed dependency trees and resolve transitive dependents.

## Non-Functional
- Scan speed: > 100 package files parsed per second.
- $O(V + E)$ dependency traversal complexity.
- Zero runtime dependencies.
