<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <strong>🇪🇸 Español</strong> · <a href="./CHANGELOG.md">🇺🇸 English</a>
</p>

# Registro de Cambios

Todos los cambios notables de `nxlang` se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [4.3.1] — 2026-05-20

### Añadido
- **Operador `from`** — alias legible de `<` para binding de datos. `Table from User [paginate:20]` es semánticamente idéntico a `Table < User [paginate:20]`. Aceptado en todos los contextos donde `<` es válido, incluyendo `[paginate:]` y comprobación de padre de `!error:`.
- **Comando `nexus verify`** — nuevo comando CLI que escanea el código generado y reporta qué items del contrato del blueprint están implementados. Uso: `nexus verify <blueprint.nexus> [directorio] [--json]`. Soporta `--json` para salida legible por máquinas.
- **`extractContract(blueprint)`** — función pura exportada que extrae `ContractItem[]` verificables de un blueprint. Sin acceso a sistema de archivos, totalmente testeable.
- **`verifyContract(items, codeFiles, packageJson)`** — función pura exportada que compara items del contrato contra un `Map<filename, content>`. Detecta: guards de autenticación, mensajes de aserción, códigos HTTP de error, llamadas a servicios, paquetes npm, rutas de endpoints, paginación.
- **Tipos `ContractItem` / `VerifyResult`** — exportados desde la API pública de `nxlang`.
- **`tests/commands/verify.test.ts`** — 17 tests para `extractContract` y `verifyContract`.
- **`tests/from-alias.test.ts`** — 8 tests para el operador alias `from`.
- **`tests/builder-sync.test.ts`** — guardia CI: un test por símbolo de `NEXUS_OPERATORS`, verifica que cada uno aparece en la salida de `buildDefaultGrammarReference()`.
- **`buildDefaultGrammarReference()`** — función exportada que devuelve la cadena de referencia de gramática usada en `NEXUS.md` y archivos de skills.

### Cambiado
- **`validator.ts`**: La comprobación de padre de `!error:` ahora acepta bindings de datos `<`/`from` además de acciones `=>`. Añadida validación de `from` suelto (error si `from` aparece sin fuente). `[paginate:]` ahora acepta `from` como keyword de binding válido.
- **`grammar.ts`**: Añadida entrada `from` al array `NEXUS_OPERATORS`.
- **`builder.ts`**: Añadidos `from`, `[animate:]`, `[hover:]`, `[a11y:]`, `[paginate:]`, `@install` a la referencia de gramática (faltaban en la salida de `buildDefaultGrammarReference()`).
- **`src/index.ts`**: Añadido `verifyCommand` al programa CLI.
- **`src/lib.ts`**: Exportados `extractContract`, `verifyContract`, `ContractItem`, `ContractItemType`, `VerifyResult`, `buildDefaultGrammarReference`.
- **Seguridad**: Eliminadas todas las vulnerabilidades ReDoS en `verifier.ts` — `new RegExp(userInput)` reemplazado por `toLowerCase()+includes()` (`searchString()`) para todo input controlado por el usuario; helper `escape()` eliminado completamente; solo quedan regexes estáticos hardcodeados.

### Tests
- 59 nuevos tests (total: 241 tests, desde 182)

---

## [4.3.0] — 2026-05-19

### Añadido
- **Directorio `skills/`** — distribuido con el paquete npm. Estructura: `skills/base/` (gramática neutral), `skills/claude-code/`, `skills/cursor/`, `skills/chatgpt/`.
- **`buildAIComplement(aiName)`** — función pura exportada que genera el conjunto de instrucciones neutras para cualquier asistente IA.
- **`generateNexusMd()`** — función exportada que produce la referencia completa de gramática con todos los módulos activos.

