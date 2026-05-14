# Ejemplos NEXUS — Casos Reales

<p align="right"><a href="../en/examples.md">🇺🇸 English version</a></p>

Seis ejemplos completos que cubren los casos de uso más comunes del protocolo NEXUS.

---

## 1. Dashboard Completo

Panel de administración con sidebar, estadísticas y tabla paginada.

```nexus
@React @Tailwind

Page Dashboard
  Layout SplitView
    Nav #sidebar
      Image < brand.logo [width:120]
      List < navItems [active:~activeRoute]
      Button "Cerrar sesión" #ghost => AuthService.logout()
        !error:* -> /login

  Section Resumen #glass [cols:4]
    Card "Ingresos Totales"
      Text < stats.ingresos !bold !xl
      Text < stats.variacionMensual #muted
    Card "Pedidos Activos"
      Text < stats.pedidosActivos !bold !xl
    Card "Clientes Nuevos"
      Text < stats.clientesNuevos !bold !xl
    Card "Tasa de Conversión"
      Text < stats.conversion !bold !xl

  Section Pedidos
    ~filtroEstado: "todos"
    Input búsqueda [type:search, placeholder:"Buscar pedido..."]
      => PedidoStore.setFiltro(value)
    Table < Pedido [paginate:20, page:~currentPage]
      !error:500 -> /error/servidor
      !error:network -> /sin-conexion
```

---

## 2. Autenticación con Manejo de Errores

Formulario de login con validación, OAuth y manejo completo de errores.

```nexus
@React @Tailwind

Page Login
  Layout CenteredCard #glass [maxWidth:400]
    Image < brand.logo [width:80]
    Text "Bienvenido de vuelta" !bold !xl
    Text "Inicia sesión en tu cuenta" #muted

    Form LoginForm
      Input email [type:email, required, placeholder:"correo@ejemplo.com"]
      Input contraseña [type:password, required, placeholder:"••••••••"]
      Button "Iniciar sesión" #primary => AuthService.login(email, contraseña)
        !error:401 -> /login?error=credenciales
        !error:403 -> /cuenta-bloqueada
        !error:429 -> /login?error=demasiados-intentos
        !error:network -> /login?error=sin-conexion
        !error:* -> /login?error=general

    Text "o continúa con" #muted [align:center]

    Grid [cols:2 #gap-2]
      Button "Google" #outline => OAuthService.google()
        !error:* -> /login?error=oauth
      Button "GitHub" #outline => OAuthService.github()
        !error:* -> /login?error=oauth

    ( ~recordarme ) ->
      Text "Sesión activa por 30 días" #muted !xs
    :
      Text "Sesión expira al cerrar el navegador" #muted !xs

    Button "¿Olvidaste tu contraseña?" #ghost -> /recuperar-contraseña
```

---

## 3. API REST Completa

Modelo con relaciones y controller con autenticación y rate limiting.

```nexus
@NestJS @Prisma @PostgreSQL

Model Pedido
  Entity id type:uuid !pk
  Entity estado default:pendiente
  Entity total [type:decimal]
  Entity creadoEn [type:datetime, default:now]
  Entity usuario -> Model.Usuario
  Entity items -> Model.ItemPedido [many]
  Entity factura -> Model.Factura [optional]
  Index estado [type:hash]
  Index usuario [type:btree]

Model ItemPedido
  Entity id type:uuid !pk
  Entity cantidad [type:integer]
  Entity precioUnitario [type:decimal]
  Entity pedido -> Model.Pedido [cascade]
  Entity producto -> Model.Producto

Controller PedidoController [route:/api/v1/pedidos]
  policy: esta-autenticado
  @RateLimit[100/min]

  Router ApiV1
    Endpoint POST /
      < Payload:CrearPedidoSchema
      @Auth[mode:jwt]
      => PedidoService.crear()
      !error:400 -> 400
      !error:422 -> 422

    Endpoint GET /
      @Auth[mode:jwt]
      => PedidoService.listarPorUsuario()

    Endpoint GET /:id
      @Auth[mode:jwt]
      => PedidoService.buscarPorId()
      !error:404 -> 404

    Endpoint PUT /:id/estado
      < Payload:ActualizarEstadoSchema
      @Auth[role:admin]
      => PedidoService.actualizarEstado()
      !error:400 -> 400
      !error:404 -> 404

    Endpoint DELETE /:id
      @Auth[role:admin]
      => PedidoService.eliminar()
      !error:404 -> 404
```

---

## 4. E-Commerce — Página de Producto

Página de detalle con carrito global y condicional de stock.

