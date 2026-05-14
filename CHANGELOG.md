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
