# Changelog

Todos los cambios notables de `nxlang` se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [4.1.2] - 2026-05-15

### Seguridad
- Bloquear caracteres de control U+0001–U+001F antes del procesamiento. Tab (`\x09`) y salto de línea (`\x0A`) siguen siendo legítimos. El contenido afectado retorna un error inmediato en línea 0 antes de cualquier análisis.
- Corregir validación de balance de brackets — los brackets deben abrir y cerrar en la misma línea. Anteriormente un `[` en la línea N podía ser "cerrado" silenciosamente por `]` en la línea N+k, permitiendo que NEXUS malformado pasara la validación sin detección.

---

## [4.0.0] - 2026-05-10

### Añadido
- **Soporte Backend Elite**: Gramática completa para orquestación backend.
- **Backend DNA en `nexus init`**: El CLI ahora solicita Framework Backend, Base de Datos y ORM.
- **Enfoque Library-First**: Exports optimizados en `src/lib.ts`.

### Eliminado
- **Comandos CLI obsoletos**: Eliminados `learn`, `examples`, `update`, `doctor` y `config`.
- **Dependencia `conf`**: Eliminada la persistencia global de configuración.
- **Módulo Médico**: Eliminados los ejemplos de triage médico.

### Modificado
- **Versión de Gramática**: Actualizada a v4.0.
