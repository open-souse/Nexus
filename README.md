# NEXUS: Human-AI Language Protocol

[![CI](https://github.com/edwinreal/Nexus-/actions/workflows/ci.yml/badge.svg)](https://github.com/edwinreal/Nexus-/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/nxlang.svg)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Deja de escribir "prompts". Empieza a escribir intenciones.**

Así como los lenguajes de programación simplificaron la comunicación humano-máquina, NEXUS simplifica la comunicación humano-IA. Una gramática estructurada que la IA interpreta de forma exacta, sin ambigüedad, sin distorsión.

---

## El Problema

Comunicarle una idea a una IA en lenguaje natural es impreciso. La IA distorsiona, adivina, o pide aclaraciones constantes. El resultado rara vez es el esperado al primer intento.

**NEXUS es la capa de abstracción.** Una gramática concisa que la IA entiende de forma nativa.

---

## Instalación

```bash
npm install -g nxlang
```

> Requiere Node.js >= 18

---

## Cómo funciona

### 1. Inicializa tu proyecto

```bash
nexus init
```

NEXUS te hace preguntas sobre tu framework, colores e iconos, y genera un `nexus.config.json` personalizado — el DNA de tu proyecto. La IA lo usará como contexto global en cada sesión.

### 2. Induce a la IA

```bash
nexus context
```

Genera el prompt maestro con la gramática completa y ejemplos. Cópialo y pégalo al inicio de tu sesión con Claude, GPT-4 o Gemini. La IA responderá: `NEXUS_SYSTEM_ONLINE`.

## ⚙️ Configuración Global

Nexus te permite guardar preferencias que persisten en toda tu computadora:

*   **Ver tu configuración actual:**
    ```bash
    nexus config show
    ```
*   **Establecer un valor global:**
    ```bash
    nexus config set <clave> <valor>
    ```
    *Ejemplo: `nexus config set author "2026 Ventures SAS"`*

---

## 💬 Cómo hablar en NEXUS (Shorthand)

Una vez inducida la IA, escribe directamente en sintaxis NEXUS:

```nexus
@React #Tailwind
Card #glass
  Text "Hola Mundo" !bold
  Button "Aceptar" #primary -> /dashboard
```

La IA entrega el código exacto siguiendo tu DNA.

### 3. Valida tus archivos

```bash
nexus validate ./mi-componente.nexus
```

Verifica la sintaxis antes de enviársela a la IA.

---

## 📖 Gramática Maestra (v3.1)

| Operador | Significado | Ejemplo |
|---|---|---|
| `@` | Directivas de entorno | `@React`, `@CleanCode` |
| `#` | Design Tokens / Estilos | `Button #primary #glass` |
| `$` | Variables Globales / DNA | `$brand: "Nexus"` |
| `~` | Estado Local / Reactividad | `~isOpen: false`, `~count: 0` |
| `|` | Adaptabilidad (Responsive) | `Grid [cols:1 \| cols:3]` |
| `* N` | Multiplicador de elementos | `Card * 3` |
| `?` | Estados UI | `?loading`, `?error` |
| `!` | Prioridad / Énfasis | `Text !bold !danger` |
| `[locked]` | **Componente Protegido** | `Navbar [locked]` |
| `[ ]` | Atributos técnicos | `Grid [cols:3]` |
| `->` | Flujo de navegación | `-> /dashboard` |
| `=>` | Side-effects / API | `=> login()` |
| `<` | Data binding / Types | `Table < User` |
| `{ }` | Inyección de contexto | `{ ./UserCard.tsx }` |
| `( cond ) -> A : B` | Condicional de intención | `( ?auth ) -> Home : Login` |
| `@modify [preserve:all]` | **Intervención Mínima** | La IA solo entrega el fragmento modificado |

Ver gramática completa en [NEXUS-Grammar.md](./NEXUS-Grammar.md).

---

## Comandos CLI

| Comando | Descripción |
|---|---|
| `nexus init` | Inicializa `nexus.config.json` (Soporta módulos: Frontend, Medical, etc.) |
| `nexus context` | Genera el inductor de lenguaje modular para la IA |
| `nexus validate <file>` | Valida la sintaxis de un archivo .nexus |
| `nexus examples list` | Lista ejemplos de blueprints disponibles |
| `nexus doctor` | Diagnostica el estado de tu configuración |
| `nexus config set <key> <value>` | Guarda configuración global |
| `nexus config show` | Muestra la configuración actual |

---

## Desarrollo local

```bash
git clone https://github.com/edwinreal/Nexus-.git
cd Nexus-
npm install
npm run build    # Compila TypeScript a dist/
npm test         # Corre los tests
npm install -g . # Instala el CLI globalmente
```

---

## Visión

NEXUS nació enfocado en frontend, pero la visión es más amplia: convertirse en el estándar de comunicación Humano-IA para cualquier dominio. Un lenguaje abierto, universal y construido por la comunidad.

---

## Contribuir

NEXUS es un estándar abierto. Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para saber cómo participar.

**Licencia MIT** — Desarrollado por [Edwin Realpe](https://github.com/edwinreal)
