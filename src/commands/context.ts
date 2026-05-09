import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

const MODULE_EXAMPLES: Record<string, Record<string, string>> = {
  frontend: {
    es: `
// Ejemplo Frontend: Card con lógica
Card #glass
  Text "Título" !bold
  Button "Ver más" #primary -> /detalle`,
    en: `
// Frontend Example: Card with logic
Card #glass
  Text "Title" !bold
  Button "View more" #primary -> /detail`
  },
  medical: {
    es: `
// Ejemplo Medicina: Protocolo de Triaje
Protocol Triaje
  Check "Signos Vitales"
    Field frecuencia_cardiaca type:number
    Field saturación type:percent !critical
  Action "Asignar Nivel" => calcularTriaje() -> /registro-paciente`,
    en: `
// Medical Example: Triage Protocol
Protocol Triage
  Check "Vital Signs"
    Field heart_rate type:number
    Field saturation type:percent !critical
  Action "Assign Level" => calculateTriage() -> /patient-registration`
  },
  backend: {
    es: `
// Ejemplo Backend: Endpoint de API
Endpoint /api/users
  Auth [mode:jwt, role:admin]
  Method GET -> Service.findUsers()
  Response 200 < User * N`,
    en: `
// Backend Example: API Endpoint
Endpoint /api/users
  Auth [mode:jwt, role:admin]
  Method GET -> Service.findUsers()
  Response 200 < User * N`
  }
}

function buildPrompt(config: Partial<NexusConfig>): string {
  const lang = config.lang || 'es'
  const isEs = lang !== 'en'
  const activeModules = config.modules || ['frontend']
  
  let dynamicExamples = isEs ? 'EJEMPLOS DE REFERENCIA:\n' : 'REFERENCE EXAMPLES:\n'
  let orchestrators = ['Page', 'Layout', 'Section']

  activeModules.forEach((mod: string) => {
    if (MODULE_EXAMPLES[mod]) {
      dynamicExamples += MODULE_EXAMPLES[mod][isEs ? 'es' : 'en'] + '\n'
    }
    // Añadir orquestadores específicos por módulo si existen
    if (mod === 'medical' && !orchestrators.includes('Protocol')) orchestrators.push('Protocol')
    if (mod === 'backend' && !orchestrators.includes('Endpoint')) orchestrators.push('Endpoint')
  })

  const orchList = orchestrators.join(' / ')

  const grammar_es = `
GRAMÁTICA MAESTRA (v3.1):
- Jerarquía: Sangría de 2 espacios.
- @ : Directivas (ej: @React, @CleanCode, @Layout).
- @modify [preserve:all] : Modo edición segura. Solo entrega el fragmento modificado.
- # : Estilos/Tokens (Soporta herencia).
- $ : Variables Globales / DNA.
- ~ : Estado Local / Reactividad.
- | : Adaptabilidad / Responsive.
- * N : Multiplicador de elementos.
- ? : Estados (loading, error, auth).
- ! : Prioridad/Peso visual.
- [ ] : Atributos técnicos / Props.
- [new] : Marca un elemento como recién añadido.
- [locked] : El elemento está PROTEGIDO. Prohibido modificarlo o regenerarlo.
- [inherit:siblings] : Adopta el estilo de sus hermanos.
- [position:move-to:N] : Mueve el elemento a la posición N.
- [cascade:children] : Aplica el estilo del padre a los hijos.
- ( cond ) -> A : B : Condicional.
- -> : Flujo de Navegación / Routing.
- => : Lógica de Side-Effects / API / Handlers.
- < : Data Binding / Types.
- { path } : Inyección de código externo.
- ${orchList} : Orquestadores.`.trim()

  const grammar_en = `
MASTER GRAMMAR (v3.1):
- Hierarchy: 2-space indentation.
- @ : Directives (e.g. @React, @CleanCode).
- @modify [preserve:all] : Safe edit mode. Only return the modified fragment.
- # : Design Tokens / Styles (supports inheritance).
- $ : Global Variables / DNA.
- ~ : Local State / Reactivity.
- | : Adaptability / Responsive.
- * N : Element multiplier.
- ? : States (loading, error, auth).
- ! : Priority/Visual weight.
- [ ] : Technical attributes / Props.
- [new] : Marks an element as newly added.
- [locked] : Element is PROTECTED. Forbidden to modify or regenerate it.
- [inherit:siblings] : Adopts sibling styles.
- [position:move-to:N] : Moves element to position N.
- [cascade:children] : Applies parent styles to children.
- ( cond ) -> A : B : Conditional.
- -> : Navigation flow / Routing.
- => : Side-effects / API logic / Handlers.
- < : Data binding / Types.
- { path } : External code injection.
- ${orchList} : Orchestrators.`.trim()

  if (isEs) {
    return `
[NEXUS LANGUAGE INDUCTION]
A partir de ahora, eres un Intérprete Nativo de NEXUS v3.1.
No necesitas instrucciones en lenguaje humano. Solo procesa el código NEXUS que te envíe.

${grammar_es}

REGLA CRÍTICA DE @modify:
Cuando veas @modify [preserve:all], SOLO ejecuta el cambio explícito. No reinterpretes el diseño, no cambies colores, no muevas otros elementos.

${dynamicExamples}

DNA DEL PROYECTO (Contexto Global):
${JSON.stringify(config, null, 2)}

REGLA DE ORO:
Genera código premium, limpio y responsive siguiendo el DNA. No des explicaciones, solo entrega el código.

¿LISTO? Responde: "NEXUS_SYSTEM_ONLINE"
    `.trim()
  }

  return `
[NEXUS LANGUAGE INDUCTION]
From now on, you are a Native Interpreter of NEXUS v3.1.
You don't need natural language instructions. Just process the NEXUS code I send you.

${grammar_en}

CRITICAL RULE FOR @modify:
When you see @modify [preserve:all], ONLY execute the explicit change. Do not reinterpret the design, don't change colors, don't move other elements.

${dynamicExamples}

PROJECT DNA (Global Context):
${JSON.stringify(config, null, 2)}

GOLDEN RULE:
Generate premium, clean and responsive code following the DNA. No explanations, just deliver the code.

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
        let config: Partial<NexusConfig> = { lang: 'es', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try {
            config = JSON.parse(content)
          } catch { /* usa por defecto */ }
        }

        const inductionPrompt = buildPrompt(config)
        const isEs = config.lang !== 'en'

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