### Cambiado
- **`nexus init` rediseñado** — ahora pregunta qué IA usa el developer y genera dos archivos automáticamente: `NEXUS.md` (gramática completa del protocolo, neutral) y el complemento específico para la IA (`.claude/skills/nexus/SKILL.md` para Claude Code, `.cursorrules` para Cursor, `custom-instructions.md` para ChatGPT, `gemini-context.md` para Gemini, `AI-INSTRUCTIONS.md` para otras).
- **`skills/claude-code/SKILL.md` corregido** — añadidos los 13 operadores faltantes (`@modify`, `??`, `{ }`, `|`, `@RateLimit`, `[animate:]`, `[hover:]`, `[a11y:]`, `[locked]`, `[new]`, `[inherit:siblings]`, `[cascade:children]`, `[position:move-to:N]`); añadidos orquestadores faltantes (`Store`, `Type`, `Create`); referencias a IAs específicas reemplazadas por "El asistente"; comando inexistente `nexus grammar` eliminado.
- **Arquitectura de skills** — dividida en gramática base neutral (`skills/base/SKILL.md`) + complemento específico por herramienta IA.

### Eliminado
- **`nexus validate`** — eliminado; la función `validateNexus()` permanece en `src/core/validator.ts` con cobertura de tests completa.
- **`nexus install`** — eliminado; las declaraciones `@install` en el blueprint son suficientes.
- **`nexus context`** — fusionado en `nexus init`.

---

## [4.2.0] — 2026-05-16

### Añadido
- **Operador de aserción `!!`** — Nuevo operador que declara precondiciones explícitas antes de acciones `=>`. Dos formas: `!! "descripción"` (guard semántico) y `!! expresión` (guard lógico). Múltiples `!!` se evalúan estrictamente de arriba a abajo; el primer fallo detiene la ejecución.
- **`grammar.ts`**: Añadida entrada `!!` al array `NEXUS_OPERATORS`.
- **`validator.ts`**: Añadido bloque de validación de aserciones antes del handler `!error:`. `!!` vacío emite error `'"!!" requires content'`. También se relaxó la comprobación de padre de `!error` a `>=` (permite `!error` al mismo nivel de indentación que `=>`).
- **`builder.ts`**: Añadida línea `!! "precondición"` a la referencia de gramática y sección completa `ASSERTION OPERATOR (!!)` al system prompt con reglas de generación de código y ejemplos.
- **`tests/assertions.test.ts`**: 8 nuevos tests cubriendo todos los casos del operador de aserción.
- **`docs/en/operators.md`** y **`docs/es/operadores.md`**: Documentación completa del operador `!!` con ejemplos de código generado.
- **`docs/en/examples.md`** y **`docs/es/ejemplos.md`**: Ejemplo de API de pagos con aserciones `!!`.
- **`NEXUS-Grammar.md`**: Añadido `!!` a la tabla de operadores y nueva sección `§5.4`.

---

## [4.1.2] — 2026-05-15

### Seguridad
- Bloquear caracteres de control U+0001–U+001F antes del procesamiento. Tab (`\x09`) y salto de línea (`\x0A`) siguen siendo legítimos. El contenido afectado retorna un error inmediato en línea 0 antes de cualquier análisis.
- Corregir validación de balance de brackets — los brackets deben abrir y cerrar en la misma línea. Anteriormente un `[` en la línea N podía ser "cerrado" silenciosamente por `]` en la línea N+k, permitiendo que NEXUS malformado pasara la validación sin detección.

---

## [4.1.1] — 2026-05-14

### Correcciones
- **Validación de orquestadores**: `validator.ts` ahora valida nombres PascalCase contra el conjunto completo de orquestadores y palabras clave. Detecta errores tipográficos como `PAge`, `Controlador` o nombres desconocidos en tiempo de desarrollo.
- **Expansión de gramática**: Se añadieron componentes UI a `NEXUS_ORCHESTRATORS` — `Card`, `Button`, `Text`, `Image`, `Input`, `Badge`, `Nav`, `Navbar`, `Header`, `Grid`, `List`, `Form`, `Table`, `Chart`, `Modal`, `Select`, `Skeleton`, `Stack`, `Field`.
- **Constante de versión**: `builder.ts` ahora importa `NEXUS_VERSION` desde `grammar.ts` en lugar de usar una cadena de texto fija. La versión es ahora una única fuente de verdad.
- **Merge profundo en config**: `createDefaultConfig` ahora usa `deepMerge` para que sobrescrituras parciales como `{ tokens: { primary: '#rojo' } }` no pierdan los otros valores por defecto de tokens.
- **Comillas escapadas en strings**: `stripStringContent` ahora maneja `\"` y `\'` dentro de cadenas, evitando falsos positivos en el escáner de tokens.
- **Refactor de buildPrompt**: La función de 139 líneas se dividió en tres funciones privadas (`buildOrchestratorList`, `buildModuleExamples`, `buildGrammarReference`) de menos de 40 líneas cada una.
- **Validación de color hex**: `nexus init` ahora valida los colores con `/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/` — rechaza colores hex inválidos antes de escribir la configuración.
- **Advertencia sin config**: `nexus context` ahora muestra una advertencia en amarillo cuando no se encuentra `nexus.config.json` en lugar de usar valores por defecto en silencio.

