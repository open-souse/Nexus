# 🗺️ NEXUS Roadmap: Camino a la v4.5.0

Este documento detalla las mejoras y nuevas funcionalidades planificadas para la versión **4.5.0** de NEXUS, centradas en convertir el protocolo en una herramienta de diseño y arquitectura universal.

---

## 🟢 Fase 1: Núcleo y Estructura (Completado)
- [x] **Modularización del Core**: Separación de la lógica de validación y prompts del CLI (`src/core`).
- [x] **Optimización de Tests**: Reducción de tiempos de ejecución de minutos a segundos mediante llamadas directas a la librería.
- [x] **Arquitectura Library-First**: Preparación del núcleo para ser consumido como librería independiente.

## 🟢 Fase 2: Inteligencia Semántica y Diseño (Completado)
- [x] **Módulo SDD (Software Design Document)**:
  - [x] Nuevos orchestrators: `System`, `Actor`, `Flow`, `Requirement`.
  - [x] Nuevas keywords: `can`, `must`, `should`, `architecture`.
- [x] **Advanced Semantic Validation**:
  - [x] Implementación de `ORCHESTRATOR_RULES` (Mapa de compatibilidad).
  - [x] Validación de anidamiento prohibido (ej: `Endpoint` dentro de `Page`).
- [x] **Refinamiento de Routing & APIs**:
  - [x] Implementar orchestrator `Router` para agrupar endpoints.
  - [x] Añadir keyword `policy` para reglas de acceso granulares.

## 🔵 Fase 3: Auditoría y Herramientas (Completado)
- [x] **Comando `nexus doctor` (Versión Pro)**:
  - [x] Validación de existencia de `nexus.config.json`.
  - [x] Auditoría de alineación entre DNA y `package.json`.
  - [x] Verificación de archivos físicos y entry points.
  - [x] Sugerencias de reparación inteligente.
- [x] **Comando `nexus blueprints`**:
  - [x] Listado de plantillas disponibles en el sistema.
  - [x] Aplicación de plantillas directamente al proyecto.

## 🔴 Fase 4: Lanzamiento v4.5.0 (Completado)
- [x] **Actualización de Documentación**: Reflejados los nuevos orchestrators en `README.md`.
- [x] **Limpieza de Código**: 100% de cobertura en tests semánticos (65 tests).
- [x] **Publicación**: Versión actualizada a `4.5.0` en `package.json` y `grammar.ts`.

---

## 🎉 NEXUS v4.5.0: The Architect Release
NEXUS ha evolucionado de un simple validador a un protocolo completo de diseño y arquitectura. Esta versión sienta las bases para el futuro de las herramientas AI-nativas.

---

## 📝 Notas de Implementación
- El foco debe mantenerse en la **precisión para la IA**. Cada regla añadida al validador debe reflejarse en el constructor de prompts.
- Mantener la compatibilidad hacia atrás con la v4.0.
