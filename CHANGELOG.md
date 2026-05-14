<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <a href="./CHANGELOG.es.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# Changelog

All notable changes to `nxlang` will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [4.1.1] — 2026-05-14

### Fixed
- **Orchestrator validation**: `validator.ts` now validates PascalCase orchestrator names against the full set of known orchestrators + keywords. Catches typos like `PAge`, `Controlador`, or unknown names at dev time.
- **Grammar expansion**: Added UI components to `NEXUS_ORCHESTRATORS` — `Card`, `Button`, `Text`, `Image`, `Input`, `Badge`, `Nav`, `Navbar`, `Header`, `Grid`, `List`, `Form`, `Table`, `Chart`, `Modal`, `Select`, `Skeleton`, `Stack`, `Field`.
- **Version constant**: `builder.ts` now imports `NEXUS_VERSION` from `grammar.ts` instead of using a hardcoded string. Version is now a single source of truth.
- **Deep merge config**: `createDefaultConfig` now uses `deepMerge` so partial overrides like `{ tokens: { primary: '#red' } }` no longer lose sibling token defaults.
- **Escaped quotes in strings**: `stripStringContent` now handles `\"` and `\'` inside quoted strings, preventing false-positive token errors.
- **buildPrompt refactor**: Split 139-line `buildPrompt` into three focused private functions (`buildOrchestratorList`, `buildModuleExamples`, `buildGrammarReference`) each under 40 lines.
- **Hex color validation**: `nexus init` now validates color inputs with `/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/` — rejects invalid hex before writing config.
- **Config not found warning**: `nexus context` now prints a `chalk.yellow` warning when `nexus.config.json` is not found instead of silently using defaults.

### Breaking Changes
- `buildContextPrompt` export removed from `src/lib.ts`. Use `buildPrompt` directly (exported from the same package root).

### Tests
- 14 new tests (total: 135 tests)
  - Orchestrator validation: invalid/valid orchestrators
  - `@RateLimit` invalid format detection
  - `]` without matching `[` detection
  - Escaped quotes in string content
  - Deep merge token partial override
  - Unknown module graceful handling

---

## [4.1.0] — 2026-05-14

### Added
- `!error:code -> route` operator for explicit error handling under `=>` actions
  - Valid codes: 400–599, `timeout`, `network`, `*` (wildcard)
  - Multiple `!error` can be chained under the same `=>`
- `[paginate:N]` operator for native pagination on `<` bound elements
  - Parameters: `paginate:N` (1–500), `page:~var`, `layout:grid|list`
  - Conflict with `* N` multiplier validated
- `-> Model.Name [modifier]` syntax for database model relations
  - Modifiers: `many`, `optional`, `cascade`
  - AI generates foreign keys, constraints, and inverse relations based on the active ORM
- Complete bilingual documentation (Spanish/English):
  - `docs/es/`: grammar, operators, examples, roadmap, RFC template
  - `docs/en/`: grammar, operators, examples, roadmap, RFC template
- `README.es.md` and `README.en.md` with language selector
- `CONTRIBUTING.es.md` with contribution and RFC process
- `CHANGELOG.es.md`
- `CODE_OF_CONDUCT.md` and `CODE_OF_CONDUCT.es.md`
- Updated `SECURITY.md` and `SECURITY.es.md` with supported versions

### Tests
- 31 new tests (total: 121 tests)
  - 11 tests for `!error:` (`tests/error-handler.test.ts`)
  - 11 tests for `[paginate:N]` (`tests/pagination.test.ts`)
  - 10 tests for `-> Model.Name` (`tests/model-relations.test.ts`)

---

## [4.0.1] — 2026-05-12

### Fixed
- Version references `4.0.0` → `4.0.1` across documentation
- Tests badge updated to 121 tests
- Logo SVG text updated to `PROTOCOL v4.0.1`

---

## [4.0.0] — 2026-05-10

### Added
- Library-First architecture (`core/`, `context/`, `cli/`)
- Defensive security:
  - 500KB per-file limit
  - 2000 line limit
  - Null byte detection
  - String-aware tokenizer
- Public API: `validateNexus()`, `buildSystemPrompt()`, `createDefaultConfig()`
- Multi-provider support: Claude, GPT, Gemini
- CLI: `nexus init`, `nexus validate`
- Full Backend support: `Model`, `Controller`, `Service`, `Middleware`, `Worker`, `Queue`, `CronJob`
- 90 tests, suite in ~1 second

### Removed
- Legacy CLI commands: `learn`, `examples`, `update`, `doctor`, `config`
- `conf` dependency
- Medical module examples

### Changed
- Grammar version updated to `v4.0`
- README completely rewritten with Library-First vision
