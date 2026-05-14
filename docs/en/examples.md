<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <a href="../es/ejemplos.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# NEXUS Examples — Real-World Cases

Six complete examples covering the most common NEXUS protocol use cases.

---

## 1. Full Dashboard

Admin panel with sidebar, statistics, and paginated table.

```nexus
@React @Tailwind

Page Dashboard
  Layout SplitView
    Nav #sidebar
      Image < brand.logo [width:120]
      List < navItems [active:~activeRoute]
      Button "Log out" #ghost => AuthService.logout()
        !error:* -> /login

  Section Summary #glass [cols:4]
    Card "Total Revenue"
      Text < stats.revenue !bold !xl
      Text < stats.monthlyChange #muted
    Card "Active Orders"
      Text < stats.activeOrders !bold !xl
    Card "New Customers"
      Text < stats.newCustomers !bold !xl
    Card "Conversion Rate"
      Text < stats.conversion !bold !xl

  Section Orders
    ~statusFilter: "all"
    Input search [type:search, placeholder:"Search order..."]
      => OrderStore.setFilter(value)
    Table < Order [paginate:20, page:~currentPage]
      !error:500 -> /error/server
      !error:network -> /offline
```

---

## 2. Authentication with Error Handling

Login form with validation, OAuth, and complete error handling.

```nexus
@React @Tailwind

Page Login
  Layout CenteredCard #glass [maxWidth:400]
    Image < brand.logo [width:80]
    Text "Welcome back" !bold !xl
    Text "Sign in to your account" #muted

    Form LoginForm
      Input email [type:email, required, placeholder:"email@example.com"]
      Input password [type:password, required, placeholder:"••••••••"]
      Button "Sign in" #primary => AuthService.login(email, password)
        !error:401 -> /login?error=credentials
        !error:403 -> /account-locked
        !error:429 -> /login?error=too-many-attempts
        !error:network -> /login?error=no-connection
        !error:* -> /login?error=general

    Text "or continue with" #muted [align:center]

    Grid [cols:2 #gap-2]
      Button "Google" #outline => OAuthService.google()
        !error:* -> /login?error=oauth
      Button "GitHub" #outline => OAuthService.github()
        !error:* -> /login?error=oauth

    ( ~rememberMe ) ->
      Text "Session active for 30 days" #muted !xs
    :
      Text "Session expires when browser closes" #muted !xs

    Button "Forgot your password?" #ghost -> /reset-password
```

---

## 3. Full REST API

Model with relations and controller with authentication and rate limiting.

```nexus
@NestJS @Prisma @PostgreSQL

Model Order
  Entity id type:uuid !pk
  Entity status default:pending
  Entity total [type:decimal]
  Entity createdAt [type:datetime, default:now]
  Entity user -> Model.User
  Entity items -> Model.OrderItem [many]
  Entity invoice -> Model.Invoice [optional]
  Index status [type:hash]
  Index user [type:btree]

Model OrderItem
  Entity id type:uuid !pk
  Entity quantity [type:integer]
  Entity unitPrice [type:decimal]
  Entity order -> Model.Order [cascade]
  Entity product -> Model.Product

Controller OrderController [route:/api/v1/orders]
  policy: is-authenticated
  @RateLimit[100/min]

  Router ApiV1
    Endpoint POST /
      < Payload:CreateOrderSchema
      @Auth[mode:jwt]
      => OrderService.create()
      !error:400 -> 400
      !error:422 -> 422

    Endpoint GET /
      @Auth[mode:jwt]
      => OrderService.listByUser()

    Endpoint GET /:id
      @Auth[mode:jwt]
      => OrderService.findById()
      !error:404 -> 404

    Endpoint PUT /:id/status
      < Payload:UpdateStatusSchema
      @Auth[role:admin]
      => OrderService.updateStatus()
      !error:400 -> 400
      !error:404 -> 404

    Endpoint DELETE /:id
      @Auth[role:admin]
      => OrderService.delete()
      !error:404 -> 404
```

---

## 4. E-Commerce — Product Page

Detail page with global cart and stock conditional.

