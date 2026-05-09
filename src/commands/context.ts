import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'

const EXAMPLES_ES = `
EJEMPLOS DE REFERENCIA:

// Ejemplo 1: Card simple
@React #Tailwind
Card #glass
  Text "Título" !bold
  Text "Descripción del contenido"
  Button "Ver más" #primary -> /detalle

// Ejemplo 2: Formulario de login
Form "login"
  field email    type:email    required
  field password type:password required
  Button "Ingresar" #primary => API.post(/auth) -> /dashboard
  ( ?error ) -> Text "Credenciales inválidas" !danger : null

// Ejemplo 3: Dashboard con stats
Page Dashboard
  Header #fixed
    Logo "MiApp" -> /
    UserMenu < { ./UserMenu.tsx }

  Grid [cols:3]
    StatCard #elevated * 3 < ["Ventas: $12k", "Usuarios: 500", "Tareas: 8"]

  Section "Actividad Reciente"
    Table #striped ?loading
      Row * 5 < User

// Ejemplo 4: Mover un elemento existente sin reinterpretar nada
@modify [preserve:all]
Card "resumen-credito" [position:move-to:1]

// Ejemplo 5: Agregar elemento nuevo heredando estilo de hermanos
@modify [preserve:all]
Form "login"
  Captcha [new, inherit:siblings]

// Ejemplo 6: Sombras en cascada padre-hijo (efecto flotante)
Section "hero" [shadow:elevated, cascade:children]
  Card * 3 [shadow:inherit]
`.trim()

const EXAMPLES_EN = `
REFERENCE EXAMPLES:

// Example 1: Simple card
@React #Tailwind
Card #glass
  Text "Title" !bold
  Text "Content description"
  Button "View more" #primary -> /detail

// Example 2: Login form
Form "login"
  field email    type:email    required
  field password type:password required
  Button "Login" #primary => API.post(/auth) -> /dashboard
  ( ?error ) -> Text "Invalid credentials" !danger : null

// Example 3: Dashboard with stats
Page Dashboard
  Header #fixed
    Logo "MyApp" -> /
    UserMenu < { ./UserMenu.tsx }

  Grid [cols:3]
    StatCard #elevated * 3 < ["Sales: $12k", "Users: 500", "Tasks: 8"]

  Section "Recent Activity"
    Table #striped ?loading
      Row * 5 < User

// Example 4: Move an existing element without changing anything else
@modify [preserve:all]
Card "credit-summary" [position:move-to:1]

// Example 5: Add a new element inheriting sibling styles
@modify [preserve:all]
Form "login"
  Captcha [new, inherit:siblings]

// Example 6: Cascading shadows parent-to-children (floating effect)
Section "hero" [shadow:elevated, cascade:children]
  Card * 3 [shadow:inherit]
`.trim()

