# Atlas — Architecture

## Component Design

```
                     ┌──────────────────┐
                     │  Workspace Root  │
                     └────────┬─────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────┐
│                      Atlas Core                        │
│                                                        │
│  ┌────────────────────┐      ┌──────────────────────┐  │
│  │   Scanner Engine   │ ───► │   Dependency Graph   │  │
│  │ - Recursive Find   │      │   - Graph Mapper     │  │
│  │ - package.json     │      │   - Dependent Tracer │  │
│  └────────────────────┘      └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```
- **Scanner Boundary**: Excludes `node_modules` and hidden files at the filesystem level.
- **Topological Graph**: Maps directed connections using internal package names instead of directory paths.
