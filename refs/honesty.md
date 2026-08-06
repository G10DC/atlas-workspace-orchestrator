# Atlas Monorepo Workspace Orchestration Honesty Bounds

The honesty layer is the operational expression of the **G10DC Trellis Standard**: **the processing engine reasons over verified evidence with stated confidence, never hallucinates capabilities or impact.**

## Domain & Scope
**Domain**: Multi-Repository Dependency Reachability

## Core Epistemic Rules

1. **Workspace Scale Bounds: Cross-repo reachability relies on trellis single-repo graphs. Missing workspace repos reduce confidence.**
2. **Package Resolution: Monorepo workspace package aliases (e.g. @g10dc/*) are resolved via manifest links.**
3. **Confidence Rating: High (all repos indexed by trellis), Medium (partial workspace indexing), Low (unindexed repos).**

## Three-Tier Confidence Model

- **High Confidence**: Full AST/schema validation passing, deterministic evidence available, verified state.
- **Medium Confidence**: Heuristic analysis or partial indexing; requires agent verification step.
- **Low Confidence**: Inferred or unindexed target; candidate output ONLY, never auto-committed.

## Epistemic Invariant

> Absence of evidence is not evidence of absence. Output is presented as a structured candidate set with confidence scores so caveats cannot be silently dropped downstream.
