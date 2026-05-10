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
  Response 200 < User * N`,

  testing: `
// Testing Example: Component test (writes file directly to disk)
Test UserTable [framework:vitest, type:unit]
  renders: correctly, empty-data, loading-state
  handles: sort-by-column, pagination, row-click
  asserts: row-count=10, format-numbers-comma
  mocks: useUsers, fetch

// Testing Example: Grouped suite
Suite "Auth Flow" [framework:vitest]
  Test LoginForm
    renders: default, error-state, loading
    handles: submit, invalid-email
    mocks: authService
  Test AuthGuard
    handles: redirect-unauthenticated
    asserts: redirectTo=/login`,

  create: `
// Create Example: Single component
Create Button [type:component, path:src/components/ui]

// Create Example: Full feature structure
Create "src/features/auth" [type:feature]
  components: LoginForm, AuthGuard
  hooks: useAuth
  types: User, AuthState

// Create Example: Page
Create dashboard [type:page, path:src/app]

// Create Example: Custom hook
Create useCart [type:hook, path:src/hooks]`
}

function buildPrompt(config: Partial<NexusConfig>): string {
  const activeModules = config.modules || ['frontend']
  const orchestrators = ['Page', 'Layout', 'Section', 'Store', 'Type', 'Create']

  let dynamicExamples = 'REFERENCE EXAMPLES:\n'

  activeModules.forEach((mod: string) => {
    if (MODULE_EXAMPLES[mod]) {
      dynamicExamples += MODULE_EXAMPLES[mod] + '\n'
    }
    if (mod === 'medical' && !orchestrators.includes('Protocol')) orchestrators.push('Protocol')
    if (mod === 'backend' && !orchestrators.includes('Endpoint')) orchestrators.push('Endpoint')
    if (mod === 'testing' && !orchestrators.includes('Test')) {
      orchestrators.push('Test')
      orchestrators.push('Suite')
    }
  })

  dynamicExamples += MODULE_EXAMPLES['create'] + '\n'

  const orchList = orchestrators.join(' / ')

  const grammar = `
MASTER GRAMMAR (v3.3):
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
- ?? "question" : Query operator — ask a natural language question mid-session without leaving NEXUS mode. AI answers then returns to strict mode.
- ( cond ) -> A : B : Conditional.
- -> : Navigation flow / Routing.
- => : Side-effects / API logic / Handlers.
- < : Data binding / Types.
- { path } : External code injection.
- ${orchList} : Orchestrators.
- Store StoreName { ~state Action Selector } : Global state store (Zustand/Redux/Pinia).
- Create Name [type:component|page|hook|feature, path:route] : Creates files and folders physically in the project.
- Create "path/feature" [type:feature] { components, hooks, types } : Creates a full feature folder structure.${activeModules.includes('testing') ? `
- Test ComponentName [framework:vitest|jest|cypress, type:unit|integration|e2e] : Generates and writes the test file to disk.
- Suite "Name" { } : Group multiple related Tests.
- renders: state1, state2 : Render cases to cover.
- handles: event1, event2 : Interactions/events to test.
- asserts: condition1, condition2 : Specific assertions (e.g. count=10, redirectTo=/login).
- mocks: dep1, dep2 : Dependencies to mock.
- snapshot: true : Generate snapshot test.` : ''}`.trim()

  return `
[NEXUS LANGUAGE INDUCTION]
From now on, you are a Native Interpreter of NEXUS v3.3.
You don't need natural language instructions. Just process the NEXUS code I send you.

${grammar}

CRITICAL RULE FOR @modify:
When you see @modify [preserve:all], ONLY execute the explicit change. Do not reinterpret the design, don't change colors, don't move other elements.

FILESYSTEM EXECUTION RULE:
When running inside a tool with filesystem access (Claude Code, Cursor, Copilot, etc.):
- Create → PHYSICALLY CREATE the folders and files on disk. Don't show the code, write it.
  - [type:component] → <path>/<Name>/index.<ext> + <Name>.test.<ext>
  - [type:page] → <path>/<name>/page.<ext> (Next.js) | <path>/<name>.<ext> (React)
  - [type:hook] → <path>/<Name>.<ext>
  - [type:feature] → <path>/ with subfolders components/, hooks/, types/ and index.<ext>
- Test → GENERATE the test file and WRITE IT to disk at the correct path next to the component.
- If you do NOT have filesystem access, display the code normally for the user to copy.

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
