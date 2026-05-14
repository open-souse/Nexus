<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS Logo" width="100"/>
</p>

<p align="center">
  <a href="./README.md">🇪🇸 Español</a> ·
  <a href="./README.en.md">🇺🇸 English</a>
</p>

# 🌐 NEXUS Protocol — nxlang

> El protocolo de comunicación universal entre Humanos e IA.

[![npm version](https://img.shields.io/npm/v/nxlang.svg?style=flat-square)](https://www.npmjs.com/package/nxlang)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-121%20pasando-brightgreen?style=flat-square)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square)]()

## El Problema

La IA existe. Funciona. Pero comunicarse con ella con precisión es difícil.

El lenguaje natural es ambiguo por diseño — lo que para un humano es obvio, para una IA puede tener diez interpretaciones distintas. Eso produce código inconsistente, diseños incorrectos, procesos mal entendidos.

Este no es un problema del modelo. Es un problema del lenguaje.

## La Solución

NEXUS es un protocolo taquigráfico diseñado para que los humanos le comuniquen intenciones a la IA con precisión total y sin ambigüedad.

No es un lenguaje de programación. No reemplaza a JavaScript, Python ni ningún otro lenguaje. Es la capa de comunicación entre lo que el humano quiere y lo que la IA genera.

```nexus
@React @Tailwind
Page Dashboard
  Layout SplitView
  Section Resumen #glass
    Text "Ingresos" !bold
    Chart < DatosVentas
  Section Pedidos
    Table < Pedido [paginate:20]
      !error:500 -> /error/servidor
```

Diez líneas. Cero ambigüedad. La IA sabe exactamente qué construir.

## Por Qué Funciona

| Problema | Lenguaje Natural | NEXUS |
|---|---|---|
| Ambigüedad | Alta | Nula |
| Tokens necesarios | 100+ líneas | 8–12 líneas |
| Consistencia | Varía por sesión | Determinista |
| Reglas arquitectónicas | Implícitas | Validadas |
| Reutilización | Copy-paste | Archivos `.nexus` |

## No Solo Programación

NEXUS fue diseñado para código pero el problema que resuelve — ambigüedad en la comunicación con IA — existe en todas las industrias.

La comunidad está expandiendo el protocolo hacia diseño, marketing, procesos empresariales, legal y más. Si tu industria tiene el problema, NEXUS puede ser la solución.

## Instalación

```bash
# CLI global
npm install -g nxlang

# Librería para tus herramientas
npm install nxlang
```

**Requisitos:** Node.js ≥ 20.0.0

## Comandos CLI

```bash
# Inicializa NEXUS en tu proyecto
nexus init

# Valida tus archivos .nexus
nexus validate ./mi-componente.nexus
```

## La Gramática

- [Gramática completa](./docs/es/gramatica.md)
- [Diccionario de operadores](./docs/es/operadores.md)
- [Ejemplos reales](./docs/es/ejemplos.md)

## API de Librería

```typescript
import { validateNexus, buildSystemPrompt, createDefaultConfig } from 'nxlang'

// Validar sintaxis
const errores = validateNexus(contenido)

// Generar system prompt para la IA
const prompt = buildSystemPrompt(config)

// Crear configuración por defecto
const config = createDefaultConfig({ project: 'mi-app', modules: ['frontend'] })
```

## Ecosistema

| Herramienta | Descripción |
|---|---|
| [Prism](https://github.com/open-souse/prism) | Editor de código AI-native powered by nxlang |

## Roadmap

[Ver roadmap completo](./docs/es/roadmap.md)

- [x] **v4.0.0** — Núcleo modular, Library-First, 121 tests, seguridad defensiva
- [x] **v4.1.0** — `!error` handler, `[paginate]`, relaciones entre modelos, documentación completa
- [ ] **v4.5.0** — Motor semántico, CLI Doctor (cuando la comunidad lo pida)

## Contribuir

NEXUS es un estándar abierto. Tu contribución construye el futuro de la comunicación Humano-IA.

- [Guía de contribución](./CONTRIBUTING.es.md)
- [Proponer extensión del protocolo (RFC)](./docs/es/rfcs/RFC-0001-plantilla.md)
- [Código de conducta](./CODE_OF_CONDUCT.es.md)

```bash
git clone https://github.com/open-souse/Nexus.git
cd Nexus
npm install
npm run test
```

## Licencia

MIT — Desarrollado por [Edwin Realpe](https://github.com/edwinreal) · [open-souse](https://github.com/open-souse) · 2026

> "El futuro de la comunicación con IA no es escribir mejores prompts. Es tener un protocolo."
