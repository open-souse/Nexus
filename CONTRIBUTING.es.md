# Guía de Contribución — NEXUS Protocol

<p align="right"><a href="./CONTRIBUTING.md">🇺🇸 English version</a></p>

## Bienvenido

NEXUS es un estándar abierto. Cada contribución construye el futuro de la comunicación Humano-IA.

---

## Formas de Contribuir

### 1. Reportar un bug

Abre un issue con:
- Versión de nxlang (`npm list nxlang`)
- El archivo `.nexus` que causa el problema
- El error que ves
- El comportamiento que esperabas

### 2. Proponer una extensión del protocolo (RFC)

Las extensiones al protocolo siguen un proceso formal:

1. Abre un issue con el prefijo `[RFC]`
2. Usa la plantilla en [`docs/es/rfcs/RFC-0001-plantilla.md`](./docs/es/rfcs/RFC-0001-plantilla.md)
3. La comunidad discute durante **14 días mínimo**
4. Edwin Realpe (guardián del protocolo) aprueba o rechaza
5. Si se aprueba, se implementa en la siguiente versión minor

### 3. Mejorar la documentación

- Corregir errores en `docs/es/` o `docs/en/`
- Agregar ejemplos reales a `docs/es/ejemplos.md`
- Traducir a nuevos idiomas (crea `docs/XX/` siguiendo la estructura existente)

### 4. Contribuir código

```bash
git clone https://github.com/open-souse/Nexus.git
cd Nexus
npm install
npm run test        # los tests deben pasar
npm run build       # debe compilar sin errores
```

Crea tu branch:
```bash
git checkout -b feat/nombre-del-cambio
# o
git checkout -b fix/nombre-del-bug
```

**Reglas para PRs:**
- Los tests deben pasar (`npm run test`)
- El build debe completarse sin errores (`npm run build`)
- Si cambias la gramática, actualiza `core/grammar.ts`, `core/validator.ts`, `context/builder.ts` y los archivos de documentación correspondientes
- Si cambias operadores, agrega tests en `tests/`
- La documentación debe actualizarse en ambos idiomas

### 5. Expandir a nuevas industrias

Si usas NEXUS fuera de programación (diseño, marketing, legal, etc.) y quieres compartir tu gramática, abre un issue con el prefijo `[INDUSTRIA]` describiendo tu caso de uso.

---

## Lo que NO aceptamos

- Cambios que rompan compatibilidad hacia atrás sin RFC aprobado
- Código sin tests
- Documentación solo en un idioma (si agregas docs, agrega en ES y EN)
- Extensiones que conviertan NEXUS en un compilador o generador de código directo

---

## Proceso de Review

Los PRs son revisados en **máximo 7 días**. Si no hay respuesta en ese tiempo, menciona `@edwinreal` en el PR.

---

## Configuración de Desarrollo

```bash
# Instalar dependencias
npm install

# Correr tests (requiere Node ≥ 20)
npm run test

# Correr tests en modo watch
npx vitest

# Build
npm run build

# Lint
npm run lint
```

La suite completa corre en ~1 segundo. Si introduces un cambio que la hace más lenta, investiga antes de hacer PR.

---

## Código de Conducta

→ [Ver código de conducta](./CODE_OF_CONDUCT.es.md)

---

## Licencia

Al contribuir, aceptas que tu código se distribuye bajo la [licencia MIT](./LICENSE) del proyecto.
