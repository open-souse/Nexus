// NEXUS grammar as structured data — used by NEXUS Studio for syntax highlighting,
// autocomplete, validation, and documentation.

export const NEXUS_VERSION = '4.3.0'

export interface NexusOperator {
  symbol: string
  name: string
  description: string
  example: string
}

export interface NexusModule {
  id: string
  name: string
  description: string
  orchestrators: string[]
}

export interface NexusBlueprint {
  id: string
  name: string
  description: string
  file: string
}

export const NEXUS_ORCHESTRATORS = [
  // Structure
  'Page', 'Layout', 'Section', 'Store', 'Type', 'Create',
  // Backend
  'Model', 'Controller', 'Router', 'Middleware', 'Service', 'Endpoint',
  'Worker', 'Queue', 'CronJob',
  // Testing
  'Test', 'Suite',
  // UI components
  'Card', 'Button', 'Text', 'Image', 'Input', 'Badge', 'Nav', 'Navbar',
  'Header', 'Grid', 'List', 'Form', 'Table', 'Chart', 'Modal', 'Select',
  'Skeleton', 'Stack', 'Field'
] as const

export const NEXUS_KEYWORDS = [
  'Action', 'Selector', 'Method', 'Auth', 'Response', 'Schema', 'Guard', 'Interceptor', 'Payload',
  'Entity', 'Relation', 'Repository', 'renders', 'handles', 'asserts', 'mocks',
  'expects', 'status', 'body', 'db', 'Frontend', 'Backend', 'components', 'hooks', 'types'
] as const

export const NEXUS_OPERATORS: NexusOperator[] = [
  { symbol: '@', name: 'Directive', description: 'Environment / behavior directive', example: '@React @CleanCode' },
  { symbol: '@modify', name: 'Safe Edit', description: 'Only apply the explicit change, nothing else', example: '@modify [preserve:all]' },
  { symbol: '#', name: 'Style Token', description: 'Design token or style class', example: 'Button #primary #glass' },
  { symbol: '$', name: 'Global Variable', description: 'Global constant or DNA value', example: '$brand: "Nexus"' },
  { symbol: '~', name: 'Local State', description: 'Reactive local state (useState/Signals)', example: '~isOpen: false' },
  { symbol: '|', name: 'Responsive', description: 'Responsive variant', example: 'Grid [cols:1 | cols:3]' },
  { symbol: '* N', name: 'Multiplier', description: 'Repeat element N times', example: 'Card * 3' },
  { symbol: '?', name: 'UI State', description: 'Conditional UI state', example: '?loading ?error ?empty' },
  { symbol: '!', name: 'Priority', description: 'Visual weight or importance', example: 'Text !bold !danger' },
  { symbol: '->', name: 'Navigation', description: 'Route or navigation flow', example: 'Button -> /dashboard' },
  { symbol: '=>', name: 'Side Effect', description: 'API call, handler, or async action', example: 'Button => login()' },
  { symbol: '<', name: 'Data Binding', description: 'Bind to data type or source', example: 'Table < User' },
  { symbol: '{ }', name: 'Inject', description: 'Inject existing code or file', example: '{ ./UserCard.tsx }' },
  { symbol: '??', name: 'Query', description: 'Ask a question without leaving NEXUS mode', example: '?? "Should I use Zustand?"' },
  { symbol: '( cond ) -> A : B', name: 'Conditional', description: 'Conditional rendering', example: '( ?auth ) -> Home : Login' },
  { symbol: '[new]', name: 'New Element', description: 'Marks a newly added element', example: 'Button [new]' },
  { symbol: '[locked]', name: 'Protected', description: 'Do not modify or regenerate', example: 'Navbar [locked]' },
  { symbol: '[animate:]', name: 'Animation', description: 'Entry/exit animation', example: '[animate: fade-in, duration: 200ms]' },
  { symbol: '[hover:]', name: 'Hover Style', description: 'Hover or focus styles', example: '[hover: scale-105]' },
  { symbol: '[a11y:]', name: 'Accessibility', description: 'ARIA attributes', example: '[a11y: aria-label="Close"]' },
  { symbol: '[inherit:siblings]', name: 'Inherit', description: 'Inherit style from siblings', example: 'Button [new, inherit:siblings]' },
  { symbol: '[cascade:children]', name: 'Cascade', description: 'Apply parent styles to children', example: 'Section [cascade:children]' },
  { symbol: '[position:move-to:N]', name: 'Move', description: 'Move element to position N', example: '[position:move-to:1]' },
  { symbol: '!pk', name: 'Primary Key', description: 'Database primary key constraint', example: 'Entity id type:uuid !pk' },
  { symbol: '@Auth', name: 'Authentication', description: 'Require authentication for endpoint', example: '@Auth[mode:jwt]' },
  { symbol: '@RateLimit', name: 'Rate Limiting', description: 'Limit requests', example: '@RateLimit[100/min]' },
  { symbol: '!error:', name: 'Error Handler', description: 'Error handler — catches specific HTTP errors or timeouts and redirects', example: '!error:400 -> /error' },
  { symbol: '!!', name: 'Assertion', description: 'Explicit precondition before a => action. Evaluated top-to-bottom before executing the action. String or logical expression.', example: '!! "El carrito no puede estar vacío"' },
  { symbol: '[paginate:]', name: 'Pagination', description: 'Native pagination — generates paginated data fetching with UI controls', example: 'Table < User [paginate:20]' },
  { symbol: '-> Model.', name: 'Model Relation', description: 'Defines a typed relation between database models', example: 'Entity items -> Model.Product [many]' },
  { symbol: '@install', name: 'JIT Installer', description: 'Direct syntax-declared on-demand package installer (e.g. @install lodash, @install-dev jest)', example: '@install lodash' }
]

export const NEXUS_MODULES: NexusModule[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'React, Vue, Next.js components and pages',
    orchestrators: ['Page', 'Layout', 'Section', 'Store', 'Type', 'Create']
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'API endpoints, services, database models and controllers',
    orchestrators: ['Model', 'Controller', 'Router', 'Middleware', 'Service', 'Endpoint', 'Worker', 'Queue', 'CronJob']
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Vitest, Jest, and Cypress test suites',
    orchestrators: ['Test', 'Suite']
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Design system tokens and scales',
    orchestrators: []
  }
]

export const NEXUS_BLUEPRINTS: NexusBlueprint[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Admin panel with sidebar, stats cards, and data table',
    file: 'dashboard.nexus'
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Marketing page with hero section, features, and footer',
    file: 'landing-page.nexus'
  },
  {
    id: 'auth',
    name: 'Auth / Login',
    description: 'Login form with OAuth, validation, and error handling',
    file: 'auth-login.nexus'
  },
  {
    id: 'profile',
    name: 'User Profile',
    description: 'User profile with inline editing and settings navigation',
    file: 'profile.nexus'
  },
  {
    id: 'cart',
    name: 'Shopping Cart',
    description: 'Cart with global Store, animations, and accessibility',
    file: 'store-cart.nexus'
  }
]
