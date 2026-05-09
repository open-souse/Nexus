# NEXUS: Human-AI Language Protocol

[![CI](https://github.com/edwinreal/Nexus-/actions/workflows/ci.yml/badge.svg)](https://github.com/edwinreal/Nexus-/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/nexuslang.svg)](https://www.npmjs.com/package/nexuslang)
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
npm install -g nexuslang
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

## 📖 Gramática Maestra (v3.0)

- `@` : Directivas de Entorno / Comportamiento.
- `#` : Design Tokens (Estilos).
- `$` : Variables de Intención / App State.
- `* N` : Multiplicador de elementos.
- `?` : Gestión de Estados (loading, error, auth).
- `!` : Prioridad / Peso visual.
- `->` : Flujo de Navegación / Routing.
- `=>` : Lógica de Side-Effects / API / Handlers.
- `<` : Data Binding & Types.
- `{ }` : Inyección de Contexto Externo.
- `Page / Layout / Section` : Orquestadores de estructura.

---

## Gramática Maestra (v2.6)

| Operador | Significado |
|---|---|
| `@` | Directivas de entorno (`@React`, `@CleanCode`) |
| `#` | Design Tokens / Estilos |
| `$` | Variables de intención |
| `* N` | Multiplicador de elementos |
| `?` | Estados (`?loading`, `?error`) |
| `!` | Prioridad / Énfasis |
| `[ ]` | Atributos técnicos |
| `->` | Flujo de navegación |
| `=>` | Side-effects / API |
| `<` | Data binding / Types |
| `{ }` | Inyección de contexto externo |
| `( cond ) -> A : B` | Condicional de intención |
| `@modify [preserve:all]` | Edición segura — solo aplica el cambio indicado |
| `[new]` + `[inherit:siblings]` | Elemento nuevo que hereda el estilo de sus hermanos |
| `[position:move-to:N]` | Mueve un elemento sin alterar nada más |
| `[cascade:children]` | Aplica estilos del padre a todos sus hijos |

Ver gramática completa en [NEXUS-Grammar.md](./NEXUS-Grammar.md).

---

## Comandos CLI

| Comando | Descripción |
|---|---|
| `nexus init` | Inicializa `nexus.config.json` en tu proyecto (interactivo) |
| `nexus context` | Genera el inductor de lenguaje para la IA |
| `nexus validate <file>` | Valida la sintaxis de un archivo .nexus |
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
>>>>>>> origin/claude/analyze-nexus-project-O3nnK