```nexus
@React @Zustand @Tailwind

Store CartStore
  ~items: []
  ~total: 0
  Action add(product)
  Action remove(productId)
  Action clear()
  Selector totalItems
  Selector subtotal

Page ProductDetail
  Layout Stack #gap-4
  Section Hero [cols:2]
    Image < product.images [ratio:4/3, gallery:true]
    Section Info
      Badge < product.category #muted
      Text < product.name !bold !2xl
      Text < product.price #accent !xl
      Text < product.description #muted
      Text < product.sold [prefix:"🔥 ", suffix:" sold this month"] #muted !sm

      ( product.inStock ) ->
        Section Purchase
          Input quantity [type:number, min:1, max:product.stock, default:1]
          Button "Add to cart" #primary => CartStore.add(product)
          Button "Buy now" #secondary => CheckoutService.start(product)
            !error:401 -> /login
            !error:* -> /error/checkout
      :
        Badge "Out of stock" #muted !lg
        Button "Notify when available" #ghost => AlertService.subscribe(product.id)

  Section Reviews
    Text "Reviews" !bold !xl
    Text < `${product.reviews.total} reviews` #muted
    List < product.reviews [paginate:10, layout:list]
```

---

## 5. Full Stack — Complete Feature

Frontend and backend together for the same feature: user management.

```nexus
@React @NestJS @Prisma @PostgreSQL @Tailwind

// ── BACKEND ──────────────────────────────────────

Model User
  Entity id type:uuid !pk
  Entity name [type:string]
  Entity email [type:string, unique]
  Entity role default:user
  Entity createdAt [type:datetime, default:now]
  Entity orders -> Model.Order [many]
  Index email [unique]

Service UserService
  Method create(dto: CreateUserDto)
  Method findById(id: string)
  Method update(id: string, dto: UpdateUserDto)
  Method delete(id: string)
  Method list(filters: UserFilterDto)

Controller UserController [route:/api/v1/users]
  @Auth[mode:jwt]
  @RateLimit[200/min]
  Router ApiV1
    Endpoint POST /               < Payload:CreateUserSchema    => UserService.create()
    Endpoint GET  /               @Auth[role:admin]             => UserService.list()
    Endpoint GET  /:id            @Auth                         => UserService.findById()
    Endpoint PUT  /:id            < Payload:UpdateUserSchema    => UserService.update()
    Endpoint DELETE /:id          @Auth[role:admin]             => UserService.delete()

// ── FRONTEND ─────────────────────────────────────

Store UserStore
  ~users: []
  ~currentUser: null
  ~loading: false
  Action load()
  Action update(id, data)
  Selector activeUsers

Page UserManagement
  @Auth[role:admin]
  Layout Stack
  Section Header [justify:between]
    Text "User Management" !bold !xl
    Button "New user" #primary => ModalStore.open("create-user")

  Section Filters #glass
    Input search [type:search] => UserStore.filter(value)
    Select role [options:all,admin,user] => UserStore.filterByRole(value)

  Table < UserStore.activeUsers [paginate:25, page:~currentPage]
    !error:403 -> /no-access
    !error:500 -> /error/server
```

---

## 6. Testing — Complete Suite

Test suite for the user controller.

```nexus
@Vitest

Suite "UserController — Integration Tests"

  Test "POST /users — creates user successfully" [type:integration] Backend
    handles: POST /api/v1/users
    expects: status:201, body:user-schema
    db: user-created-in-db
    mocks: UserService.create

  Test "POST /users — fails with duplicate email" [type:integration] Backend
    handles: POST /api/v1/users [email:existing]
    expects: status:409, body:duplicate-error
    db: no-changes

  Test "GET /users — requires admin role" [type:integration] Backend
    handles: GET /api/v1/users @Auth[role:user]
    expects: status:403

  Test "GET /users/:id — user not found" [type:integration] Backend
    handles: GET /api/v1/users/non-existent-id
    expects: status:404, body:not-found-error

  Test "PUT /users/:id — updates correctly" [type:integration] Backend
    handles: PUT /api/v1/users/:id
    expects: status:200, body:updated-user
    db: user-updated-in-db

  Test "DELETE /users/:id — only admin can delete" [type:integration] Backend
    handles: DELETE /api/v1/users/:id @Auth[role:user]
    expects: status:403

Suite "UserStore — Unit Tests"

  Test "load users" [type:unit] Frontend
    renders: loading-state, user-list, empty-state
    handles: network-error
    mocks: UserService.list

  Test "filter by search" [type:unit] Frontend
    handles: search-input
    asserts: list-filtered-correctly
```

---

*[← Back to grammar](./grammar.md) · [See operators](./operators.md)*
