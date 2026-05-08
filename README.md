# NEXUS: Human-AI Language Protocol

**Deja de escribir "prompts". Empieza a escribir intenciones.**

Así como los lenguajes de programación simplificaron la comunicación humano-máquina, NEXUS simplifica la comunicación humano-IA. Una gramática estructurada que la IA interpreta de forma exacta, sin ambigüedad, sin distorsión.

---

## El Problema

Comunicarle una idea a una IA en lenguaje natural es impreciso. La IA distorsiona, adivina, o pide aclaraciones constantes. El resultado rara vez es el esperado al primer intento.

**NEXUS es la capa de abstracción.** Una gramática concisa que la IA entiende de forma nativa.

---

## Cómo funciona

### 1. Instalación

```bash
npm install -g .
```

### 2. Inicializa tu proyecto

```bash
nexus init
```

Crea `nexus.config.json` con el DNA de tu proyecto: framework, colores, tipografía. La IA lo usará como contexto global en cada sesión.

### 3. Induce a la IA

```bash
nexus context
```

Genera el prompt maestro. Cópialo y pégalo al inicio de tu sesión con Claude, GPT-4 o Gemini. La IA responderá: `NEXUS_SYSTEM_ONLINE`.

### 4. Habla en NEXUS

```nexus
@React #Tailwind
Card #glass
  Text "Hola Mundo" !bold
  Button "Aceptar" #primary -> /dashboard
```

La IA entrega el código exacto siguiendo tu DNA.

---

## Gramática Maestra (v2.5)

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

Ver gramática completa en [NEXUS-Grammar.md](./NEXUS-Grammar.md).

---

## Comandos CLI

| Comando | Descripción |
|---|---|
| `nexus init` | Inicializa `nexus.config.json` en tu proyecto |
| `nexus context` | Genera el inductor de lenguaje para la IA |
| `nexus config set <key> <value>` | Guarda configuración global |
| `nexus config show` | Muestra la configuración actual |

---

## Visión

NEXUS nació enfocado en frontend, pero la visión es más amplia: convertirse en el estándar de comunicación Humano-IA para cualquier dominio. Un lenguaje abierto, universal y construido por la comunidad.

---

## Contribuir

NEXUS es un estándar abierto. Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para saber cómo participar.

**Licencia MIT** — Desarrollado por [Edwin Realpe](https://github.com/edwinreal)
