import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

const MODULE_EXAMPLES: Record<string, string> = {
  frontend: `
// Frontend: Card with logic
Card #glass
  Text "Title" !bold
  Button "View more" #primary -> /detail`,

  medical: `
// Medical: Triage Protocol
Protocol Triage
  Check "Vital Signs"
    Field heart_rate type:number
    Field saturation type:percent !critical
  Action "Assign Level" => calculateTriage() -> /patient-registration`,

  backend: `
// Backend: API Endpoint
Endpoint /api/users
  Auth [mode:jwt, role:admin]
  Method GET -> Service.findUsers()
  Response 200 < User * N`,

  testing: `
// Testing: Component test
Test UserTable [framework:vitest, type:unit]
  renders: correctly, empty-data, loading-state
  handles: sort-by-column, pagination, row-click
  asserts: row-count=10, format-numbers-comma
  mocks: useUsers, fetch

// Testing: Grouped suite
Suite "Auth Flow" [framework:vitest]
  Test LoginForm
    renders: default, error-state, loading
    handles: submit, invalid-email
    mocks: authService
  Test AuthGuard
    handles: redirect-unauthenticated
    asserts: redirectTo=/login`,

  create: `
// Create: Single component
Create Button [type:component, path:src/components/ui]

// Create: Full feature structure
Create "src/features/auth" [type:feature]
  components: LoginForm, AuthGuard
  hooks: useAuth
  types: User, AuthState

// Create: Page
Create dashboard [type:page, path:src/app]

// Create: Custom hook
Create useCart [type:hook, path:src/hooks]`
}

export function buildPrompt(config: Partial<NexusConfig>): string {
  const activeModules = config.modules || ['frontend']
  const orchestrators = ['Page', 'Layout', 'Section', 'Store', 'Type', 'Create']

  let dynamicExamples = 'EXAMPLES:\n'

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
NEXUS SYNTAX REFERENCE (v3.3):
- Indentation: 2 spaces per level.
- @ : Directives (e.g. @React, @CleanCode).
- @modify [preserve:all] : Safe edit — only apply the explicit change, nothing else.
- # : Design tokens / styles (supports inheritance).
- $ : Global variables / DNA constants.
- ~ : Local reactive state (useState/Signals).
- | : Responsive variants.
- * N : Repeat element N times.
- ? : UI states (loading, error, auth).
- ! : Priority / visual weight.
- [ ] : Technical attributes / props.
- [new] : Marks a newly added element.
- [locked] : Do not modify or regenerate this element.
- [inherit:siblings] : Inherit style from siblings.
- [position:move-to:N] : Move element to position N.
- [cascade:children] : Apply parent styles to children.
- [animate: type, duration: Xms] : Entry/exit animation.
- [hover: ...] : Hover/focus styles.
- [a11y: ...] : ARIA accessibility attributes.
- ?? "question" : I'm asking a quick question — answer briefly, then continue coding.
- ( cond ) -> A : B : Conditional rendering.
- -> : Navigation / routing.
- => : Side-effects / API calls / handlers.
- < : Data binding / types.
- { path } : Inject existing code or file.
- ${orchList} : Structure orchestrators.
- Store Name { ~state Action Selector } : Global state (Zustand/Redux/Pinia).
- Create Name [type:component|page|hook|feature, path:route] : Create files on disk.${activeModules.includes('testing') ? `
- Test Name [framework:vitest|jest|cypress, type:unit|integration|e2e] : Generate and write test file to disk.
- Suite "Name" { } : Group related tests.
- renders: state1, state2 : Render cases to cover.
- handles: event1, event2 : Interactions to test.
- asserts: condition : Specific assertions.
- mocks: dep1, dep2 : Dependencies to mock.` : ''}`.trim()

  return `
NEXUS NOTATION — v3.3

I write my development requests using NEXUS, a shorthand notation for UI, logic, and project structure.
This is the syntax reference. When I send you NEXUS, generate the implementation.

${grammar}

HOW TO HANDLE MY NEXUS INPUT:
- Generate clean, production-ready code following the project DNA below.
- No explanation needed unless I ask with ?? or in plain text.
- If something is ambiguous, ask me to clarify before generating.

@modify [preserve:all] rule:
Only apply the explicit change I describe. Do not reinterpret the design, move other elements, or change colors.

Create / Test rule (filesystem tools like Claude Code, Cursor, Copilot):
- Create → write the files and folders directly to disk, don't just show the code.
  - [type:component] → <path>/<Name>/index.<ext>
  - [type:page] → <path>/<name>/page.<ext> (Next.js) | <path>/<name>.<ext> (React)
  - [type:hook] → <path>/<Name>.<ext>
  - [type:feature] → <path>/ with subfolders components/, hooks/, types/ and index.<ext>
- Test → write the test file to disk next to the component.
- No filesystem access → show the code for me to copy.

${dynamicExamples}

PROJECT DNA:
${JSON.stringify(config, null, 2)}
  `.trim()
}

export function contextCommand(): Command {
  return new Command('context')
    .description('Generate the NEXUS notation reference for your AI session')
    .action(async () => {
      const spinner = ora('Generating NEXUS notation reference...').start()

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

        spinner.succeed(chalk.green('NEXUS notation reference generated!'))
        console.log(chalk.cyan('\nPaste this once at the start of your AI session:\n'))
        console.log(inductionPrompt)
        console.log('\n')

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
