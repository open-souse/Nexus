# 🌌 Protocolo NEXUS v4.0.0
### La Capa de Comunicación Humano-IA para Arquitecturas de Software Modernas

[![npm version](https://img.shields.io/npm/v/nxlang.svg?style=flat-square)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg?style=flat-square)](./LICENSE)

**Deja de escribir prompts extensos. Escribe intenciones: menos líneas, cero ambigüedad.**

NEXUS es un protocolo taquigráfico nativo para IA que condensa arquitecturas complejas en fragmentos minimalistas. Elimina la verbosidad del lenguaje natural y garantiza que tu IA entienda exactamente qué construir desde la primera línea.

[Explorar la Gramática](./NEXUS-Grammar.md) · [Reportar Error](https://github.com/edwinreal/Nexus-/issues) · [Solicitar Función](https://github.com/edwinreal/Nexus-/issues)

---

## 💡 ¿Por qué NEXUS?

El lenguaje natural es hermoso para la poesía, pero peligroso para el software. Los prompts vagos conducen a código alucinado, patrones inconsistentes y desperdicio de tokens.

**NEXUS** soluciona esto proporcionando:
- 🎯 **Cero Ambigüedad**: Sintaxis estricta que los modelos de IA entienden con un 99% de precisión.
- 🏗️ **DNA Arquitectónico**: Consciencia integrada de tus frameworks, estilos y estándares.
- ⚡ **Eficiencia de Tokens**: Di en 10 líneas de NEXUS lo que requeriría 100 líneas de lenguaje natural.
- 🛡️ **Reglas Semánticas**: Evita arquitecturas "imposibles" antes incluso de generar el código.

---

## ✨ Características Clave (v4.0.0)

### 🧠 Motor Semántico
Validación inteligente consciente del contexto. El motor reconoce jerarquías entre componentes de Frontend y Backend.

### 🏗️ Arquitectura Library-First
NEXUS v4.0.0 está diseñado para ser integrado en tus propias herramientas, editores e IDEs.

---

## 📥 Instalación

```bash
# CLI Global para tu terminal
npm install -g nxlang

# Como librería núcleo para tus propias herramientas de IA
npm install nxlang
```

---

## ⌨️ Comandos del CLI

NEXUS está diseñado para ser tu compañero en la terminal.

| Comando | Descripción |
|:---|:---|
| `nexus init` | Crea el **DNA** (`nexus.config.json`) y genera el contexto para la IA (`NEXUS.md`). |
| `nexus validate` | Escaneo profundo de archivos `.nexus` buscando errores sintácticos. |

---

## 💬 La Gramática NEXUS

### 1. Backend y Base de Datos
```nexus
Model Pedido
  Entity id !pk
  Entity estado default:pendiente
  Index estado [type:hash]

Controller PedidoController
  policy: esta-autenticado
  Router ApiV1
    Endpoint POST /checkout < Payload:PedidoSchema => PedidoService.procesar()
```

### 2. Frontend y UI
```nexus
Page Dashboard
  Layout SplitView
  Section Resumen #glass
    Text "Ingresos" !bold
    Chart < DatosVentas
  Section Pedidos
    Table < Pedido
```

---

## 🗺️ Roadmap

- [x] **v4.0**: Rediseño Modular y Arquitectura Library-First.
- [ ] **v4.5**: Módulo SDD, Motor Semántico y CLI Doctor.

---

## 🤝 Contribuir

NEXUS es un estándar abierto. Read [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to participate.

**Licencia MIT** — Desarrollado por [Edwin Realpe](https://github.com/edwinreal)
