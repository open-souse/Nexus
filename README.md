# 🌌 Protocolo NEXUS v4.0.0
### La Capa de Comunicación Humano-IA para Arquitecturas de Software Modernas

[![npm version](https://img.shields.io/npm/v/nxlang.svg?style=flat-square)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Maintenance](https://img.shields.io/badge/Mantenido%3F-sí-green.svg?style=flat-square)](https://github.com/edwinreal/Nexus-/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-bienvenidos-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**Deja de escribir prompts extensos. Escribe intenciones: menos líneas, cero ambigüedad.**

NEXUS es un protocolo taquigráfico nativo para IA que condensa arquitecturas complejas en fragmentos minimalistas. Elimina la verbosidad del lenguaje natural y garantiza que tu IA entienda exactamente qué construir desde la primera línea.

[Explorar la Gramática](./NEXUS-Grammar-es.md) · [Reportar Error](https://github.com/edwinreal/Nexus-/issues) · [Solicitar Función](https://github.com/edwinreal/Nexus-/issues)

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

### 📐 SDD: Documentos de Diseño de Software
Diseña todo tu sistema antes de escribir una sola línea de lógica. Define Actores, Sistemas, Requisitos y Flujos.

### 🧠 Motor Semántico Avanzado
Validación consciente del contexto. El motor sabe que un `Trigger` pertenece a una `Database` y una `Section` pertenece a una `Page`.

### 🩺 Doctor del Proyecto
Audita la alineación entre la configuración de tu proyecto (DNA) y tus archivos reales. Detecta dependencias faltantes y puntos de entrada rotos.

### 📦 Blueprints Inteligentes
Acceso instantáneo a plantillas de arquitectura listas para producción. Desde sistemas de autenticación hasta Dashboards Full-stack.

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
| `nexus validate` | Escaneo profundo de archivos `.nexus` buscando errores sintácticos y semánticos. |
| `nexus doctor` | Chequeo de salud para la alineación de tu proyecto y dependencias. |
| `nexus blueprints` | Lista y aplica plantillas arquitectónicas en segundos. |

---

## 💬 La Gramática NEXUS

### 1. Diseño y Arquitectura (SDD)
```nexus
System "GestorPedidos"
  architecture: Hexagonal
  Actor "DueñoTienda"
    can: gestionar-inventario, ver-reportes
  Requirement "Rendimiento"
    must: cargar-en-menos-de-200ms
```

### 2. Backend y Base de Datos
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

### 3. Frontend y UI
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

## 🛠️ Uso como Librería

NEXUS 4.0.0 es un motor "Library-First". Puedes integrarlo en tus propias extensiones de IDE, editores web o pipelines de CI/CD.

```typescript
import { validateNexus, buildPrompt, createDefaultConfig } from 'nxlang';

// Inicializar DNA
const dna = createDefaultConfig({ framework: 'next-ts' });

// Validar intenciones
const errors = validateNexus('Actor "Usuario" { Page Inicio }');

if (errors.length > 0) {
  console.error("Error arquitectónico detectado:", errors[0].message);
}

// Generar el prompt para tu LLM (Anthropic, OpenAI, etc.)
const systemPrompt = buildPrompt(dna);
```

---

## 🗺️ Hoja de Roadmap

- [x] **v4.0**: Rediseño Modular y Arquitectura Library-First.
- [x] **v4.0**: Módulo SDD, Motor Semántico y CLI Doctor.

---

## 🤝 Contribuir

Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas es **muy apreciada**.

1. Haz un Fork del Proyecto
2. Crea tu Rama de Característica (`git checkout -b feature/NuevaMejora`)
3. Haz un Commit de tus Cambios (`git commit -m 'Añadir NuevaMejora'`)
4. Haz un Push a la Rama (`git push origin feature/NuevaMejora`)
5. Abre un Pull Request

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Mira `LICENSE` para más información.

Desarrollado con ❤️ por **[Edwin Realpe](https://github.com/edwinreal)** — *2026 Ventures SAS*
