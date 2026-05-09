import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

const MODULE_EXAMPLES: Record<string, string> = {
  frontend: `
// Frontend Example: Card with logic
Card #glass
  Text "Title" !bold
  Button "View more" #primary -> /detail`,
  medical: `
// Medical Example: Triage Protocol
Protocol Triage
  Check "Vital Signs"
    Field heart_rate type:number
    Field saturation type:percent !critical
  Action "Assign Level" => calculateTriage() -> /patient-registration`,
  backend: `
// Backend Example: API Endpoint
Endpoint /api/users
  Auth [mode:jwt, role:admin]
  Method GET -> Service.findUsers()
  Response 200 < User * N`
}

function buildPrompt(config: Partial<NexusConfig>): string {
  const activeModules = config.modules || ['frontend']
  const orchestrators = ['Page', 'Layout', 'Section', 'Store', 'Type']

  let dynamicExamples = 'REFERENCE EXAMPLES:\n'

  activeModules.forEach((mod: string) => {
    if (MODULE_EXAMPLES[mod]) {
      dynamicExamples += MODULE_EXAMPLES[mod] + '\n'
    }
    if (mod === 'medical' && !orchestrators.includes('Protocol')) orchestrators.push('Protocol')
    if (mod === 'backend' && !orchestrators.includes('Endpoint')) orchestrators.push('Endpoint')
  })

  const orchList = orchestrators.join(' / ')

  return `
[NEXUS LANGUAGE INDUCTION]
From now on, you are a Native Interpreter of NEXUS v3.2.
You don't need natural language instructions. Just process the NEXUS code I send you.

MASTER GRAMMAR (v3.2):
- Hierarchy: 2-space indentation.
- @ : Directives (e.g. @React, @CleanCode).
- @modify [preserve:all] : Safe edit mode. Only return the modified fragment.
- # : Design Tokens / Styles (supports inheritance).
- $ : Global Variables / DNA.
- ~ : Local State / Reactivity (useState/Signals).
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
- [animate: type, duration: Xms] : Entry/exit animation (e.g. fade-in, slide-up, stagger).
- [hover: ...] : Hover/focus styles or behavior (e.g. [hover: scale-105]).
- [a11y: ...] : ARIA accessibility attributes (e.g. [a11y: aria-label="Close", role="dialog"]).
- ( cond ) -> A : B : Conditional.
- -> : Navigation flow / Routing.
- => : Side-effects / API logic / Handlers.
- < : Data binding / Types.
- { path } : External code injection.
- ${orchList} : Orchestrators.
- Store StoreName { ~state Action Selector } : Global state store (Zustand/Redux/Pinia).

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
    .description("Generates the NEXUS Language Inductor for your AI session")
    .action(async () => {
      const spinner = ora('Generating NEXUS Language Inductor...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try {
            config = JSON.parse(content)
          } catch { /* use default */ }
        }

        const inductionPrompt = buildPrompt(config)

        spinner.succeed(chalk.green('Language Inductor generated!'))
        console.log(chalk.cyan('\nCopy this text once at the start of your AI session:\n'))
        console.log(inductionPrompt)
        console.log('\n')

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
