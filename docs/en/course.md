<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <a href="../es/curso.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# NEXUS Mini Course — From Zero to Production

> 14 progressive lessons. Each has a concept, real example, common error, and exercise.

**Estimated time:** 2–3 hours  
**Requirements:** None. Just an AI with NEXUS configured (`nexus init`).

---

## Table of Contents

1. [Why NEXUS](#lesson-1-why-nexus)
2. [Your first blueprint](#lesson-2-your-first-blueprint)
3. [Style, state and variables](#lesson-3-style-state-and-variables)
4. [UI Components](#lesson-4-ui-components)
5. [Data binding — `<` and `from`](#lesson-5-data-binding---and-from)
6. [Actions — `=>`](#lesson-6-actions---)
7. [Preconditions — `!!`](#lesson-7-preconditions---)
8. [Error handling — `!error:`](#lesson-8-error-handling---error)
9. [Pagination — `[paginate:N]`](#lesson-9-pagination---paginaten)
10. [Backend — Models and entities](#lesson-10-backend--models-and-entities)
11. [Backend — Controllers and Endpoints](#lesson-11-backend--controllers-and-endpoints)
12. [Authentication and security](#lesson-12-authentication-and-security)
13. [Complete Full Stack blueprint](#lesson-13-complete-full-stack-blueprint)
14. [Closing the loop — `nexus verify`](#lesson-14-closing-the-loop---nexus-verify)

---

## Lesson 1: Why NEXUS

### The problem

When you describe something to an AI in natural language, it has to interpret. That interpretation has a cost: tokens, ambiguity, and inconsistent results.

```
Natural prompt (100+ tokens):
"Create a login page with a form that has email and password
fields, with validation, a submit button that calls the
authentication API, and if there's a 401 error redirect to
login, if there's a 500 error show a generic message..."

NEXUS (12 lines):
Page Login
  Form LoginForm
    Input email [type:email, required]
    Input password [type:password, required]
    Button "Sign in" => AuthService.login(email, password)
      !error:401 -> /login?error=credentials
      !error:500 -> /login?error=server
```

**Same result. 90% fewer tokens. Zero ambiguity.**

### How it works

1. You write a **blueprint** — the structured intention
2. The AI has the NEXUS protocol as context (via `nexus init`)
3. The AI generates correct code on the first attempt

NEXUS is not a programming language. It's the language between you and the AI.

---

## Lesson 2: Your first blueprint

### The concept

Every blueprint has the same structure:

```
@Stack @Framework          ← what technologies to use
OrchestratorName ID        ← what to build
  OperatorOrChild          ← how to build it
```

Indentation is **2 spaces**. No tabs.

### Minimal valid example

```nexus
@React @Tailwind

Page Home
  Text "Welcome" !bold !xl
  Button "Enter" -> /dashboard
```

This tells the AI:
- Stack: React with Tailwind
- Create a page called `Home`
- With a bold XL text
- With a button that navigates to `/dashboard`

### Available orchestrators

**Frontend:**
```
Page, Layout, Section, Store, Form, Table, Chart,
Card, Button, Text, Image, Input, Badge, Nav, Header,
Grid, List, Modal, Select, Skeleton
```

**Backend:**
```
Model, Controller, Router, Endpoint, Service,
Middleware, Worker, Queue, CronJob, Entity, Index
```

**Testing:**
```
Suite, Test
```

### ❌ Common mistakes

```nexus
// BAD — invented orchestrator
Screen Login          // "Screen" doesn't exist

// BAD — tabs instead of spaces
Page Login
	Text "Hello"      // tab → error

// GOOD — valid orchestrator + 2 spaces
Page Login
  Text "Hello"
```

### 🏋️ Exercise

Create a blueprint for a `PrivacyPolicy` page with:
- A "Privacy Policy" title
- A descriptive text
- A "Back" button that navigates to `/`

<details>
<summary>See solution</summary>

```nexus
@React @Tailwind

Page PrivacyPolicy
  Text "Privacy Policy" !bold !xl
  Text "Here you'll find our terms..." #muted
  Button "Back" -> /
```
</details>

---

## Lesson 3: Style, state and variables

### Design tokens — `#`

`#token` applies styles or classes to an element. Tokens are defined by your project.

```nexus
Section Hero #glass           // glassmorphism
Button "Save" #primary        // primary color
Text "Error" #danger          // error text
Card #shadow-lg               // large shadow
```

### Modifiers — `!`

`!modifier` applies visual weight, behavior, or constraint flags.

```nexus
Text "Title" !bold !xl        // bold + xl size
Button "Delete" !danger       // danger (color + style)
Input email !required         // required field
Entity id !pk                 // primary key (backend)
```

### Local state — `~`

`~variable: initialValue` declares local reactive state (`useState` in React, `ref` in Vue).

```nexus
Page Counter
  ~count: 0
  Text < ~count !bold !xl
  Button "+1" => ~count++
```

### Global variables — `$`

`$name: value` declares constants or project values.

```nexus
$brand: "MyApp"
$api-base: "/api/v1"
$primary-color: "#5DCAA5"
```

### Responsive variant — `|`

```nexus
Grid [cols:1 | cols:3]        // 1 column mobile, 3 desktop
Section [padding:sm | padding:lg]
```

### Repeat — `* N`

```nexus
Card * 6                      // generates 6 cards (useful for skeletons)
SkeletonRow * 3               // 3 skeleton rows
```

### 🏋️ Exercise

Create a `Hero` section with:
- Glassmorphism background
- Title "Management Platform" bold XL
- Muted subtitle
- Two columns on desktop, one on mobile

<details>
<summary>See solution</summary>

```nexus
Section Hero #glass [cols:1 | cols:2]
  Text "Management Platform" !bold !xl
  Text "Manage everything from one place" #muted
```
</details>

---

## Lesson 4: UI Components

### Component anatomy

```nexus
UIComponent "Content" #style !modifier [attribute:value] => action -> destination
```

Attributes go in `[key:value]`. Multiple attributes separated by comma.

### Forms

```nexus
Form LoginForm
  Input email [type:email, required, placeholder:"email@example.com"]
  Input password [type:password, required, minLength:8]
  Button "Sign in" #primary
```

### Conditional — `( cond ) -> A : B`

Conditional rendering based on an expression:

```nexus
( product.inStock ) ->
  Button "Add to cart" #primary
:
  Badge "Out of stock" #muted

( ?auth ) ->
  Dashboard
:
  LoginPage
```

### UI state — `?`

```nexus
?loading:Skeleton             // if loading → show Skeleton
?error:ErrorBanner            // if error → show ErrorBanner
?empty:EmptyState             // if empty → show EmptyState
```

### Inject — `{ }`

Injects an existing file or component without regenerating it:

```nexus
Section Header { ./Navbar.tsx }
Card { ./ProductCard.tsx }
```

### 🏋️ Exercise

Create a product card that shows:
- Product image
- Name in bold
- Price in accent color
- If in stock → "Buy" button
- If out of stock → "Out of stock" badge

<details>
<summary>See solution</summary>

```nexus
Card Product #glass
  Image < product.image [ratio:4/3]
  Text < product.name !bold
  Text < product.price #accent !lg
  ( product.inStock ) ->
    Button "Buy" #primary
  :
    Badge "Out of stock" #muted
```
</details>

---

## Lesson 5: Data binding — `<` and `from`

### The `<` operator

Binds an element to a data source, TypeScript type, or store:

```nexus
Table < Order               // table with Order data
Chart < SalesData           // chart with sales data
Text < user.name            // text with field value
Image < product.thumbnail   // image from field
```

### The `from` operator — readable alias

`from` is **exactly equal** to `<`. Use it when you want more clarity:

```nexus
// Equivalent — choose whichever you prefer
Table < Order [paginate:20]
Table from Order [paginate:20]

Chart < SalesData
Chart from SalesData
```

**Rule:** `from` without a source is a syntax error.
```nexus
// BAD
Table from              // ← error: "from" without source

// GOOD
Table from Order
```

### Binding in endpoints (backend)

```nexus
Endpoint POST /users < Payload:UserSchema => UserService.create()
```

### ❌ Common mistakes

```nexus
// BAD — paginate without binding
Table [paginate:20]             // missing < or from

// GOOD
Table < Order [paginate:20]
Table from Order [paginate:20]
```

### 🏋️ Exercise

Create a `ProductList` component that shows:
- A product table from `ProductStore`
- A sales chart from `monthlySales`
- A brand logo image

<details>
<summary>See solution</summary>

```nexus
Section ProductList
  Chart from monthlySales
  Table from ProductStore
  Image < brand.logo [width:120]
```
</details>

---

## Lesson 6: Actions — `=>`

### The concept

`=>` dispatches an action: calls a service, updates a store, or handles an event.

```nexus
Button "Save" => FormService.save()
Input onChange => Store.setFilter(value)
Form => UserService.create()
```

### Actions with parameters

```nexus
Button "Add" => CartStore.add(product)
Button "Delete" => UserService.delete(user.id)
Select => FilterStore.setCategory(value)
```

### Actions in endpoints

```nexus
Endpoint POST /orders => OrderService.create()
Endpoint GET /users/:id => UserService.findById()
Endpoint DELETE /product/:id => ProductService.delete()
```

### 🏋️ Exercise

Create a search form that:
- Has a search-type input
- On change updates `SearchStore.setQuery(value)`
- Has a "Clear" button that calls `SearchStore.clear()`

<details>
<summary>See solution</summary>

```nexus
Form Search
  Input query [type:search, placeholder:"Search..."]
    => SearchStore.setQuery(value)
  Button "Clear" #ghost => SearchStore.clear()
```
</details>

---

## Lesson 7: Preconditions — `!!`

### The concept

`!!` declares preconditions that must be met **before** executing a `=>` action. If any fails, the action is not executed.

Two forms:
- `!! "message"` — semantic guard (generates validation with that error message)
- `!! expression` — logical guard (generates `if (!expression) { throw ... }`)

### Complete example

```nexus
Endpoint POST /checkout
  !! "Cart cannot be empty"
  !! cart.items.length > 0
  !! user.authenticated
  => OrderService.create()
    !error:400 -> /error/validation
    !error:* -> /error/general
```

**Generated code (NestJS):**
```typescript
async checkout(@Body() dto: CheckoutDto, @Request() req) {
  if (cart.isEmpty())
    throw new BadRequestException('Cart cannot be empty')
  if (cart.items.length <= 0)
    throw new BadRequestException('Empty cart')
  if (!user.authenticated)
    throw new UnauthorizedException()
  return await OrderService.create(dto)
}
```

### Important rules

1. `!!` always goes **before** the `=>` line it protects
2. Evaluated top-to-bottom — first failure stops everything
3. `!!` without content → validation error
4. `!!` NEVER appears as a comment in code — it becomes executable guard logic

### 🏋️ Exercise

Create a `POST /transfer` endpoint that:
- Requires sufficient balance
- Requires the recipient to exist
- Calls `TransferService.execute()`

<details>
<summary>See solution</summary>

```nexus
Endpoint POST /transfer
  !! "Balance must be sufficient"
  !! account.balance >= amount
  !! "Recipient must exist"
  !! recipient.active
  => TransferService.execute()
    !error:400 -> /error/insufficient-balance
    !error:404 -> /error/recipient-not-found
```
</details>

---

## Lesson 8: Error handling — `!error:`

### The concept

`!error:code` catches a specific error from its parent operation (`=>` or `<`/`from`) and redirects to the specified destination.

### Valid codes

| Code | When it occurs |
|---|---|
| `400`–`599` | HTTP code (400, 401, 403, 404, 500…) |
| `timeout` | Request exceeded time limit |
| `network` | No connection / network error |
| `*` | Wildcard — any unhandled error |

### Syntax

```nexus
Element => Service.method()
  !error:400 -> /destination
  !error:401 -> /other-destination
  !error:* -> /error/general

// Also valid under < and from
Table from Order [paginate:20]
  !error:500 -> /error/server
  !error:network -> /offline
```

### The wildcard `*`

`!error:*` always goes **last** — catches everything not handled above.

```nexus
// BAD — wildcard blocks the specific ones
!error:* -> /error/general
!error:401 -> /login      // never reached

// GOOD — specific first, wildcard last
!error:401 -> /login
!error:500 -> /error/server
!error:* -> /error/general
```

### 🏋️ Exercise

Complete this file upload blueprint with error handling for: size limit (413), unauthorized (401), server down (503), and anything else:

```nexus
Endpoint POST /upload
  !! "Only images are allowed"
  => FileService.upload()
  // ← add !error: here
```

<details>
<summary>See solution</summary>

```nexus
Endpoint POST /upload
  !! "Only images are allowed"
  => FileService.upload()
    !error:401 -> /login
    !error:413 -> /error/file-too-large
    !error:503 -> /error/service-unavailable
    !error:* -> /error/general
```
</details>

---

## Lesson 9: Pagination — `[paginate:N]`

### Parameters

| Parameter | Description | Required |
|---|---|---|
| `paginate:N` | Items per page | Yes (1–500) |
| `page:~variable` | State variable for current page | No |
| `layout:grid\|list` | Visual layout | No |

### Syntax

```nexus
Table < Order [paginate:20]
Table from Order [paginate:20]
Table < User [paginate:10, page:~currentPage]
List < Product [paginate:12, layout:grid]
Grid from Article [paginate:8, layout:grid, cols:4]
```

### With controlled page variable

```nexus
Section Orders
  ~currentPage: 1
  Table < Order [paginate:20, page:~currentPage]
    !error:500 -> /error/server
    !error:network -> /offline
```

### 🏋️ Exercise

Create a `Catalog` page with:
- A search bar that filters `CatalogStore`
- A product grid (4 columns, 12 per page) with page control
- 500 error handling

<details>
<summary>See solution</summary>

```nexus
Page Catalog
  ~currentPage: 1
  Input search [type:search] => CatalogStore.filter(value)
  Grid from CatalogStore.products [paginate:12, layout:grid, cols:4, page:~currentPage]
    !error:500 -> /error/server
```
</details>

---

## Lesson 10: Backend — Models and entities

### Complete example

```nexus
@NestJS @Prisma @PostgreSQL

Model Order
  Entity id type:uuid !pk
  Entity status [enum:pending,paid,shipped,delivered, default:pending]
  Entity total [type:decimal]
  Entity createdAt [type:datetime, default:now]
  Entity user -> Model.User
  Entity items -> Model.OrderItem [many]
  Entity invoice -> Model.Invoice [optional]
  Index status [type:hash]
  Index createdAt [type:btree]
```

### 🏋️ Exercise

Model a `Review` entity with:
- Unique ID
- Rating 1–5
- Comment text
- Automatic creation date
- Relation with `Product` (required)
- Relation with `User` (required)
- Index on rating

<details>
<summary>See solution</summary>

```nexus
Model Review
  Entity id type:uuid !pk
  Entity rating [type:integer, min:1, max:5]
  Entity comment [type:string]
  Entity createdAt [type:datetime, default:now]
  Entity product -> Model.Product
  Entity user -> Model.User
  Index rating [type:btree]
```
</details>

---

## Lesson 11: Backend — Controllers and Endpoints

### Complete CRUD example

```nexus
@NestJS @Prisma

Controller ProductController [route:/api/v1/products]
  @Auth[mode:jwt]
  @RateLimit[200/min]

  Router ApiV1
    Endpoint GET /
      Table from Product [paginate:20]
      => ProductService.list()

    Endpoint GET /:id
      => ProductService.findById()
      !error:404 -> 404

    Endpoint POST /
      < Payload:CreateProductSchema
      => ProductService.create()
      !error:400 -> 400
      !error:409 -> 409

    Endpoint PUT /:id
      < Payload:UpdateProductSchema
      @Auth[role:admin]
      => ProductService.update()
      !error:404 -> 404

    Endpoint DELETE /:id
      @Auth[role:admin]
      => ProductService.delete()
      !error:404 -> 404
```

### 🏋️ Exercise

Create the `Comments` controller with:
- `GET /comments` — list all (public, 20 per page)
- `POST /comments` — create (requires auth)
- `DELETE /comments/:id` — delete (requires admin role)

<details>
<summary>See solution</summary>

```nexus
Controller CommentController [route:/api/comments]
  Router ApiV1
    Endpoint GET /
      Table from Comment [paginate:20]
      => CommentService.list()

    Endpoint POST /
      @Auth[mode:jwt]
      < Payload:CreateCommentSchema
      => CommentService.create()
      !error:400 -> 400

    Endpoint DELETE /:id
      @Auth[role:admin]
      => CommentService.delete()
      !error:404 -> 404
```
</details>

---

## Lesson 12: Authentication and security

### `@Auth` — Authentication

```nexus
@Auth               // any authenticated user
@Auth[mode:jwt]     // JWT specifically
@Auth[role:admin]   // requires admin role
@Auth[public]       // explicitly public
```

### Complete auth example

```nexus
@NestJS @Prisma
@install bcrypt
@install jsonwebtoken

Controller AuthController [route:/api/auth]
  Router ApiV1
    Endpoint POST /register
      !! "Email must not be already registered"
      < Payload:RegisterSchema
      => AuthService.register()
        !error:409 -> /error/email-exists
        !error:400 -> /error/invalid-data

    Endpoint POST /login
      !! "Credentials must be valid"
      < Payload:LoginSchema
      => AuthService.login()
        !error:401 -> /error/invalid-credentials
        !error:403 -> /error/account-locked

    Endpoint POST /logout
      @Auth[mode:jwt]
      => AuthService.logout()

    Endpoint POST /refresh
      !! "Refresh token must be valid"
      => AuthService.refresh()
        !error:401 -> /error/invalid-token
```

---

## Lesson 13: Complete Full Stack blueprint

```nexus
@React @NestJS @Prisma @PostgreSQL @Tailwind
@install date-fns

// ── BACKEND ──────────────────────────────────────────

Model Task
  Entity id type:uuid !pk
  Entity title [type:string]
  Entity description [type:string, optional]
  Entity status [enum:pending,in-progress,completed, default:pending]
  Entity priority [enum:low,medium,high, default:medium]
  Entity dueDate [type:datetime, optional]
  Entity createdAt [type:datetime, default:now]
  Entity user -> Model.User
  Index status [type:hash]
  Index user [type:btree]

Service TaskService
  Method list(userId: string, filters: TaskFilterDto)
  Method findById(id: string)
  Method create(dto: CreateTaskDto)
  Method update(id: string, dto: UpdateTaskDto)
  Method delete(id: string)
  Method complete(id: string)

Controller TaskController [route:/api/tasks]
  @Auth[mode:jwt]
  @RateLimit[300/min]

  Router ApiV1
    Endpoint GET /
      Table from Task [paginate:20]
      => TaskService.list()

    Endpoint POST /
      !! "Title cannot be empty"
      < Payload:CreateTaskSchema
      => TaskService.create()
        !error:400 -> 400

    Endpoint PATCH /:id/complete
      !! "Task must exist and belong to user"
      => TaskService.complete()
        !error:404 -> 404
        !error:403 -> 403

    Endpoint DELETE /:id
      => TaskService.delete()
        !error:404 -> 404

// ── FRONTEND ─────────────────────────────────────────

Store TaskStore
  ~tasks: []
  ~statusFilter: "all"
  ~loading: false
  Action load()
  Action create(task)
  Action complete(id)
  Action delete(id)
  Selector filteredTasks
  Selector completedTasks

Page TaskManager
  @Auth[mode:jwt]
  Layout Stack

  Section Header [justify:between]
    Text "My Tasks" !bold !xl
    Button "New task" #primary => ModalStore.open("create-task")

  Section Filters #glass
    Button "All" => TaskStore.filter("all")
    Button "Pending" => TaskStore.filter("pending")
    Button "In Progress" => TaskStore.filter("in-progress")
    Button "Completed" => TaskStore.filter("completed")

  ( ~loading ) ->
    SkeletonRow * 5
  :
    Table from TaskStore.filteredTasks [paginate:20, page:~currentPage]
      !error:500 -> /error/server
      !error:network -> /offline

  Modal CreateTask
    Form NewTaskForm
      Input title [required, placeholder:"What do you need to do?"]
      Input description [type:textarea, placeholder:"Optional description"]
      Select priority [options:low,medium,high, default:medium]
      Input dueDate [type:date, optional]
      !! "Title cannot be empty"
      Button "Create task" #primary => TaskService.create()
        !error:400 -> /error/validation
      Button "Cancel" #ghost => ModalStore.close()
```

---

## Lesson 14: Closing the loop — `nexus verify`

### Usage

```bash
nexus verify tasks.nexus ./src
nexus verify tasks.nexus ./src --json
```

### Sample output

```
⬡ nexus verify — tasks.nexus

  ✓ [auth] @Auth[mode:jwt] → src/auth.guard.ts
  ✓ [precondition] "Title cannot be empty" → src/task.service.ts
  ✓ [action] TaskService.create() → src/task.controller.ts
  ✓ [action] TaskService.complete() → src/task.controller.ts
  ✗ [error handler] !error:403 -> 403
  ✓ [endpoint] POST /api/tasks → src/task.controller.ts
  ✓ [pagination] Table from Task → src/task.service.ts
  ✓ [dependency] date-fns → package.json

  7 passed  1 failed
```

### Verified item types

| Type | Blueprint example | What it searches |
|---|---|---|
| `auth` | `@Auth[mode:jwt]` | JWT guard, `UseGuards`, `Bearer` |
| `assertion` | `!! "Title..."` | Literal string in any file |
| `error-handler` | `!error:403` | HTTP code in any file |
| `action` | `=> TaskService.create()` | `TaskService.create` in any file |
| `install` | `@install date-fns` | `date-fns` in `package.json` |
| `endpoint` | `Endpoint POST /api/tasks` | Base route in any file |
| `pagination` | `[paginate:20]` | `skip`, `take`, `limit`, `offset` |

---

## All 20 NEXUS operators

| Operator | What it does |
|---|---|
| `@` | Stack / framework directive |
| `@modify` | Safe edit — only what's declared |
| `@Auth` | Authentication on endpoint or resource |
| `@RateLimit` | Request frequency limit |
| `@install` | Declare project dependency |
| `#` | Design token or style |
| `$` | Global variable / constant |
| `~` | Local reactive state |
| `\|` | Responsive variant |
| `* N` | Repeat N times |
| `?` | UI state (loading/error/empty) |
| `!` | Visual priority modifier |
| `!!` | Precondition before `=>` |
| `!error:` | Catches errors from `=>` or `<`/`from` |
| `->` | Navigation / model relation |
| `=>` | Action / side effect |
| `<` | Data binding |
| `from` | Data binding (readable alias for `<`) |
| `{ }` | Inject existing file |
| `??` | Quick query to AI |

---

## Next steps

- [Full grammar reference](./grammar.md)
- [Operator dictionary](./operators.md)
- [More real examples](./examples.md)
- [Protocol roadmap](./roadmap.md)

---

*NEXUS Protocol v4.3.1 — nexuslang.dev*
