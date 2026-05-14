<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <a href="./CONTRIBUTING.es.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# Contribution Guide — NEXUS Protocol

## Welcome

NEXUS is an open standard. Every contribution builds the future of Human-AI communication.

---

## Ways to Contribute

### 1. Report a bug

Open an issue with:
- nxlang version (`npm list nxlang`)
- The `.nexus` file that causes the problem
- The error you see
- The behavior you expected

### 2. Propose a protocol extension (RFC)

Protocol extensions follow a formal process:

1. Open an issue with the `[RFC]` prefix
2. Use the template at [`docs/en/rfcs/RFC-0001-template.md`](./docs/en/rfcs/RFC-0001-template.md)
3. The community discusses for a **minimum of 14 days**
4. Edwin Realpe (protocol guardian) approves or rejects
5. If approved, it's implemented in the next minor version

### 3. Improve documentation

- Fix errors in `docs/es/` or `docs/en/`
- Add real examples to `docs/en/examples.md`
- Translate to new languages (create `docs/XX/` following the existing structure)

### 4. Contribute code

```bash
git clone https://github.com/open-souse/Nexus.git
cd Nexus
npm install
npm run test        # tests must pass
npm run build       # must compile without errors
```

Create your branch:
```bash
git checkout -b feat/change-name
# or
git checkout -b fix/bug-name
```

**PR rules:**
- Tests must pass (`npm run test`)
- Build must complete without errors (`npm run build`)
- If you change the grammar, update `core/grammar.ts`, `core/validator.ts`, `context/builder.ts`, and the corresponding documentation files
- If you change operators, add tests in `tests/`
- Documentation must be updated in both languages

### 5. Expand to new industries

If you use NEXUS outside programming (design, marketing, legal, etc.) and want to share your grammar, open an issue with the `[INDUSTRY]` prefix describing your use case.

---

## What We Do NOT Accept

- Changes that break backward compatibility without an approved RFC
- Code without tests
- Documentation in only one language (if you add docs, add in ES and EN)
- Extensions that turn NEXUS into a compiler or direct code generator

---

## Review Process

PRs are reviewed within **7 days maximum**. If there's no response by then, mention `@edwinreal` in the PR.

---

## Development Setup

```bash
# Install dependencies
npm install

# Run tests (requires Node ≥ 20)
npm run test

# Run tests in watch mode
npx vitest

# Build
npm run build

# Lint
npm run lint
```

The full suite runs in ~1 second. If you introduce a change that makes it slower, investigate before submitting a PR.

---

## Code of Conduct

→ [See code of conduct](./CODE_OF_CONDUCT.md)

---

## License

By contributing, you agree that your code is distributed under the project's [MIT license](./LICENSE).