```nexus
@React @Zustand @Tailwind

Store CarritoStore
  ~items: []
  ~total: 0
  Action agregar(producto)
  Action eliminar(productoId)
  Action vaciar()
  Selector totalItems
  Selector subtotal

Page DetalleProducto
  Layout Stack #gap-4
  Section Hero [cols:2]
    Image < producto.imagenes [ratio:4/3, gallery:true]
    Section Info
      Badge < producto.categoria #muted
      Text < producto.nombre !bold !2xl
      Text < producto.precio #accent !xl
      Text < producto.descripcion #muted
      Text < producto.vendidos [prefix:"🔥 ", suffix:" vendidos este mes"] #muted !sm

      ( producto.enStock ) ->
        Section Compra
          Input cantidad [type:number, min:1, max:producto.stock, default:1]
          Button "Agregar al carrito" #primary => CarritoStore.agregar(producto)
          Button "Comprar ahora" #secondary => CheckoutService.iniciar(producto)
            !error:401 -> /login
            !error:* -> /error/checkout
      :
        Badge "Agotado" #muted !lg
        Button "Avisar cuando esté disponible" #ghost => AlertaService.suscribir(producto.id)

  Section Reseñas
    Text "Reseñas" !bold !xl
    Text < `${producto.reseñas.total} reseñas` #muted
    List < producto.reseñas [paginate:10, layout:list]
```

---

## 5. Full Stack — Feature Completo

Frontend y backend juntos para el mismo feature: gestión de usuarios.

```nexus
@React @NestJS @Prisma @PostgreSQL @Tailwind

// ── BACKEND ──────────────────────────────────────

Model Usuario
  Entity id type:uuid !pk
  Entity nombre [type:string]
  Entity email [type:string, unique]
  Entity rol default:usuario
  Entity creadoEn [type:datetime, default:now]
  Entity pedidos -> Model.Pedido [many]
  Index email [unique]

Service UsuarioService
  Method crear(dto: CrearUsuarioDto)
  Method buscarPorId(id: string)
  Method actualizar(id: string, dto: ActualizarUsuarioDto)
  Method eliminar(id: string)
  Method listar(filtros: FiltroUsuarioDto)

Controller UsuarioController [route:/api/v1/usuarios]
  @Auth[mode:jwt]
  @RateLimit[200/min]
  Router ApiV1
    Endpoint POST /               < Payload:CrearUsuarioSchema    => UsuarioService.crear()
    Endpoint GET  /               @Auth[role:admin]               => UsuarioService.listar()
    Endpoint GET  /:id            @Auth                           => UsuarioService.buscarPorId()
    Endpoint PUT  /:id            < Payload:ActualizarUsuarioSchema => UsuarioService.actualizar()
    Endpoint DELETE /:id          @Auth[role:admin]               => UsuarioService.eliminar()

// ── FRONTEND ─────────────────────────────────────

Store UsuarioStore
  ~usuarios: []
  ~usuarioActual: null
  ~cargando: false
  Action cargar()
  Action actualizar(id, datos)
  Selector usuariosActivos

Page GestionUsuarios
  @Auth[role:admin]
  Layout Stack
  Section Header [justify:between]
    Text "Gestión de Usuarios" !bold !xl
    Button "Nuevo usuario" #primary => ModalStore.abrir("crear-usuario")

  Section Filtros #glass
    Input búsqueda [type:search] => UsuarioStore.filtrar(value)
    Select rol [options:todos,admin,usuario] => UsuarioStore.filtrarPorRol(value)

  Table < UsuarioStore.usuariosActivos [paginate:25, page:~currentPage]
    !error:403 -> /sin-acceso
    !error:500 -> /error/servidor
```

---

## 6. Testing — Suite Completa

Suite de pruebas para el Controller de usuarios.

```nexus
@Vitest

Suite "UsuarioController — Tests de Integración"

  Test "POST /usuarios — crea usuario exitosamente" [type:integration] Backend
    handles: POST /api/v1/usuarios
    expects: status:201, body:usuario-schema
    db: usuario-creado-en-db
    mocks: UsuarioService.crear

  Test "POST /usuarios — falla con email duplicado" [type:integration] Backend
    handles: POST /api/v1/usuarios [email:existente]
    expects: status:409, body:error-duplicado
    db: sin-cambios

  Test "GET /usuarios — requiere rol admin" [type:integration] Backend
    handles: GET /api/v1/usuarios @Auth[role:usuario]
    expects: status:403

  Test "GET /usuarios/:id — usuario no encontrado" [type:integration] Backend
    handles: GET /api/v1/usuarios/id-inexistente
    expects: status:404, body:not-found-error

  Test "PUT /usuarios/:id — actualiza correctamente" [type:integration] Backend
    handles: PUT /api/v1/usuarios/:id
    expects: status:200, body:usuario-actualizado
    db: usuario-actualizado-en-db

  Test "DELETE /usuarios/:id — solo admin puede eliminar" [type:integration] Backend
    handles: DELETE /api/v1/usuarios/:id @Auth[role:usuario]
    expects: status:403

Suite "UsuarioStore — Tests Unitarios"

  Test "cargar usuarios" [type:unit] Frontend
    renders: loading-state, lista-de-usuarios, estado-vacío
    handles: error-de-red
    mocks: UsuarioService.listar

  Test "filtrar por búsqueda" [type:unit] Frontend
    handles: input-búsqueda
    asserts: lista-filtrada-correctamente
```

---

*[← Volver a la gramática](./gramatica.md) · [Ver operadores](./operadores.md)*
