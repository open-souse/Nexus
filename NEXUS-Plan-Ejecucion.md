# NEXUS - Plan de Ejecución — De la Idea a la Realidad
## Guía paso a paso para construir NEXUS los fines de semana

**Ventures SAS • 2026 • MIT License**

La meta: un CLI funcional que cualquier desarrollador pueda instalar con npm.
`npm install -g nexus-lang`

Desde ese momento pueden escribir `.nexus` y su IA de programación los entiende con mayor precisión usando prompts más cortos.
*Fines de semana. Paso a paso. Sin apresurarse. Con calidad desde el primer commit.*

---

## 1. Estado Actual del Proyecto
Antes de construir, es importante tener claro lo que ya existe y lo que falta.

### Qué ya existe
| Elemento | Estado |
| :--- | :--- |
| Repositorio en GitHub público | ✅ Listo |
| MIT License | ✅ Listo |
| README.md con visión y ejemplos | ✅ Listo |
| CONTRIBUTING.md | ✅ Listo |
| package.json base | ✅ Listo |
| tsconfig.json | ✅ Listo |
| .gitignore | ✅ Listo |
| nexus.config.json.example | ✅ Listo |
| GitHub Actions CI/CD | ✅ Listo |
| Templates de issues y PR | ✅ Listo |
| Plan Maestro documentado | ✅ Listo |

### Qué falta construir
| Elemento | Estado |
| :--- | :--- |
| Código del CLI (`init`, `add`, `list`, `config`) | ⏳ Pendiente |
| Parser de archivos `.nexus` | ⏳ Pendiente |
| 8 templates predefinidos | ⏳ Pendiente |
| Extensión de VS Code (syntax highlighting) | ⏳ Pendiente |
| Suite de tests con Vitest | ⏳ Pendiente |
| Publicación en npm | ⏳ Pendiente |
| Documentación completa en `/docs` | ⏳ Pendiente |
| Ejemplos reales en `/examples` | ⏳ Pendiente |

---

## 2. Estructura Completa a Construir

```text
nexus-lang/
  bin/
    nexus.js                    <- entry point del CLI (ejecutable)
  src/
    commands/
      init.ts                   <- nexus init
      add.ts                    <- nexus add <component>
      list.ts                   <- nexus list
      config.ts                 <- nexus config set/show
    templates/
      en/
        button.nexus            <- template button en inglés
        navbar.nexus            <- template navbar en inglés
        form.nexus              <- template form en inglés
        card.nexus              <- template card en inglés
        list.nexus              <- template list en inglés
        hero.nexus              <- template hero en inglés
        modal.nexus             <- template modal en inglés
        table.nexus             <- template table en inglés
      es/
        boton.nexus             <- template boton en español (v1.1)
        navegar.nexus           <- template navegar en español (v1.1)
    utils/
      config.ts                 <- leer/escribir nexus.config.json
      fileSystem.ts             <- operaciones de archivos
      logger.ts                 <- mensajes en consola con chalk
    index.ts                    <- punto de entrada principal
  vscode-extension/
    syntaxes/
      nexus.tmLanguage.json     <- syntax highlighting
    snippets/
      nexus.code-snippets       <- snippets principales
    package.json                <- manifest de la extensión
  tests/
    commands/
      init.test.ts
      add.test.ts
      list.test.ts
      config.test.ts
  docs/
    getting-started.md
    syntax-reference.md
    examples.md
  examples/
    landing-page/
    dashboard/
    contact-form/
  package.json
  tsconfig.json
  README.md
  CONTRIBUTING.md
  LICENSE
  nexus.config.json.example
```

---

## 3. Plan de Ejecución — Fines de Semana

**Regla de oro: producto funcional básico antes que producto perfecto.**
Cada fin de semana tiene un objetivo claro y un entregable concreto. Al terminar cada sesión debe existir algo que funciona — no solo código a medias. Si algo tarda más de lo esperado, se simplifica — no se salta.

### FS 1: Estructura base del CLI (2 días)
🎯 **Objetivo** — ejecutar `nexus --help` sin errores
- [ ] Crear estructura de carpetas — `bin/`, `src/commands/`, `src/utils/`, `tests/`
- [ ] Configurar `Commander.js` — el framework que maneja los comandos del CLI
- [ ] Implementar `nexus --version` — retorna la versión desde package.json
- [ ] Implementar `nexus --help` — muestra todos los comandos disponibles
- [ ] Primer test — verificar que el CLI arranca sin errores

