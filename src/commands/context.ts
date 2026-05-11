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

  backend: `
@NestJS @Prisma @PostgreSQL

Model User
  Entity id type:uuid !pk
  Entity email type:string !unique
  Relation posts -> Post * N

Controller UserController [route:/api/users]
  Guard AuthGuard [mode:jwt]
  @RateLimit[100/min]
  Endpoint POST /register < Payload:UserSchema => UserService.create()
  Endpoint GET /profile @Auth => UserService.getProfile()`,

  testing: `
// Testing Frontend: Component test
Test UserTable [type:unit] Frontend
  renders: correctly, loading-state
  handles: sort-by-column, row-click
  asserts: row-count=10
  mocks: useUsers

// Testing Backend: API Endpoint test
Test UserController [type:integration] Backend
  handles: POST /users
  expects: status:201, body:user-schema
  db: user-created-in-db, auth-token-issued

// Testing: Grouped suite
Suite "Auth Flow" [framework:vitest]
  Test LoginForm [type:unit] Frontend
    renders: default, error-state
  Test AuthService [type:unit] Backend
    handles: login, register
    asserts: jwt-is-valid`,

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
    if (mod === 'backend') {
      ['Model', 'Controller', 'Middleware', 'Service', 'Endpoint', 'Worker', 'Queue', 'CronJob'].forEach(o => {
        if (!orchestrators.includes(o)) orchestrators.push(o)
      })
    }
    if (mod === 'testing' && !orchestrators.includes('Test')) {
      orchestrators.push('Test')
      orchestrators.push('Suite')
    }
  })

  dynamicExamples += MODULE_EXAMPLES['create'] + '\n'

  const orchList = orchestrators.join(' / ')

  const grammar = `
NEXUS SYNTAX REFERENCE (v4.0):
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
- !pk : Database primary key constraint.
- @Auth[mode:jwt] : Requires authentication for an endpoint or resource.
- @RateLimit[X/min] : Limits request frequency.
- ?? "question" : I'm asking a quick question — answer briefly, then continue coding.
- ( cond ) -> A : B : Conditional rendering.
- -> : Navigation / routing / relations.
- => : Side-effects / API calls / handlers.
- < : Data binding / types.
- { path } : Inject existing code or file.
- ${orchList} : Structure orchestrators.
- Store Name { ~state Action Selector } : Global state (Zustand/Redux/Pinia).
- Create Name [type:component|page|hook|feature, path:route] : Create files on disk.${activeModules.includes('testing') ? `
- Test Name [type:unit|e2e, framework:vitest|jest|cypress] : Define a test case. Use keywords Frontend or Backend to scope context.
- Suite "Name" { } : Group related tests.
- renders: state1, state2 : Render cases to cover (Frontend).
- handles: event1, event2 : Interactions to test.
- expects: status:200, body:schema : Backend expectations.
- asserts: condition : Specific assertions.
- db: change1, change2 : Database side-effects to verify (Backend).
- mocks: dep1, dep2 : Dependencies to mock.` : ''}`.trim()

  return `
NEXUS NOTATION — v4.0

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

const SLASH_COMMAND_CONTENT = `# NEXUS Context Refresh

Regenerate and reload the NEXUS notation reference for this session.

\`\`\`bash
npx nexus context
\`\`\`

After running, the NEXUS grammar and project DNA are reloaded from \`nexus.config.json\`.
Use this command whenever the AI seems to have forgotten NEXUS syntax.
`

export function contextCommand(): Command {
  return new Command('context')
    .description('Generate NEXUS.md with the NEXUS notation reference for AI context induction')
    .action(async () => {
      const spinner = ora('Generating NEXUS notation reference...').start()

      try {
        const cwd = process.cwd()
        const configPath = path.join(cwd, 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try {
            config = JSON.parse(content)
          } catch { /* use default */ }
        }

        const prompt = buildPrompt(config)
        const nexusMd = `# NEXUS Notation Reference\n\n${prompt}\n`

        // Write NEXUS.md — The universal context for AI models
        const nexusMdPath = path.join(cwd, 'NEXUS.md')
        await fs.writeFile(nexusMdPath, nexusMd, 'utf8')

        // Register /nexus slash command for mid-session refresh
        const slashDir = path.join(cwd, '.claude', 'commands')
        await fs.ensureDir(slashDir)
        await fs.writeFile(path.join(slashDir, 'nexus.md'), SLASH_COMMAND_CONTENT, 'utf8')

        spinner.succeed(chalk.green('NEXUS notation reference written to NEXUS.md'))
        console.log(chalk.cyan('\nYour AI context is ready in NEXUS.md.'))
        console.log(chalk.cyan('Use /nexus inside Claude Code to refresh context mid-session.\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
