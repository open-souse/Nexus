import type { NexusConfig } from '../types/nexus.js'
import { NEXUS_MODULES, NEXUS_VERSION } from '../core/grammar.js'

export type NexusProvider = 'llm' | 'gpt' | 'gemini'

const PROVIDER_HEADERS: Record<NexusProvider, string> = {
  llm: 'You are a coding assistant. The user writes requests in NEXUS notation — a structured shorthand for UI, logic, and project structure. Parse NEXUS input and generate the implementation.',
  gpt: 'You are a precise coding assistant. The user communicates using NEXUS notation, a structured DSL for describing UI components, logic, and project structure. Interpret NEXUS syntax and generate the corresponding implementation.',
  gemini: 'You are a coding assistant that understands NEXUS notation — a shorthand language for describing UI, logic, and code structure. When the user writes NEXUS, generate the implementation code.'
}

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

function buildOrchestratorList(activeModules: string[]): string {
  const orchestrators: string[] = []
  activeModules.forEach((mod: string) => {
    const module = NEXUS_MODULES.find(m => m.id === mod)
    if (module) {
      module.orchestrators.forEach(o => {
        if (!orchestrators.includes(o)) orchestrators.push(o)
      })
    }
  })
  if (!orchestrators.includes('Create')) orchestrators.push('Create')
  return orchestrators.join(' / ')
}

function buildModuleExamples(activeModules: string[]): string {
  let examples = 'EXAMPLES:\n'
  activeModules.forEach((mod: string) => {
    if (MODULE_EXAMPLES[mod]) {
      examples += MODULE_EXAMPLES[mod] + '\n'
    }
  })
  examples += MODULE_EXAMPLES['create'] + '\n'
  return examples
}

export function buildGrammarReference(orchList: string, activeModules: string[]): string {
  const testingExtension = activeModules.includes('testing') ? `
- Test Name [type:unit|e2e, framework:vitest|jest|cypress] : Define a test case. Use keywords Frontend or Backend to scope context.
- Suite "Name" { } : Group related tests.
- renders: state1, state2 : Render cases to cover (Frontend).
- handles: event1, event2 : Interactions to test.
- expects: status:200, body:schema : Backend expectations.
- asserts: condition : Specific assertions.
- db: change1, change2 : Database side-effects to verify (Backend).
- mocks: dep1, dep2 : Dependencies to mock.` : ''

  return `
NEXUS SYNTAX REFERENCE (v${NEXUS_VERSION}):
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
- [animate:] : Entry/exit animation (e.g. [animate: fade-in, duration: 200ms]).
- [hover:] : Hover/focus styles (e.g. [hover: scale-105]).
- [a11y:] : ARIA accessibility attributes (e.g. [a11y: aria-label="Close"]).
- !pk : Database primary key constraint.
- @Auth[mode:jwt] : Requires authentication for an endpoint or resource.
- @RateLimit[X/min] : Limits request frequency.
- ?? "question" : I'm asking a quick question — answer briefly, then continue coding.
- ( cond ) -> A : B : Conditional rendering.
- -> : Navigation / routing / relations.
- => : Side-effects / API calls / handlers.
- < : Data binding / types.
- { } : Inject existing code or file (e.g. { ./UserCard.tsx }).
- !error:code -> dest : Nested under =>; catches HTTP errors, timeout, network, or * (wildcard).
- !! "precondition" : Assertion — explicit precondition before a => action. String or logical expression. Multiple !! evaluated top-to-bottom.
- [paginate:] : On a < bound element; generates paginated fetch + UI controls (e.g. [paginate:20], max 500 items/page).
- -> Model.Name [mod] : Inside Entity; defines typed DB relation. Modifiers: [many] [optional] [cascade].
- @install : Just-in-time package installer (e.g. @install lodash, @install-dev vitest).
- ${orchList} : Structure orchestrators.
- Store Name { ~state Action Selector } : Global state (Zustand/Redux/Pinia).
- Create Name [type:component|page|hook|feature, path:route] : Create files on disk.${testingExtension}`.trim()
}