### FS 2: Comando `nexus init` (2 días)
🎯 **Objetivo** — ejecutar `nexus init` y ver `nexus.config.json` creado
- [ ] Implementar `nexus init` — crea `nexus.config.json` con valores por defecto
- [ ] Implementar `nexus config set` — guarda valores en la configuración global
- [ ] Implementar `nexus config show` — muestra la configuración actual
- [ ] Usar `conf` para persistencia — guardar config globalmente entre sesiones
- [ ] Tests del comando init — crear y verificar `nexus.config.json`

### FS 3: Comando `nexus list` (2 días)
🎯 **Objetivo** — ejecutar `nexus list` y ver todos los templates disponibles
- [ ] Crear los 8 templates `.nexus` en inglés — button, navbar, form, card, list, hero, modal, table
- [ ] Implementar `nexus list` — muestra catálogo de templates con variantes disponibles
- [ ] Output visual con `chalk` — colores y formato legible en la terminal
- [ ] Tests de `nexus list` — verificar que muestra todos los templates correctamente

### FS 4: Comando `nexus add` (2 días)
🎯 **Objetivo** — ejecutar `nexus add button` y ver `button.nexus` creado
- [ ] Implementar `nexus add <component>` — copia el template al directorio de trabajo
- [ ] Soporte de variantes — `nexus add form --variant login`
- [ ] Feedback visual — spinner con `ora` + mensaje de éxito/error con `chalk`
- [ ] Manejo de errores — componente no existe, directorio no existe, etc.
- [ ] Tests de `nexus add` — crear componente, variante incorrecta, directorio inválido

### FS 5: Pulir CLI y primer MVP (2 días)
🎯 **Objetivo** — CLI completo y listo para usar en proyectos reales
- [ ] Probar CLI en un proyecto React real — CreatorForge o proyecto de prueba
- [ ] Corregir errores encontrados — los bugs que no aparecen en tests pero sí en uso real
- [ ] Mejorar mensajes de error — que sean claros y útiles para el usuario
- [ ] Mejorar output visual — colores, iconos, formato de la terminal
- [ ] Actualizar README — con el flujo real del CLI ya funcional

### FS 6: Extensión de VS Code (2 días)
🎯 **Objetivo** — instalar la extensión y ver `.nexus` con colores
- [ ] Crear `nexus.tmLanguage.json` — syntax highlighting para palabras clave de NEXUS
- [ ] Crear snippets principales — `nxbtn`, `nxform`, `nxnav`, `nxhero`, `nxcard`
- [ ] Crear `package.json` de la extensión — manifest con nombre, descripción y configuración
- [ ] Probar la extensión localmente — instalar en modo desarrollo y verificar
- [ ] Empaquetar la extensión — generar el `.vsix` listo para publicar

### FS 7: Tests completos y cobertura (2 días)
🎯 **Objetivo** — `npm run test` pasa al 100% sin errores
- [ ] Tests de todos los comandos — init, add, list, config — casos felices y errores
- [ ] Tests de templates — verificar que todos los `.nexus` tienen la sintaxis correcta
- [ ] Tests de casos de error — componente no existe, config inválida, etc.
- [ ] Configurar coverage — mínimo 80% de cobertura en funciones de negocio
- [ ] Verificar CI/CD — GitHub Actions pasa en el repositorio

### FS 8: Documentación y ejemplos (2 días)
🎯 **Objetivo** — cualquier desarrollador puede aprender NEXUS en 15 minutos
- [ ] `docs/getting-started.md` — instalación, primer componente, flujo completo
- [ ] `docs/syntax-reference.md` — referencia completa de todas las palabras clave
- [ ] `docs/examples.md` — ejemplos reales con antes/después para cada template
- [ ] `examples/` — 3 proyectos reales — landing page, dashboard, formulario de contacto
- [ ] Video de demo corto — gif o video de 30 segundos mostrando el flujo completo

### FS 9: Publicación en npm y VS Code Marketplace (2 días)
🎯 **Objetivo** — `npm install -g nexus-lang` funciona en cualquier PC del mundo
- [ ] Crear cuenta en npmjs.com — si no la tienes aún
- [ ] `npm publish` — publicar nexus-lang en el registro público de npm
- [ ] Verificar instalación global — probar en una PC limpia sin el repositorio
- [ ] Publicar extensión en VS Code Marketplace — NEXUS Language Support disponible públicamente
- [ ] Primer commit oficial — tag `v1.0.0` en GitHub con release notes completas

