<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <a href="../es/gramatica.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# NEXUS Grammar — Complete Reference

## Fundamental Principles

NEXUS uses 2-space indentation. Each line represents an **Orchestrator**, a **Keyword**, or an **Operator**.

**Anatomy of a NEXUS line:**

```
Orchestrator Name #Style [Attributes] "Content" => Logic -> Destination
```

Child lines are always indented 2 spaces from their parent. Operators on the same line do not need additional indentation.

---

## Frontend Orchestrators

| Orchestrator | Purpose | Example |
|---|---|---|
| `Page` | Full screen or view | `Page Dashboard` |
| `Layout` | Reusable structural wrapper | `Layout SplitView` |
| `Section` | Thematic block inside a page | `Section Hero #glass` |
| `Store` | Global state (Zustand/Redux/Pinia) | `Store CartStore` |
| `Type` | TypeScript interfaces or types | `Type UserProfile` |
| `Form` | Interactive form | `Form LoginForm` |
| `Table` | Data table | `Table < Order` |
| `Chart` | Data visualization | `Chart < Sales` |
| `Card` | Information container | `Card #glass` |
| `Button` | Interactive element | `Button "Save"` |
| `Text` | Text content | `Text "Title" !bold` |
| `Image` | Visual element | `Image < product.photo` |
| `Input` | Input field | `Input email [type:email]` |
| `Badge` | Status label | `Badge "Active" #success` |
| `Nav` | Navigation | `Nav [items:5]` |
| `Header` | Page header | `Header #fixed` |
| `Grid` | Grid layout | `Grid [cols:3]` |
| `List` | List of elements | `List < Items` |
| `Create` | Create files on disk | `Create Button [type:component]` |

---

## Backend Orchestrators

| Orchestrator | Purpose | Example |
|---|---|---|
| `Model` | Database entity | `Model User` |
| `Controller` | API resource grouping | `Controller UserController` |
| `Router` | Route organization | `Router ApiV1` |
| `Endpoint` | Specific API route | `Endpoint GET /users` |
| `Service` | Business logic | `Service UserService` |
| `Middleware` | Request interceptor | `Middleware AuthMiddleware` |
| `Worker` | Background task | `Worker EmailWorker` |
| `Queue` | Message queue | `Queue NotificationQueue` |
| `CronJob` | Scheduled task | `CronJob DailyReports` |
| `Entity` | Model field | `Entity name [type:string]` |
| `Index` | Database index | `Index email [unique]` |

---

## Testing Orchestrators

| Orchestrator | Purpose | Example |
|---|---|---|
| `Suite` | Test group | `Suite AuthTests` |
| `Test` | Individual test case | `Test "Successful login" [type:unit]` |

---

## Operators

See the [full operator dictionary](./operators.md).

Summary of the most common:

| Operator | Purpose |
|---|---|
| `@Directive` | Environment or framework (`@React`, `@NestJS`) |
| `#token` | Design token or style (`#glass`, `#primary`) |
| `$var: value` | Global variable or DNA constant |
| `~var: value` | Local reactive state |
| `!modifier` | Priority or visual weight flag (`!bold`, `!pk`) |
| `< Source` | Data binding |
| `from Source` | Data binding (readable alias for `<`) |
| `=> Action()` | Side effect or API call |
| `-> Destination` | Navigation or route |
| `( cond ) -> A : B` | Conditional rendering |
| `!error:code -> route` | Error handling nested under `=>` |
| `[paginate:N]` | Native pagination on `<` bound elements |
| `-> Model.Name` | Database model relation |
| `* N` | Repeat N times |
| `?? "question"` | Quick question to AI |
| `{ path }` | Inject existing file or context |

---

## Indentation Rules

- Each level uses exactly **2 spaces**
- Children are always indented from their parent
- `!error:` operators must be indented under the `=>` or `<`/`from` line that contains them
- Lines at the same level are siblings

```nexus
Page Example          ← level 0
  Section A           ← level 1 (child of Page)
    Button "X"        ← level 2 (child of Section)
      => Service()    ← same line or indented
      !error:* -> /   ← level 3 (child of =>)
    Table from Data   ← level 2 (binding with readable alias)
      !error:500 -> / ← level 3 (child of from)
```

---

## Testing Keywords

Inside `Test` blocks:

| Keyword | Purpose |
|---|---|
| `renders:` | Render states to cover (Frontend) |
| `handles:` | Interactions to test |
| `asserts:` | Specific assertions |
| `mocks:` | Dependencies to mock |
| `expects:` | Response expectations (Backend) |
| `db:` | Database side effects (Backend) |

---

## Examples

→ [See full examples](./examples.md)
