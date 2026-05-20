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
- CLI: `nexus init`

### v4.1.0 — Extensiones de Protocolo ✅

Lanzado: mayo 2026

- Operador `!error:código -> ruta` para manejo explícito de errores bajo `=>`
- Operador `[paginate:N]` para paginación nativa con controles automáticos
- Sintaxis `-> Model.Nombre [modificador]` para relaciones entre modelos de base de datos
- Documentación completa bilingüe (español/inglés)
- Carpeta `docs/` con gramática, operadores, ejemplos, roadmap, plantilla RFC
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`

### v4.1.1 — Calidad ✅

Lanzado: mayo 2026

- Validación de orquestadores PascalCase contra el conjunto completo conocido
- Expansión de orquestadores UI (`Card`, `Button`, `Text`, `Image`, `Input`, etc.)
- Merge profundo en `createDefaultConfig` — sobrescrituras parciales no pierden defaults
- `NEXUS_VERSION` como fuente única de verdad en `grammar.ts`
- Comillas escapadas en strings (`\"`, `\'`) sin falsos positivos

### v4.1.2 — Seguridad ✅

Lanzado: mayo 2026

- Bloqueo de caracteres de control U+0001–U+001F antes del procesamiento
- Validación de balance de brackets por línea (abre y cierra en la misma línea)

### v4.2.0 — Operador de Aserción ✅

Lanzado: mayo 2026

- Operador `!!` para declarar precondiciones explícitas antes de acciones `=>`
- Dos formas: `!! "descripción"` (guard semántico) y `!! expresión` (guard lógico)
- 8 nuevos tests cubriendo todos los casos del operador

### v4.3.0 — `nexus init` Unificado ✅

Lanzado: mayo 2026

- `nexus init` rediseñado — pregunta qué IA usa el developer y genera dos archivos automáticamente
- Arquitectura de skills: `skills/base/` (gramática neutra) + `skills/{ai}/` (complemento específico)
- Compatible con Claude Code, Cursor, ChatGPT, Gemini y cualquier IA
- Comandos eliminados: `nexus validate`, `nexus install`, `nexus context`

### v4.3.1 — Operador `from` y Verificación de Contratos ✅

Lanzado: mayo 2026

- Operador `from` — alias legible de `<` (`Table from User [paginate:20]` ≡ `Table < User [paginate:20]`)
- `!error:` ahora válido bajo `<`/`from` además de `=>` — corrige dashboard.nexus y casos similares
- Comando `nexus verify` — verifica que el código generado implementa el blueprint
- API pública: `extractContract()`, `verifyContract()`, `ContractItem`, `VerifyResult`
- `buildDefaultGrammarReference()` exportado — fuente única de verdad para skills y NEXUS.md
- 59 tests nuevos — total: 241 tests
- Seguridad: eliminadas todas las vulnerabilidades ReDoS en `verifier.ts`

---

## Próximas Versiones

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

---

## El Siguiente Salto — SDD (Software Design by Declaration)

### ¿Qué es SDD?

SDD es la evolución natural del protocolo NEXUS. Mientras la versión actual permite describir componentes, endpoints y flujos con precisión, SDD extiende esa capacidad hacia algo más ambicioso: describir decisiones de diseño de software completas.

La idea central es que un developer pueda expresar no solo *qué construir*, sino *cómo debe estar diseñado* — arquitectura, patrones, contratos entre sistemas, reglas de consistencia — de una forma que la IA pueda implementar con coherencia total a lo largo de todo el proyecto.

### El problema que resuelve

Hoy, incluso con NEXUS, cada sesión con la IA empieza desde cero en términos de decisiones arquitectónicas. SDD propone que esas decisiones se declaren una vez y se respeten siempre.

### Estado actual

En investigación. No hay sintaxis definida todavía — esa es una decisión que tomaremos junto a la comunidad cuando llegue el momento.

### Cómo participar

Si tienes ideas sobre cómo podría verse SDD, abre un RFC:
→ [Plantilla RFC](./rfcs/RFC-0001-plantilla.md)

El protocolo crece con la comunidad.
