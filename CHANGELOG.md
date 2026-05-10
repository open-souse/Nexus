# Changelog

All notable changes to `nxlang` are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [4.0.0] - 2026-05-10

### Added
- **Elite Backend Support**: Complete grammar for backend orchestration:
  - New Orchestrators: `Model`, `Controller`, `Service`, `Middleware`, `Worker`, `Queue`, `CronJob`.
  - New Keywords: `Entity`, `Relation`, `Repository`.
  - New Operators: `!pk` (Primary Key), `@Auth` (Authentication), `@RateLimit` (Rate Limiting).
- **Backend DNA in `nexus init`**: The CLI now asks for Backend Framework (Express, NestJS, etc.), Database (Postgres, Mongo, etc.), and ORM (Prisma, TypeORM, etc.).
- **Library-First Focus**: Streamlined exports in `src/lib.ts` to power NEXUS Studio.

### Removed (The Big Cleanup)
- **Dead CLI Commands**: Removed `learn`, `examples`, `update`, `doctor`, and `config` to focus on the core engine.
- **`conf` dependency**: Removed global config persistence to keep the library lightweight.
- **Medical Module**: Removed the medical triage examples to focus on professional Full-Stack development.

### Changed
- **Grammar Version**: Updated to v4.0.
- **README.md**: Completely rewritten to reflect the new vision as an IDE-ready core protocol.
- **Tests**: Consolidated test suite to focus on Core, Context, Scaffold, and Validation.

---

## [0.4.0] - 2026-05-10
### Added
- **Library exports** (`dist/lib.js`): `nxlang` is now importable as a Node.js library.
- **`buildSystemPrompt(config, provider)`**: Builds a provider-aware system prompt for Claude, GPT-4, or Gemini.
...