### FS 10: Lanzamiento a la comunidad (2 días)
🎯 **Objetivo** — primeros 50 usuarios reales usando NEXUS
- [ ] Post en dev.to — artículo con la historia de NEXUS y ejemplos reales
- [ ] Post en Hashnode — versión en español para la comunidad LATAM
- [ ] Compartir en Reddit — r/webdev, r/reactjs, r/programming
- [ ] Compartir en comunidades de Discord — servidores de React, TypeScript y IA
- [ ] Responder primeros issues — estar activo en GitHub los primeros días del lanzamiento

---

## 4. Cronograma Visual

| Fin de Semana | Qué construyes | Entregable concreto |
| :--- | :--- | :--- |
| FS 1 | Estructura base del CLI | `nexus --help` funciona |
| FS 2 | `nexus init` y `config` | `nexus.config.json` se crea correctamente |
| FS 3 | `nexus list` + 8 templates | catálogo de templates en la terminal |
| FS 4 | `nexus add` | `button.nexus` aparece en tu proyecto |
| FS 5 | Pulir CLI — MVP | CLI probado en un proyecto React real |
| FS 6 | Extensión VS Code | `.nexus` con syntax highlighting en el editor |
| FS 7 | Tests completos | `npm run test` pasa al 100% |
| FS 8 | Documentación | cualquier dev aprende NEXUS en 15 min |
| FS 9 | Publicación | `npm install -g nexus-lang` funciona worldwide |
| FS 10| Lanzamiento | primeros 50 usuarios reales |

**Tiempo total estimado: 10 fines de semana = aproximadamente 3 meses.**
Esto asume 8-10 horas de trabajo efectivo por fin de semana.
Si un fin de semana no puedes trabajar, el siguiente se retoma donde quedó.
La calidad es más importante que la velocidad — mejor hacerlo bien que hacerlo rápido.

---

## 5. Código Inicial — Por Dónde Empezar

Este es el código mínimo para arrancar el primer fin de semana. Copia esto, ponlo a funcionar y el resto viene naturalmente.

### 5.1 `bin/nexus.js` — Entry point
```javascript
#!/usr/bin/env node
require('../dist/index.js')
```

### 5.2 `src/index.ts` — CLI principal
```typescript
import { Command } from 'commander'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { listCommand } from './commands/list'
import { configCommand } from './commands/config'
import { version } from '../package.json'

const program = new Command()

program
  .name('nexus')
  .description('El lenguaje que hace que las IAs te entiendan mejor')
  .version(version)

program.addCommand(initCommand())
program.addCommand(addCommand())
program.addCommand(listCommand())
program.addCommand(configCommand())

program.parse()
```

### 5.3 `src/commands/init.ts` — primer comando
```typescript
import { Command } from 'commander'
import { writeFileSync, existsSync } from 'fs'
import chalk from 'chalk'

const DEFAULT_CONFIG = {
  lang: "en",
  output: "./src/components",
  framework: "react-ts",
  tokens: {
    primary: "blue-600",
    secondary: "gray-100",
    danger: "red-500",
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-md"
  }
}

export function initCommand(): Command {
  return new Command("init")
    .description("Inicializa NEXUS en tu proyecto")
    .action(() => {
      const configPath = "./nexus.config.json"

      if (existsSync(configPath)) {
        console.log(chalk.yellow("nexus.config.json ya existe"))
        return
      }

      writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2))
      console.log(chalk.green("nexus.config.json creado exitosamente"))
      console.log(chalk.gray("Edita el archivo para personalizar tu configuracion"))
    })
}
```

### 5.4 Primer template — `src/templates/en/button.nexus`
```nexus
// button.nexus — Template de Button para NEXUS
// Usa este archivo con tu IA de programacion favorita
// Claude Code, GitHub Copilot, Codex, Cursor

Button "Label"
  variant primary
  size medium
  Event click -> handleClick()

// Variantes disponibles:
// variant: primary | secondary | danger | ghost
// size: small | medium | large

// Ejemplo con todas las opciones:
// Button "Delete account"
//   variant danger
//   size large
//   Event click -> handleDelete()
```

### 5.5 Primer test — `tests/commands/init.test.ts`
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { existsSync, unlinkSync } from 'fs'
import { execSync } from 'child_process'

