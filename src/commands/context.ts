import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'

const EXAMPLES = `
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

export function contextCommand(): Command {
  return new Command("context")
    .description("Genera el 'Inductor de Lenguaje' para que la IA aprenda Nexus en un solo paso")
    .action(async () => {
      const spinner = ora('Generando Inductor de Lenguaje Nexus...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let dna = '{}'
        if (fs.existsSync(configPath)) {
          dna = await fs.readFile(configPath, 'utf8')
        }

        const inductionPrompt = `
[NEXUS LANGUAGE INDUCTION]
A partir de ahora, eres un Intérprete Nativo de NEXUS v2.6.
No necesitas instrucciones en lenguaje humano. Solo procesa el código NEXUS que te envíe.

GRAMÁTICA MAESTRA (v2.6):
- Jerarquía: Sangría de 2 espacios.
- @ : Directivas (ej: @React, @CleanCode).
- @modify [preserve:all] : Modo edición segura. El elemento YA EXISTE. Solo aplica los cambios indicados, NO toques colores, diseño ni elementos no mencionados.
  - preserve:all → no cambies absolutamente nada más.
  - preserve:styles → preserva solo los estilos.
  - preserve:layout → preserva solo las posiciones.
- # : Estilos/Tokens (Soporta herencia).
- $ : Variables de Intención.
- * N : Multiplicador de elementos.
- ? : Estados (loading, error, etc).
- ! : Prioridad/Peso.
- [ ] : Atributos técnicos.
- [new] : Marca un elemento como recién añadido. Solo créalo, no toques los demás.
- [inherit:siblings] : El elemento nuevo adopta el estilo visual de sus hermanos (colores, fuentes, bordes, sombras).
- [position:move-to:N] : Mueve el elemento a la posición N sin alterar su diseño ni el de los demás.
- [cascade:children] : Aplica el estilo del padre a todos sus hijos automáticamente.
- ( cond ) -> A : B : Condicional (ej: ( ?isAuth ) -> Dash : Login).
- -> : Flujo de Navegación.
- => : Lógica de Side-Effects / API.
- < : Data Binding / Types (ej: List < User * 5).
- { path } : Inyección de código externo.
- Icon : Iconografía semántica.

REGLA CRÍTICA DE @modify:
Cuando veas @modify [preserve:all], SOLO ejecuta el cambio explícito. No reinterpretes el diseño, no cambies colores, no muevas otros elementos, no rediseñes nada que no esté marcado con [new] o indicado explícitamente.

${EXAMPLES}

DNA DEL PROYECTO (Contexto Global):
${dna}

REGLA DE ORO:
Cuando recibas un bloque NEXUS, genera el código correspondiente de forma premium, limpia y responsive siguiendo el DNA. No des explicaciones, solo entrega el código.

¿LISTO? Responde: "NEXUS_SYSTEM_ONLINE"
        `.trim()

        spinner.succeed(chalk.green('¡Inductor de Lenguaje generado!'))
        console.log(chalk.cyan('\nCopia este texto una sola vez al inicio de tu sesión con la IA:\n'))
        console.log(inductionPrompt)
        console.log('\n')

      } catch (error: any) {
        spinner.fail(chalk.red(`Error: ${error.message}`))
      }
    })
}
