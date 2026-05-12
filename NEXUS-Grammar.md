# NEXUS: The AI-Native Language Protocol (v4.0)

NEXUS is the high-level language designed for exact and fluid communication between Humans and AIs. It eliminates natural language ambiguity and allows orchestrating complete full-stack applications.

## 1. Structure and Hierarchy
Based on indentation (2 spaces).
`Component #Style [Attributes] "Content" => Logic -> Destination`

## 2. Master Operators (Semantic Dictionary)

- `@` **Behavior Directives**: Sets the AI's thinking mode, technical environment, or predefined layouts.
  - *Example:* `@React @CleanCode @Layout:Sidebar`
- `@modify` **Safe Edit Mode (Minimal Intervention)**: Indicates the element ALREADY EXISTS. The AI is forbidden from rewriting unaffected parts.
  - *Example:* `@modify [preserve:all]` → AI only returns the modified fragment.
- `#` **Design Tokens / Styles**: Links the component with the design system (DNA). Supports inheritance.
- `$` **Global Variables / DNA**: Defines system constants or parameters.
- `~` **Local State / Reactivity**: Defines variables that change during the session (useState/Signals).
- `|` **Adaptability (Responsive)**: Defines variations according to screen size.
- `* N` **Multiplier**: Indicates repetition of structures with automatic data variation.
- `?` **UI States**: Defines visual or logical variants based on state.
- `!` **Priority / Emphasis**: Indicates visual weight or critical importance.
- `[new]` **New Element**: Marks an element as newly added.
- `[locked]` **Protected Component**: Forbids the AI from altering or regenerating this component.
- `[` `]` **Technical Attributes**: Passes configuration parameters (props).
- `!pk` **Primary Key**: Defines a database primary key.
- `@Auth` **Authentication**: Defines endpoint security requirements.
- `@RateLimit` **Rate Limiting**: Defines request constraints.
- `?? "question"` **Query Operator**: Ask a question mid-session without leaving NEXUS mode.
- `( cond ) -> A : B` **Intent Conditional**: Defines logical visualization branches.
- `->` **Navigation Flow / Routing / Relations**: Indicates location change or database relation.
- `=>` **Logic / Side-Effects / Handlers**: Asynchronous actions or data processing.
- `<` **Data Binding / Types**: Links components with data sources or schemas.
- `{ path }` **Context Injection**: Integrates existing code or files.

## 3. Structure Orchestrators

### Frontend
- `Page`: Defines a complete view or screen.
- `Layout`: Defines a reusable structural wrapper.
- `Section`: Defines a thematic block within a page.
- `Store`: Defines global state (Actions/Selectors).

### Backend
- `Model`: Defines a database entity and its relations.
- `Controller`: Defines an API resource and its endpoints.
- `Service`: Defines business logic.
- `Middleware`: Defines request processing logic.
- `Endpoint`: Defines an API route.
- `Worker` / `Queue` / `CronJob`: Defines asynchronous or scheduled tasks.

## 4. Usage Examples

### Full-Stack Definition
```nexus
@NestJS @Prisma @PostgreSQL

Model User
  Entity id type:uuid !pk
  Entity email type:string !unique
  Relation posts -> Post * N

Controller UserController [route:/api/users]
  @Auth[mode:jwt]
  @RateLimit[100/min]
  Endpoint GET / -> UserService.findAll()
  Endpoint POST / => UserService.create()
```

### Safe Edit: Moving an element
```nexus
@modify [preserve:all]
Card "credit-summary" [position:move-to:1]
```

---
*Nexus: Fewer words, more intention.*
