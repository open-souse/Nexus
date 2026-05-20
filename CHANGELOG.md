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

## [4.3.1] — 2026-05-20

### Added
- **`from` operator** — readable alias for `<` data binding. `Table from User [paginate:20]` is semantically identical to `Table < User [paginate:20]`. Accepted everywhere `<` is accepted, including `[paginate:]` and `!error:` parent check.
- **`nexus verify` command** — new CLI command that scans generated code and reports which blueprint contract items are implemented. Usage: `nexus verify <blueprint.nexus> [codedir] [--json]`. Supports `--json` for machine-readable output.
- **`extractContract(blueprint)`** — exported pure function that extracts verifiable `ContractItem[]` from a blueprint string. No filesystem access, fully testable.
- **`verifyContract(items, codeFiles, packageJson)`** — exported pure function that matches contract items against a `Map<filename, content>`. Detects: auth guards, assertion messages, HTTP error codes, service action calls, npm packages, endpoint routes, pagination.
- **`ContractItem` / `VerifyResult` types** — exported from `nxlang` public API.
- **`tests/commands/verify.test.ts`** — 17 tests for `extractContract` and `verifyContract`.
- **`tests/from-alias.test.ts`** — 8 tests for the `from` alias operator.
- **`tests/builder-sync.test.ts`** — CI guard: one test per `NEXUS_OPERATORS` symbol, verifies each appears in `buildDefaultGrammarReference()` output.
- **`buildDefaultGrammarReference()`** — exported function returning the grammar reference string used in `NEXUS.md` and skill files.

### Changed
- **`validator.ts`**: `!error:` parent check now accepts `<`/`from` data bindings in addition to `=>` actions. Added bare `from` validation (error if `from` appears without a source). `[paginate:]` now accepts `from` as a valid binding keyword.
- **`grammar.ts`**: Added `from` entry to `NEXUS_OPERATORS` array.
- **`builder.ts`**: Added `from`, `[animate:]`, `[hover:]`, `[a11y:]`, `[paginate:]`, `@install` to grammar reference (were missing from `buildDefaultGrammarReference()` output).
- **`src/index.ts`**: Added `verifyCommand` to CLI program.
- **`src/lib.ts`**: Exported `extractContract`, `verifyContract`, `ContractItem`, `ContractItemType`, `VerifyResult`, `buildDefaultGrammarReference`.
- **Security**: Eliminated all ReDoS vulnerabilities in `verifier.ts` — replaced `new RegExp(userInput)` with `toLowerCase()+includes()` (`searchString()`) for all user-controlled input; `escape()` helper removed entirely; only static hardcoded regexes remain.

### Tests
- 59 new tests (total: 241 tests, up from 182)

---

## [4.3.0] — 2026-05-19

### Added
- **`skills/` directory** — ships with the npm package. Structure: `skills/base/` (neutral grammar), `skills/claude-code/`, `skills/cursor/`, `skills/chatgpt/`.
- **`buildAIComplement(aiName)`** — exported pure function that generates the AI-neutral instruction set for any assistant.
- **`generateNexusMd()`** — exported function that produces the full grammar reference from all active modules.

### Changed
- **`nexus init` redesigned** — now asks which AI the developer uses and generates two files automatically: `NEXUS.md` (full protocol grammar, AI-neutral) and the AI-specific complement (`.claude/skills/nexus/SKILL.md` for Claude Code, `.cursorrules` for Cursor, `custom-instructions.md` for ChatGPT, `gemini-context.md` for Gemini, `AI-INSTRUCTIONS.md` for others).
- **`skills/claude-code/SKILL.md` fixed** — all 13 missing operators added (`@modify`, `??`, `{ }`, `|`, `@RateLimit`, `[animate:]`, `[hover:]`, `[a11y:]`, `[locked]`, `[new]`, `[inherit:siblings]`, `[cascade:children]`, `[position:move-to:N]`); missing orchestrators added (`Store`, `Type`, `Create`); references to specific AI names replaced with neutral "El asistente"; non-existent `nexus grammar` command removed.
- **Skills architecture** — split into base neutral grammar (`skills/base/SKILL.md`) + AI-specific complement per tool.

### Removed
- **`nexus validate`** — eliminated; the core `validateNexus()` function remains in `src/core/validator.ts` and is fully tested.
- **`nexus install`** — eliminated; `@install` declarations in the blueprint are sufficient.
- **`nexus context`** — merged into `nexus init`.

---

## [4.2.0] — 2026-05-16

### Added
- **`!!` Assertion operator** — New operator that declares explicit preconditions before `=>` actions. Two forms: `!! "description"` (semantic guard) and `!! expression` (logical guard). Multiple `!!` are evaluated strictly top-to-bottom; first failure stops execution.
- **`grammar.ts`**: Added `!!` entry to `NEXUS_OPERATORS` array.
- **`validator.ts`**: Added assertion validation block before `!error:` handler. Empty `!!` emits error `'"!!" requires content'`. Also relaxed `!error` parent check to `>=` (allows `!error` at same indentation level as `=>`).
- **`builder.ts`**: Added `!! "precondition"` line to grammar reference and full `ASSERTION OPERATOR (!!)` section to system prompt with code generation rules and examples.
- **`tests/assertions.test.ts`**: 8 new tests covering all assertion operator cases.
- **`docs/en/operators.md`** and **`docs/es/operadores.md`**: Full `!!` operator documentation with generated code examples.
- **`docs/en/examples.md`** and **`docs/es/ejemplos.md`**: Payment API checkout example with `!!` assertions.
- **`NEXUS-Grammar.md`**: Added `!!` to operator table and new `§5.4` section.

---

## [4.1.2] — 2026-05-15

### Security
- Block control characters U+0001–U+001F from being processed. Tab (`\x09`) and newline (`\x0A`) remain legitimate. Affected content now returns an early error at line 0 before any parsing occurs.
- Fix bracket balance validation — brackets must open and close on the same line. Previously a `[` on line N could be silently "closed" by `]` on line N+k, causing malformed NEXUS to pass validation undetected.

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
- Multi-provider support: GPT, Gemini, and major LLMs
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