export function buildPrompt(config: Partial<NexusConfig>): string {
  const activeModules = config.modules || ['frontend']
  const orchList = buildOrchestratorList(activeModules)
  const dynamicExamples = buildModuleExamples(activeModules)
  const grammar = buildGrammarReference(orchList, activeModules)

  return `
NEXUS NOTATION — v${NEXUS_VERSION}

I write my development requests using NEXUS, a shorthand notation for UI, logic, and project structure.
This is the syntax reference. When I send you NEXUS, generate the implementation.

${grammar}

HOW TO HANDLE MY NEXUS INPUT:
- Generate clean, production-ready code following the project DNA below.
- No explanation needed unless I ask with ?? or in plain text.
- If something is ambiguous, ask me to clarify before generating.

@modify [preserve:all] rule:
Only apply the explicit change I describe. Do not reinterpret the design, move other elements, or change colors.

Create / Test rule (filesystem tools like Cursor, Copilot, or any AI code editor):
- Create → write the files and folders directly to disk, don't just show the code.
  - [type:component] → <path>/<Name>/index.<ext>
  - [type:page] → <path>/<name>/page.<ext> (Next.js) | <path>/<name>.<ext> (React)
  - [type:hook] → <path>/<Name>.<ext>
  - [type:feature] → <path>/ with subfolders components/, hooks/, types/ and index.<ext>
- Test → write the test file to disk next to the component.
- No filesystem access → show the code for me to copy.

${dynamicExamples}

ERROR HANDLING OPERATOR (!error):
When you see !error: under a => action, generate proper error handling code.
!error:400 → handle bad request (validation errors, show form errors)
!error:401 → handle unauthorized (redirect to login, clear session)
!error:403 → handle forbidden (show permission denied UI)
!error:404 → handle not found (show 404 component or redirect)
!error:500 → handle server error (show error boundary, log to console)
!error:timeout → handle request timeout (show retry UI, cancel pending requests)
!error:network → handle network failure (show offline indicator)
!error:* → catch-all error handler (fallback for any unhandled error)
The -> destination after !error is the redirect route or recovery action.
Always generate try/catch or .catch() blocks. Never swallow errors silently.

PAGINATION OPERATOR ([paginate]):
When you see [paginate:N] on a data-bound element:
- Generate server-side or client-side pagination fetching N items per page
- Include page state management (useState or URL params)
- Generate Previous/Next controls or page number buttons
- If page:~var is specified, bind the current page to that state variable
- If layout:grid, render items in a CSS grid; if layout:list, render as vertical list
- Always show total count and current range (e.g., "Showing 1-20 of 156")
- Handle loading state between page changes
- Handle empty state when no items exist

MODEL RELATIONS (-> Model.Name):
When you see -> Model.Name inside an Entity definition:
- Generate a foreign key or reference field pointing to that model
- Without modifier: one-to-one required relation (NOT NULL foreign key)
- [many]: one-to-many relation (generate array field or junction table)
- [optional]: nullable relation (allow NULL foreign key)
- [cascade]: on parent delete, cascade delete children
- Adapt to the active database:
  MongoDB/Mongoose → use ObjectId refs and populate()
  PostgreSQL/Prisma → use @relation with proper foreign keys
  MySQL → use foreign key constraints
- Always generate the inverse relation on the referenced model

ASSERTION OPERATOR (!!):
When you see !! lines before a => action, generate runtime precondition checks BEFORE executing that action.

Two forms:
  !! "description" → semantic guard: generate a runtime check with that message as the error/validation text
  !! expression    → logical guard: generate if (!expression) { ... } block with appropriate error handling

Code generation rules:
- Evaluate ALL !! conditions before calling the => action
- If any !! fails: block the action, show a validation error, or throw — NEVER silently skip
- Multiple !! are evaluated strictly top-to-bottom — first failure stops execution
- In React/Next.js components: early return with setError() or toast before the async call
- In NestJS/Express handlers: guard clauses at the top of the handler method
- !! never appears as a literal comment in generated code — it becomes executable guard logic

Example:
  Endpoint POST /checkout
    !! "El carrito no puede estar vacío"
    !! stock.disponible > 0
    => OrderService.crear()
  Generates:
    if (cart.isEmpty()) throw new BadRequestException('El carrito no puede estar vacío')
    if (stock.disponible <= 0) throw new BadRequestException('Stock insuficiente')
    return await OrderService.crear(...)

PROJECT DNA:
${JSON.stringify(config, null, 2)}
  `.trim()
}

export function buildDefaultGrammarReference(): string {
  const allModules = ['frontend', 'backend', 'testing']
  const orchList = buildOrchestratorList(allModules)
  return buildGrammarReference(orchList, allModules)
}

export function buildSystemPrompt(config: Partial<NexusConfig>, provider: NexusProvider = 'llm'): string {
  const header = PROVIDER_HEADERS[provider]
  const grammar = buildPrompt(config)
  return `${header}\n\n${grammar}`
}
