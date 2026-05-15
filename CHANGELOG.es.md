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
- Soporte multi-provider: Claude, GPT, Gemini
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