function buildPrompt(lang: string, dna: string): string {
  const isEs = lang !== 'en'
  const examples = isEs ? EXAMPLES_ES : EXAMPLES_EN

  if (isEs) {
    return `
[NEXUS LANGUAGE INDUCTION]
A partir de ahora, eres un Intérprete Nativo de NEXUS v3.0.
No necesitas instrucciones en lenguaje humano. Solo procesa el código NEXUS que te envíe.

GRAMÁTICA MAESTRA (v3.0):
- Jerarquía: Sangría de 2 espacios.
- @ : Directivas (ej: @React, @CleanCode, @Layout).
- @modify [preserve:all] : Modo edición segura. El elemento YA EXISTE. Solo aplica los cambios indicados, NO toques colores, diseño ni elementos no mencionados.
  - preserve:all → no cambies absolutamente nada más.
  - preserve:styles → preserva solo los estilos.
  - preserve:layout → preserva solo las posiciones.
- # : Estilos/Tokens (Soporta herencia).
- $ : Variables de Intención / App State.
- * N : Multiplicador de elementos.
- ? : Estados (loading, error, auth).
- ! : Prioridad/Peso visual.
- [ ] : Atributos técnicos / Props.
- [new] : Marca un elemento como recién añadido. Solo créalo, no toques los demás.
- [inherit:siblings] : El elemento nuevo adopta el estilo visual de sus hermanos (colores, fuentes, bordes, sombras).
- [position:move-to:N] : Mueve el elemento a la posición N sin alterar su diseño ni el de los demás.
- [cascade:children] : Aplica el estilo del padre a todos sus hijos automáticamente.
- ( cond ) -> A : B : Condicional (ej: ( ?isAuth ) -> Dash : Login).
- -> : Flujo de Navegación / Routing.
- => : Lógica de Side-Effects / API / Handlers.
- < : Data Binding / Types (ej: List < User * 5).
- { path } : Inyección de código externo.
- Page / Layout / Section : Orquestadores de estructura.

REGLA CRÍTICA DE @modify:
Cuando veas @modify [preserve:all], SOLO ejecuta el cambio explícito. No reinterpretes el diseño, no cambies colores, no muevas otros elementos, no rediseñes nada que no esté marcado con [new] o indicado explícitamente.

${examples}

DNA DEL PROYECTO (Contexto Global):
${dna}

REGLA DE ORO:
Cuando recibas un bloque NEXUS, genera el código correspondiente de forma premium, limpia y responsive siguiendo el DNA. Si es un componente, usa export default. Si es una Page, usa la estructura de carpetas estándar. No des explicaciones, solo entrega el código.

¿LISTO? Responde: "NEXUS_SYSTEM_ONLINE"
    `.trim()
  }

  return `
[NEXUS LANGUAGE INDUCTION]
From now on, you are a Native Interpreter of NEXUS v3.0.
You don't need natural language instructions. Just process the NEXUS code I send you.

MASTER GRAMMAR (v3.0):
- Hierarchy: 2-space indentation.
- @ : Directives (e.g. @React, @CleanCode, @Layout).
- @modify [preserve:all] : Safe edit mode. The element ALREADY EXISTS. Only apply the indicated changes, do NOT touch colors, design or unmentioned elements.
  - preserve:all → don't change anything else.
  - preserve:styles → preserve styles only.
  - preserve:layout → preserve positions only.
- # : Design Tokens / Styles (supports inheritance).
- $ : Intention Variables / App State.
- * N : Element multiplier.
- ? : States (loading, error, auth).
- ! : Priority/Visual weight.
- [ ] : Technical attributes / Props.
- [new] : Marks an element as newly added. Only create it, don't touch the others.
- [inherit:siblings] : The new element adopts the visual style of its siblings (colors, fonts, borders, shadows).
- [position:move-to:N] : Moves the element to position N without altering its design or others.
- [cascade:children] : Applies parent styles to all children automatically.
- ( cond ) -> A : B : Conditional (e.g. ( ?isAuth ) -> Dash : Login).
- -> : Navigation flow / Routing.
- => : Side-effects / API logic / Handlers.
- < : Data binding / Types (e.g. List < User * 5).
- { path } : External code injection.
- Page / Layout / Section : Structure orchestrators.

CRITICAL RULE FOR @modify:
When you see @modify [preserve:all], ONLY execute the explicit change. Do not reinterpret the design, don't change colors, don't move other elements, don't redesign anything not marked with [new] or explicitly stated.

${examples}

PROJECT DNA (Global Context):
${dna}

GOLDEN RULE:
When you receive a NEXUS block, generate the corresponding code in a premium, clean and responsive way following the DNA. If it's a component, use export default. If it's a Page, use standard folder structure. No explanations, just deliver the code.

READY? Respond: "NEXUS_SYSTEM_ONLINE"
  `.trim()
}

export function contextCommand(): Command {
  return new Command('context')
    .description("Genera el 'Inductor de Lenguaje' para que la IA aprenda Nexus en un solo paso")
    .action(async () => {
      const spinner = ora('Generando Inductor de Lenguaje Nexus...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let dna = '{}'
        let lang = 'es'

        if (fs.existsSync(configPath)) {
          dna = await fs.readFile(configPath, 'utf8')
          try {
            const parsed = JSON.parse(dna)
            if (parsed.lang) lang = parsed.lang
          } catch { /* usa lang por defecto */ }
        }

        const inductionPrompt = buildPrompt(lang, dna)
        const isEs = lang !== 'en'

        spinner.succeed(chalk.green(isEs ? '¡Inductor de Lenguaje generado!' : 'Language Inductor generated!'))
        console.log(chalk.cyan(isEs
          ? '\nCopia este texto una sola vez al inicio de tu sesión con la IA:\n'
          : '\nCopy this text once at the start of your AI session:\n'
        ))
        console.log(inductionPrompt)
        console.log('\n')

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