### Cambios Incompatibles
- El export `buildContextPrompt` fue eliminado de `src/lib.ts`. Usa `buildPrompt` directamente (exportado desde la misma raíz del paquete).

### Tests
- 14 nuevos tests (total: 135 tests)
  - Validación de orquestadores: válidos e inválidos
  - Detección de formato inválido en `@RateLimit`
  - Detección de `]` sin `[` correspondiente
  - Comillas escapadas en contenido de strings
  - Merge parcial de tokens (merge profundo)
  - Manejo de módulo desconocido sin lanzar excepción

---

## [4.1.0] — 2026-05-14

### Agregado
- Operador `!error:código -> ruta` para manejo explícito de errores bajo acciones `=>`
  - Códigos válidos: 400–599, `timeout`, `network`, `*` (comodín)
  - Se pueden encadenar múltiples `!error` bajo el mismo `=>`
- Operador `[paginate:N]` para paginación nativa en elementos con binding `<`
  - Parámetros: `paginate:N` (1–500), `page:~var`, `layout:grid|list`
  - Conflicto validado con multiplicador `* N`
- Sintaxis `-> Model.Nombre [modificador]` para relaciones entre modelos de base de datos
  - Modificadores: `many`, `optional`, `cascade`
  - La IA genera claves foráneas, constraints y relaciones inversas según el ORM
- Documentación completa bilingüe (español/inglés):
  - `docs/es/`: gramática, operadores, ejemplos, roadmap, plantilla RFC
  - `docs/en/`: grammar, operators, examples, roadmap, RFC template
- `README.es.md` y `README.en.md` con selector de idioma
- `CONTRIBUTING.es.md` con proceso de contribución y RFC
- `CHANGELOG.es.md` (este archivo)
- `CODE_OF_CONDUCT.md` y `CODE_OF_CONDUCT.es.md`
- `SECURITY.md` y `SECURITY.es.md` actualizados con versiones soportadas

### Tests
- 31 tests nuevos (total: 121 tests)
  - 11 tests para `!error:` (`tests/error-handler.test.ts`)
  - 11 tests para `[paginate:N]` (`tests/pagination.test.ts`)
  - 10 tests para `-> Model.Nombre` (`tests/model-relations.test.ts`)

---

## [4.0.1] — 2026-05-12

### Corregido
- Referencias de versión `4.0.0` → `4.0.1` en documentación
- Badge de tests actualizado a 121 tests
- Texto del SVG del logo actualizado a `PROTOCOL v4.0.1`

---

## [4.0.0] — 2026-05-10

### Agregado
- Arquitectura Library-First (`core/`, `context/`, `cli/`)
- Seguridad defensiva:
  - Límite de 500KB por archivo
  - Límite de 2000 líneas
  - Detección de null bytes
  - Tokenizador consciente de strings
- API pública: `validateNexus()`, `buildSystemPrompt()`, `createDefaultConfig()`
- Soporte multi-provider: GPT, Gemini y los principales LLMs
- CLI: `nexus init`, `nexus validate`
- Soporte completo de Backend: `Model`, `Controller`, `Service`, `Middleware`, `Worker`, `Queue`, `CronJob`
- 90 tests, suite en ~1 segundo

### Eliminado
- Comandos CLI legacy: `learn`, `examples`, `update`, `doctor`, `config`
- Dependencia `conf`
- Módulo médico de ejemplos

### Modificado
- Versión de gramática actualizada a `v4.0`
- README completamente reescrito con visión Library-First
