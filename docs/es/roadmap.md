<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <strong>🇪🇸 Español</strong> · <a href="../en/roadmap.md">🇺🇸 English</a>
</p>

# Roadmap NEXUS Protocol

## Filosofía

NEXUS crece con la comunidad. Las versiones futuras se basan en:

1. Problemas reales que los usuarios reportan
2. Propuestas aprobadas via RFC
3. Necesidades de nuevas industrias y casos de uso

El protocolo no persigue features. Persigue precisión.

---

## Historial de Versiones

### v4.0.0 — Núcleo Modular ✅

Lanzado: mayo 2026

- Arquitectura Library-First (`core/`, `context/`, `cli/`)
- Seguridad defensiva: límite 500KB, 2000 líneas, null bytes, tokenizador consciente de strings
- 90 tests, suite en ~1 segundo
- API pública: `validateNexus()`, `buildSystemPrompt()`, `createDefaultConfig()`
- Soporte multi-provider: GPT, Gemini y los principales LLMs
- CLI: `nexus init`, `nexus validate`

### v4.1.0 — Extensiones de Protocolo ✅

Lanzado: mayo 2026

- Operador `!error:código -> ruta` para manejo explícito de errores bajo `=>`
- Operador `[paginate:N]` para paginación nativa con controles automáticos
- Sintaxis `-> Model.Nombre [modificador]` para relaciones entre modelos de base de datos
- Documentación completa bilingüe (español/inglés)
- Carpeta `docs/` con gramática, operadores, ejemplos, roadmap, plantilla RFC
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`

---

## Próximas Versiones

### v4.2.0 — Guiado por la Comunidad

Sin fecha fija — se lanza cuando haya suficientes propuestas RFC aprobadas.

Posibles includes (sujeto a aprobación RFC):
- Extensiones de protocolo propuestas por la comunidad
- Soporte para nuevas industrias según adopción real
- Mejoras al validador basadas en errores reportados

### v4.5.0 — Motor Semántico

Sin fecha fija — requiere madurez del ecosistema.

- Detección de arquitecturas imposibles antes de generar código
- CLI Doctor: diagnóstico de proyectos NEXUS con sugerencias
- Detección de patrones antipatrón en tiempo de validación

### v5.0.0 — NEXUS LSP

Largo plazo — requiere ecosistema establecido.

- NEXUS Language Server Protocol para integración nativa con editores
- Syntax highlighting, autocomplete y validación en tiempo real en VS Code, JetBrains, Neovim
- Requiere que la comunidad lo construya sobre la base de `core/`

---

## Fuera del Scope de nxlang

Estas funcionalidades **NO** están en el roadmap de `nxlang`:

| Fuera del scope | Por qué |
|---|---|
| Generar código directamente | Eso es [Prism](https://github.com/open-souse/prism) |
| Convertirse en compilador | NEXUS es un protocolo, no un compilador |
| Reemplazar lenguajes existentes | NEXUS describe intenciones, no implementaciones |
| Runtime en el navegador | El núcleo es Node.js — embebido en herramientas |

---

## Cómo Proponer Cambios

1. Abre un issue con el prefijo `[RFC]`
2. Usa la [plantilla RFC](./rfcs/RFC-0001-plantilla.md)
3. La comunidad discute durante 14 días mínimo
4. Edwin Realpe (guardián del protocolo) aprueba o rechaza
5. Si se aprueba, se implementa en la siguiente versión minor

→ [Ver proceso completo de RFC](./rfcs/RFC-0001-plantilla.md)