describe('nexus init', () => {
  const configPath = './nexus.config.json'

  afterEach(() => {
    if (existsSync(configPath)) unlinkSync(configPath)
  })

  it('crea nexus.config.json con valores por defecto', () => {
    execSync('npx tsx src/index.ts init')
    expect(existsSync(configPath)).toBe(true)
    const config = JSON.parse(require('fs').readFileSync(configPath, 'utf8'))
    expect(config.lang).toBe('en')
    expect(config.framework).toBe('react-ts')
  })

  it('no sobreescribe si ya existe', () => {
    execSync('npx tsx src/index.ts init')
    execSync('npx tsx src/index.ts init')
    // No debe lanzar error
    expect(existsSync(configPath)).toBe(true)
  })
})
```

---

## 6. Checklist Detallado por Fin de Semana

### Fin de semana 1 — Antes de terminar verifica:
- [ ] La carpeta `bin/` existe con `nexus.js`
- [ ] La carpeta `src/commands/` existe
- [ ] `npm run build` compila sin errores
- [ ] `npx nexus --version` muestra la versión
- [ ] `npx nexus --help` muestra los comandos
- [ ] El primer test pasa con `npm run test`
- [ ] Commit con mensaje: `feat: estructura base del CLI`

### Fin de semana 2 — Antes de terminar verifica:
- [ ] `nexus init` crea `nexus.config.json` correctamente
- [ ] `nexus config set lang es` guarda el cambio
- [ ] `nexus config show` muestra la configuración actual
- [ ] Si `nexus.config.json` ya existe, `init` no lo sobreescribe
- [ ] Tests de init y config pasan
- [ ] Commit con mensaje: `feat: comandos init y config`

### Fin de semana 3 — Antes de terminar verifica:
- [ ] Los 8 archivos `.nexus` existen en `src/templates/en/`
- [ ] `nexus list` muestra todos los templates con colores
- [ ] Cada template tiene comentarios explicando las variantes
- [ ] Tests de `nexus list` pasan
- [ ] Commit con mensaje: `feat: templates y comando list`

### Fin de semana 4 — Antes de terminar verifica:
- [ ] `nexus add button` crea `button.nexus` en el directorio actual
- [ ] `nexus add form --variant login` crea el template correcto
- [ ] El spinner de `ora` aparece mientras se procesa
- [ ] Mensaje de error claro si el componente no existe
- [ ] Tests de `nexus add` pasan incluyendo casos de error
- [ ] Commit con mensaje: `feat: comando add con variantes`

### Fin de semana 5 — MVP listo — verifica:
- [ ] Instalas NEXUS globalmente: `npm install -g .`
- [ ] Vas a un proyecto React diferente y ejecutas `nexus init`
- [ ] `nexus add navbar` funciona correctamente
- [ ] El archivo `.nexus` generado se lo pasas a Claude o Copilot y lo entiende
- [ ] El README refleja el flujo real del CLI
- [ ] Commit con mensaje: `feat: MVP del CLI listo y probado`

### Fin de semana 9 — Publicación — verifica:
- [ ] `npm publish` ejecutado sin errores
- [ ] `npm install -g nexus-lang` funciona en una PC limpia
- [ ] La extensión de VS Code está en el marketplace
- [ ] El tag `v1.0.0` está creado en GitHub
- [ ] El release en GitHub tiene notas completas
- [ ] El README tiene el badge de npm con la versión actual

---

## 7. Reglas de Oro del Proyecto

Estas reglas garantizan que NEXUS llegue a ser real y no quede a medias:
1. Cada fin de semana termina con algo que **FUNCIONA** — no con código a medias.
2. Si algo tarda más de lo esperado, se simplifica — no se salta.
3. El primer usuario de NEXUS eres tú — úsalo en CreatorForge y MOTIX.
4. Un test roto es más urgente que una nueva función.
5. El `README` es el producto — si no está claro, nadie lo usa.
6. Commits pequeños y frecuentes — mejor 10 commits pequeños que 1 gigante.
7. Cuando algo no funciona — simplifica, no compliques.
8. La comunidad empieza desde el primer día — responde issues aunque sean pocos.
9. v1.0 básico y funcional es mejor que v0.9 con mil features a medias.
10. Disfruta el proceso — NEXUS es tu aporte al ecosistema de IA y código.

---
*NEXUS — Plan de Ejecución — 2026 — Ventures SAS*
*10 fines de semana. Un lenguaje real. Para las IAs.*
