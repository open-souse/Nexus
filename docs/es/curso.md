<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <strong>🇪🇸 Español</strong> · <a href="../en/course.md">🇺🇸 English</a>
</p>

# Mini Curso NEXUS — De Cero a Producción

> 14 lecciones progresivas. Cada una tiene concepto, ejemplo real, error común y ejercicio.

**Tiempo estimado:** 2–3 horas  
**Requisitos:** Ninguno. Solo una IA con NEXUS configurado (`nexus init`).

---

## Índice

1. [Por qué NEXUS](#lección-1-por-qué-nexus)
2. [Tu primer blueprint](#lección-2-tu-primer-blueprint)
3. [Estilo, estado y variables](#lección-3-estilo-estado-y-variables)
4. [Componentes UI](#lección-4-componentes-ui)
5. [Binding de datos — `<` y `from`](#lección-5-binding-de-datos---y-from)
6. [Acciones — `=>`](#lección-6-acciones---)
7. [Precondiciones — `!!`](#lección-7-precondiciones---)
8. [Manejo de errores — `!error:`](#lección-8-manejo-de-errores---error)
9. [Paginación — `[paginate:N]`](#lección-9-paginación---paginaten)
10. [Backend — Modelos y entidades](#lección-10-backend--modelos-y-entidades)
11. [Backend — Controllers y Endpoints](#lección-11-backend--controllers-y-endpoints)
12. [Autenticación y seguridad](#lección-12-autenticación-y-seguridad)
13. [Blueprint Full Stack completo](#lección-13-blueprint-full-stack-completo)
14. [Cerrar el ciclo — `nexus verify`](#lección-14-cerrar-el-ciclo---nexus-verify)

---

## Lección 1: Por qué NEXUS

### El problema

Cuando le describes algo a una IA en lenguaje natural, ella tiene que interpretar. Esa interpretación tiene un costo: tokens, ambigüedad y resultados inconsistentes.

```
Prompt natural (100+ tokens):
"Crea una página de login con un formulario que tenga los
campos de email y contraseña, con validación, un botón de
submit que llame a la API de autenticación, y si hay error
401 que redirija al login, si hay error 500 que muestre
un mensaje genérico..."

NEXUS (12 líneas):
Page Login
  Form LoginForm
    Input email [type:email, required]
    Input password [type:password, required]
    Button "Iniciar sesión" => AuthService.login(email, password)
      !error:401 -> /login?error=credenciales
      !error:500 -> /login?error=servidor
```

**Mismo resultado. 90% menos tokens. Cero ambigüedad.**

### Cómo funciona

1. Tú escribes un **blueprint** — la intención estructurada
2. La IA tiene el protocolo NEXUS como contexto (via `nexus init`)
3. La IA genera el código correcto desde el primer intento

NEXUS no es un lenguaje de programación. Es el idioma entre tú y la IA.

---

## Lección 2: Tu primer blueprint

### El concepto

Todo blueprint tiene la misma estructura:

```
@Stack @Framework          ← qué tecnologías usar
OrchestratorName ID        ← qué construir
  OperadorOHijo            ← cómo construirlo
```

La sangría es de **2 espacios**. No tabs.

### Ejemplo mínimo válido

```nexus
@React @Tailwind

Page Inicio
  Text "Bienvenido" !bold !xl
  Button "Entrar" -> /dashboard
```

Esto le dice a la IA:
- Stack: React con Tailwind
- Crear una página llamada `Inicio`
- Con un texto en negrita y grande
- Con un botón que navega a `/dashboard`

### Orquestadores disponibles

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

### ❌ Errores comunes

```nexus
// MAL — orquestador inventado
Pantalla Login          // "Pantalla" no existe

// MAL — tabs en lugar de espacios
Page Login
	Text "Hola"         // tab → error

// BIEN — orquestador válido + 2 espacios
Page Login
  Text "Hola"
```

### 🏋️ Ejercicio

Crea un blueprint para una página `PoliticaPrivacidad` con:
- Un título "Política de Privacidad"
- Un texto descriptivo
- Un botón "Volver" que navega a `/`

<details>
<summary>Ver solución</summary>

```nexus
@React @Tailwind

Page PoliticaPrivacidad
  Text "Política de Privacidad" !bold !xl
  Text "Aquí encontrarás nuestros términos..." #muted
  Button "Volver" -> /
```
</details>

---

## Lección 3: Estilo, estado y variables

### Tokens de diseño — `#`

`#token` aplica estilos o clases a un elemento. Los tokens los define tu proyecto.

```nexus
Section Hero #glass           // glassmorphism
Button "Guardar" #primary     // color primario
Text "Error" #danger          // texto de error
Card #shadow-lg               // sombra grande
```

### Modificadores — `!`

`!modificador` aplica flags de peso visual o comportamiento.

```nexus
Text "Título" !bold !xl       // negrita + tamaño xl
Button "Eliminar" !danger     // peligro (color + estilo)
Input email !required         // campo requerido
Entity id !pk                 // clave primaria (backend)
```

### Estado local — `~`

`~variable: valorInicial` declara estado reactivo local (`useState` en React, `ref` en Vue).

```nexus
Page Contador
  ~count: 0
  Text < ~count !bold !xl
  Button "+1" => ~count++
```

### Variables globales — `$`

`$nombre: valor` declara constantes o valores del proyecto.

```nexus
$brand: "MiApp"
$api-base: "/api/v1"
$primary-color: "#5DCAA5"
```

### Variante responsiva — `|`

```nexus
Grid [cols:1 | cols:3]        // 1 columna en móvil, 3 en desktop
Section [padding:sm | padding:lg]
```

### Repetición — `* N`

```nexus
Card * 6                      // genera 6 cards (útil para skeletons)
SkeletonRow * 3               // 3 filas skeleton de carga
```

### 🏋️ Ejercicio

Crea una sección `Hero` con:
- Fondo glassmorphism
- Título "Plataforma de Gestión" en negrita XL
- Subtítulo en color muted
- Dos columnas en desktop, una en móvil

<details>
<summary>Ver solución</summary>

```nexus
Section Hero #glass [cols:1 | cols:2]
  Text "Plataforma de Gestión" !bold !xl
  Text "Gestiona todo desde un solo lugar" #muted
```
</details>

---

## Lección 4: Componentes UI

### La anatomía de un componente

```nexus
ComponenteUI "Contenido" #estilo !modificador [atributo:valor] => acción -> destino
```

Los atributos van en `[clave:valor]`. Múltiples atributos separados por coma.

### Formularios

```nexus
Form LoginForm
  Input email [type:email, required, placeholder:"correo@ejemplo.com"]
  Input password [type:password, required, minLength:8]
  Button "Iniciar sesión" #primary
```

### Condicional — `( cond ) -> A : B`

Renderizado condicional basado en una expresión:

```nexus
( producto.enStock ) ->
  Button "Agregar al carrito" #primary
:
  Badge "Agotado" #muted

( ?auth ) ->
  Dashboard
:
  LoginPage
```

### Estado de UI — `?`

```nexus
?loading:Skeleton             // si carga → muestra Skeleton
?error:ErrorBanner            // si error → muestra ErrorBanner
?empty:EmptyState             // si vacío → muestra EmptyState
```

### Inyección — `{ }`

Inyecta un archivo o componente existente sin regenerarlo:

```nexus
Section Header { ./Navbar.tsx }
Card { ./ProductCard.tsx }
```

### 🏋️ Ejercicio

Crea una tarjeta de producto que muestre:
- La imagen del producto
- El nombre en negrita
- El precio en color de acento
- Si tiene stock → botón "Comprar"
- Si no tiene stock → badge "Agotado"

<details>
<summary>Ver solución</summary>

```nexus
Card Producto #glass
  Image < producto.imagen [ratio:4/3]
  Text < producto.nombre !bold
  Text < producto.precio #accent !lg
  ( producto.enStock ) ->
    Button "Comprar" #primary
  :
    Badge "Agotado" #muted
```
</details>

---

## Lección 5: Binding de datos — `<` y `from`

### El operador `<`

Vincula un elemento a una fuente de datos, tipo TypeScript o store:

```nexus
Table < Pedido               // tabla con datos de Pedido
Chart < DatosVentas          // gráfico con datos de ventas
Text < usuario.nombre        // texto con valor del campo
Image < producto.thumbnail   // imagen desde campo
```

### El operador `from` — alias legible

`from` es **exactamente igual** a `<`. Úsalo cuando quieras más claridad:

```nexus
// Equivalentes — elige el que prefieras
Table < Pedido [paginate:20]
Table from Pedido [paginate:20]

Chart < DatosVentas
Chart from DatosVentas
```

**Regla:** `from` sin fuente es un error de sintaxis.
```nexus
// MAL
Table from              // ← error: "from" sin fuente

// BIEN
Table from Pedido
```

### Binding en endpoints (backend)

```nexus
Endpoint POST /usuarios < Payload:UsuarioSchema => UsuarioService.crear()
```

### ❌ Errores comunes

```nexus
// MAL — paginate sin binding
Table [paginate:20]             // falta < o from

// BIEN
Table < Pedido [paginate:20]
Table from Pedido [paginate:20]
```

### 🏋️ Ejercicio

Crea un componente `ListaProductos` que muestre:
- Una tabla de productos desde `ProductoStore`
- Un gráfico de ventas desde `ventasMensuales`
- Una imagen del logo de la marca

<details>
<summary>Ver solución</summary>

```nexus
Section ListaProductos
  Chart from ventasMensuales
  Table from ProductoStore
  Image < marca.logo [width:120]
```
</details>

---

## Lección 6: Acciones — `=>`

### El concepto

`=>` despacha una acción: llama a un servicio, actualiza un store o maneja un evento.

```nexus
Button "Guardar" => FormService.guardar()
Input onChange => Store.setFiltro(value)
Form => UsuarioService.crear()
```

### Acciones con parámetros

```nexus
Button "Agregar" => CarritoStore.agregar(producto)
Button "Eliminar" => UsuarioService.eliminar(usuario.id)
Select => FiltroStore.setCategoria(value)
```

### Acciones en endpoints

```nexus
Endpoint POST /ordenes => OrdenService.crear()
Endpoint GET /usuarios/:id => UsuarioService.buscarPorId()
Endpoint DELETE /producto/:id => ProductoService.eliminar()
```

### Múltiples acciones encadenadas

```nexus
Button "Checkout" => CarritoStore.validar()
  => PagoService.procesar()
  -> /confirmacion
```

### ❌ Errores comunes

```nexus
// MAL — acción sin servicio real
Button "Guardar" => guardar()     // ambiguo

// BIEN — servicio explícito
Button "Guardar" => FormService.guardar()
```

### 🏋️ Ejercicio

Crea un formulario de búsqueda que:
- Tenga un input de tipo search
- Al cambiar actualice `BusquedaStore.setQuery(value)`
- Tenga un botón "Limpiar" que llame a `BusquedaStore.limpiar()`

<details>
<summary>Ver solución</summary>

```nexus
Form Busqueda
  Input query [type:search, placeholder:"Buscar..."]
    => BusquedaStore.setQuery(value)
  Button "Limpiar" #ghost => BusquedaStore.limpiar()
```
</details>

---

## Lección 7: Precondiciones — `!!`

### El concepto

`!!` declara precondiciones que deben cumplirse **antes** de ejecutar una acción `=>`. Si alguna falla, la acción no se ejecuta.

Dos formas:
- `!! "mensaje"` — guard semántico (genera validación con ese mensaje de error)
- `!! expresión` — guard lógico (genera `if (!expresión) { throw ... }`)

### Sintaxis

```nexus
!! "descripción del requisito"
!! expresión.lógica > 0
```

### Ejemplo completo

```nexus
Endpoint POST /checkout
  !! "El carrito no puede estar vacío"
  !! carrito.items.length > 0
  !! usuario.autenticado
  => OrderService.crear()
    !error:400 -> /error/validacion
    !error:* -> /error/general
```

**Código generado (NestJS):**
```typescript
async checkout(@Body() dto: CheckoutDto, @Request() req) {
  if (cart.isEmpty())
    throw new BadRequestException('El carrito no puede estar vacío')
  if (carrito.items.length <= 0)
    throw new BadRequestException('Carrito vacío')
  if (!usuario.autenticado)
    throw new UnauthorizedException()
  return await OrderService.crear(dto)
}
```

### Reglas importantes

1. `!!` siempre va **antes** de la línea `=>` que protege
2. Se evalúan de arriba a abajo — el primer fallo detiene todo
3. `!!` sin contenido → error de validación
4. `!!` NUNCA aparece como comentario en el código — se convierte en lógica ejecutable

### ❌ Errores comunes

```nexus
// MAL — !! vacío
!!
!! "   "

// MAL — !! después de =>
=> OrderService.crear()
!! "El carrito no puede estar vacío"  // demasiado tarde

// BIEN
!! "El carrito no puede estar vacío"
=> OrderService.crear()
```

### 🏋️ Ejercicio

Crea un endpoint `POST /transferencia` que:
- Requiera que el saldo sea suficiente
- Requiera que el destinatario exista
- Llame a `TransferenciaService.ejecutar()`

<details>
<summary>Ver solución</summary>

```nexus
Endpoint POST /transferencia
  !! "El saldo debe ser suficiente"
  !! cuenta.saldo >= monto
  !! "El destinatario debe existir"
  !! destinatario.activo
  => TransferenciaService.ejecutar()
    !error:400 -> /error/saldo-insuficiente
    !error:404 -> /error/destinatario-no-encontrado
</details>

---

## Lección 8: Manejo de errores — `!error:`

### El concepto

`!error:código` captura un error específico de la operación padre (`=>` o `<`/`from`) y redirige al destino indicado.

### Códigos válidos

| Código | Cuándo ocurre |
|---|---|
| `400`–`599` | Código HTTP (400, 401, 403, 404, 500…) |
| `timeout` | La petición superó el tiempo límite |
| `network` | Sin conexión / error de red |
| `*` | Comodín — cualquier error no manejado |

### Sintaxis

```nexus
Elemento => Servicio.metodo()
  !error:400 -> /destino
  !error:401 -> /otro-destino
  !error:* -> /error/general

// También válido bajo < y from
Table from Pedido [paginate:20]
  !error:500 -> /error/servidor
  !error:network -> /sin-conexion
```

### Ejemplo real — login completo

```nexus
Button "Iniciar sesión" => AuthService.login(email, password)
  !error:401 -> /login?error=credenciales
  !error:403 -> /cuenta-bloqueada
  !error:429 -> /login?error=demasiados-intentos
  !error:network -> /login?error=sin-conexion
  !error:* -> /login?error=general
```

### El comodín `*`

`!error:*` siempre va **último** — captura todo lo que no manejaron los anteriores.

```nexus
// MAL — el comodín bloquea los específicos
!error:* -> /error/general
!error:401 -> /login      // nunca se alcanza

// BIEN — específicos primero, comodín al final
!error:401 -> /login
!error:500 -> /error/servidor
!error:* -> /error/general
```

### ❌ Errores comunes

```nexus
// MAL — código inválido
!error:600 -> /error       // solo 400–599

// MAL — sin destino
!error:network             // falta -> /destino

// MAL — fuera de contexto (no hay => ni < padre)
Page Login
  !error:401 -> /login     // error: padre inválido
```

### 🏋️ Ejercicio

Completa este blueprint de subida de archivos con manejo de errores para: límite de tamaño (413), no autorizado (401), servidor caído (503) y cualquier otro:

```nexus
Endpoint POST /upload
  !! "Solo se permiten imágenes"
  => ArchivoService.subir()
  // ← añade los !error: aquí
```

<details>
<summary>Ver solución</summary>

```nexus
Endpoint POST /upload
  !! "Solo se permiten imágenes"
  => ArchivoService.subir()
    !error:401 -> /login
    !error:413 -> /error/archivo-muy-grande
    !error:503 -> /error/servicio-no-disponible
    !error:* -> /error/general
```
</details>

---

## Lección 9: Paginación — `[paginate:N]`

### El concepto

`[paginate:N]` genera paginación automática en elementos con binding `<` o `from`. La IA genera el componente completo con controles de navegación, estado de página y lógica de fetch.

### Parámetros

| Parámetro | Descripción | Obligatorio |
|---|---|---|
| `paginate:N` | Ítems por página | Sí (1–500) |
| `page:~variable` | Variable de estado para la página actual | No |
| `layout:grid\|list` | Disposición visual | No |

### Sintaxis

```nexus
Table < Pedido [paginate:20]
Table from Pedido [paginate:20]
Table < Usuario [paginate:10, page:~currentPage]
List < Producto [paginate:12, layout:grid]
Grid from Articulo [paginate:8, layout:grid, cols:4]
```

### Con variable de página controlada

```nexus
Section Pedidos
  ~currentPage: 1
  Table < Pedido [paginate:20, page:~currentPage]
    !error:500 -> /error/servidor
    !error:network -> /sin-conexion
```

### Conflicto con `* N`

`[paginate:]` y `* N` no pueden combinarse:
```nexus
// MAL
Table < Datos [paginate:10] * 3    // error de validación

// BIEN — uno o el otro
Table < Datos [paginate:10]
Card * 3
```

### ❌ Errores comunes

```nexus
// MAL — paginate sin binding
Table [paginate:20]              // falta < o from

// MAL — N fuera de rango
Table < Datos [paginate:600]     // máximo 500

// BIEN
Table from Datos [paginate:20]
```

### 🏋️ Ejercicio

Crea una página `Catalogo` con:
- Una barra de búsqueda que filtre `CatalogoStore`
- Una grilla de productos (4 columnas, 12 por página) con control de página
- Manejo de error 500

<details>
<summary>Ver solución</summary>

```nexus
Page Catalogo
  ~currentPage: 1
  Input busqueda [type:search] => CatalogoStore.filtrar(value)
  Grid from CatalogoStore.productos [paginate:12, layout:grid, cols:4, page:~currentPage]
    !error:500 -> /error/servidor
```
</details>

---

## Lección 10: Backend — Modelos y entidades

### El concepto

`Model` define entidades de base de datos. La IA genera el schema completo con tipos, constraints, índices y relaciones según el ORM activo (Prisma, TypeORM, Mongoose, etc.).

### Sintaxis básica

```nexus
Model NombreModelo
  Entity campo type:tipo
  Entity campo [type:tipo, default:valor]
  Entity campo !pk
  Index campo [unique]
```

### Tipos de datos comunes

```nexus
Entity id type:uuid !pk
Entity nombre [type:string]
Entity precio [type:decimal]
Entity edad [type:integer]
Entity activo [type:boolean, default:true]
Entity creadoEn [type:datetime, default:now]
Entity estado [enum:pendiente,activo,inactivo, default:pendiente]
```

### Relaciones entre modelos — `-> Model.Nombre`

```nexus
Entity usuario -> Model.Usuario              // uno a uno requerido
Entity items -> Model.Producto [many]        // uno a muchos
Entity categoria -> Model.Categoria [optional]  // opcional (NULL)
Entity facturas -> Model.Factura [many, cascade]  // cascada
```

### Ejemplo completo

```nexus
@NestJS @Prisma @PostgreSQL

Model Pedido
  Entity id type:uuid !pk
  Entity estado [enum:pendiente,pagado,enviado,entregado, default:pendiente]
  Entity total [type:decimal]
  Entity creadoEn [type:datetime, default:now]
  Entity usuario -> Model.Usuario
  Entity items -> Model.ItemPedido [many]
  Entity factura -> Model.Factura [optional]
  Index estado [type:hash]
  Index creadoEn [type:btree]
```

### 🏋️ Ejercicio

Modela una entidad `Reseña` con:
- ID único
- Calificación del 1 al 5
- Texto del comentario
- Fecha de creación automática
- Relación con `Producto` (obligatoria)
- Relación con `Usuario` (obligatoria)
- Índice en calificación

<details>
<summary>Ver solución</summary>

```nexus
Model Reseña
  Entity id type:uuid !pk
  Entity calificacion [type:integer, min:1, max:5]
  Entity comentario [type:string]
  Entity creadoEn [type:datetime, default:now]
  Entity producto -> Model.Producto
  Entity usuario -> Model.Usuario
  Index calificacion [type:btree]
```
</details>

---

## Lección 11: Backend — Controllers y Endpoints

### El concepto

`Controller` agrupa los endpoints de un recurso. `Router` organiza rutas anidadas. `Endpoint` define una ruta específica.

### Estructura

```nexus
Controller NombreController [route:/base]
  Router ApiV1
    Endpoint MÉTODO /ruta
      // operadores del endpoint
    Endpoint MÉTODO /ruta/:param
      // ...
```

### Métodos HTTP disponibles

`GET`, `POST`, `PUT`, `PATCH`, `DELETE`

### Ejemplo completo — CRUD

```nexus
@NestJS @Prisma

Controller ProductoController [route:/api/v1/productos]
  @Auth[mode:jwt]
  @RateLimit[200/min]

  Router ApiV1
    Endpoint GET /
      Table from Producto [paginate:20]
      => ProductoService.listar()

    Endpoint GET /:id
      => ProductoService.buscarPorId()
      !error:404 -> 404

    Endpoint POST /
      < Payload:CrearProductoSchema
      => ProductoService.crear()
      !error:400 -> 400
      !error:409 -> 409

    Endpoint PUT /:id
      < Payload:ActualizarProductoSchema
      @Auth[role:admin]
      => ProductoService.actualizar()
      !error:404 -> 404

    Endpoint DELETE /:id
      @Auth[role:admin]
      => ProductoService.eliminar()
      !error:404 -> 404
```

### Service — lógica de negocio

```nexus
Service ProductoService
  Method listar(filtros: FiltroProductoDto)
  Method buscarPorId(id: string)
  Method crear(dto: CrearProductoDto)
  Method actualizar(id: string, dto: ActualizarProductoDto)
  Method eliminar(id: string)
```

### 🏋️ Ejercicio

Crea el controller de `Comentarios` con:
- `GET /comentarios` — listar todos (público, 20 por página)
- `POST /comentarios` — crear (requiere auth)
- `DELETE /comentarios/:id` — eliminar (requiere rol admin)

<details>
<summary>Ver solución</summary>

```nexus
Controller ComentarioController [route:/api/comentarios]
  Router ApiV1
    Endpoint GET /
      Table from Comentario [paginate:20]
      => ComentarioService.listar()

    Endpoint POST /
      @Auth[mode:jwt]
      < Payload:CrearComentarioSchema
      => ComentarioService.crear()
      !error:400 -> 400

    Endpoint DELETE /:id
      @Auth[role:admin]
      => ComentarioService.eliminar()
      !error:404 -> 404
```
</details>

---

## Lección 12: Autenticación y seguridad

### `@Auth` — Autenticación

```nexus
@Auth               // cualquier usuario autenticado
@Auth[mode:jwt]     // JWT específicamente
@Auth[role:admin]   // requiere rol admin
@Auth[public]       // explícitamente público
```

Puede ir al nivel del controller (aplica a todos los endpoints) o en un endpoint específico:

```nexus
Controller UsuarioController [route:/api/usuarios]
  @Auth[mode:jwt]           // ← aplica a TODOS los endpoints

  Router ApiV1
    Endpoint GET /           // hereda auth del controller
    Endpoint GET /publico
      @Auth[public]         // ← sobreescribe: este es público
    Endpoint DELETE /:id
      @Auth[role:admin]     // ← sobreescribe: solo admins
```

### `@RateLimit` — Límite de frecuencia

```nexus
@RateLimit[100/min]          // 100 peticiones por minuto
@RateLimit[10/sec]           // 10 por segundo
@RateLimit[1000/hora]        // 1000 por hora
```

### `@install` — Dependencias JIT

Declara que el proyecto necesita un paquete. `nexus verify` lo confirma en `package.json`:

```nexus
@install bcrypt
@install jsonwebtoken
@install-dev @types/jsonwebtoken
```

### `@modify` — Edición segura

Le dice a la IA: "solo cambia lo que declaro, no toques nada más":

```nexus
@modify [preserve:all]
Page Dashboard
  Navbar [locked]           // no tocar este componente
  Section NuevaBanner [new] // solo agregar esto
    Text "¡Nuevo feature!" #accent
```

### Ejemplo — sistema auth completo

```nexus
@NestJS @Prisma
@install bcrypt
@install jsonwebtoken

Model Usuario
  Entity id type:uuid !pk
  Entity email [type:string, unique]
  Entity password [type:string, hashed]
  Entity rol [enum:user,admin, default:user]
  Entity activo [type:boolean, default:true]
  Index email [unique]

Controller AuthController [route:/api/auth]
  Router ApiV1
    Endpoint POST /register
      !! "El email no debe estar registrado"
      < Payload:RegisterSchema
      => AuthService.register()
        !error:409 -> /error/email-existe
        !error:400 -> /error/datos-invalidos

    Endpoint POST /login
      !! "Las credenciales deben ser válidas"
      < Payload:LoginSchema
      => AuthService.login()
        !error:401 -> /error/credenciales-invalidas
        !error:403 -> /error/cuenta-bloqueada

    Endpoint POST /logout
      @Auth[mode:jwt]
      => AuthService.logout()

    Endpoint POST /refresh
      !! "El refresh token debe ser válido"
      => AuthService.refresh()
        !error:401 -> /error/token-invalido
```

### 🏋️ Ejercicio

Crea un endpoint `PATCH /usuarios/:id/cambiar-password` que:
- Requiera JWT
- Verifique que la contraseña actual sea correcta
- Verifique que la nueva contraseña tenga mínimo 8 caracteres
- Llame a `UsuarioService.cambiarPassword()`

<details>
<summary>Ver solución</summary>

```nexus
Endpoint PATCH /:id/cambiar-password
  @Auth[mode:jwt]
  !! "La contraseña actual debe ser correcta"
  !! "La nueva contraseña debe tener mínimo 8 caracteres"
  !! nuevaPassword.length >= 8
  < Payload:CambiarPasswordSchema
  => UsuarioService.cambiarPassword()
    !error:401 -> /error/password-incorrecta
    !error:400 -> /error/password-invalida
```
</details>

---

## Lección 13: Blueprint Full Stack completo

Juntamos todo en un feature real: **gestión de tareas** con frontend y backend.

```nexus
@React @NestJS @Prisma @PostgreSQL @Tailwind
@install date-fns

// ── BACKEND ──────────────────────────────────────────

Model Tarea
  Entity id type:uuid !pk
  Entity titulo [type:string]
  Entity descripcion [type:string, optional]
  Entity estado [enum:pendiente,en-progreso,completada, default:pendiente]
  Entity prioridad [enum:baja,media,alta, default:media]
  Entity fechaLimite [type:datetime, optional]
  Entity creadoEn [type:datetime, default:now]
  Entity usuario -> Model.Usuario
  Index estado [type:hash]
  Index usuario [type:btree]

Service TareaService
  Method listar(usuarioId: string, filtros: FiltroTareaDto)
  Method buscarPorId(id: string)
  Method crear(dto: CrearTareaDto)
  Method actualizar(id: string, dto: ActualizarTareaDto)
  Method eliminar(id: string)
  Method completar(id: string)

Controller TareaController [route:/api/tareas]
  @Auth[mode:jwt]
  @RateLimit[300/min]

  Router ApiV1
    Endpoint GET /
      Table from Tarea [paginate:20]
      => TareaService.listar()

    Endpoint POST /
      !! "El título no puede estar vacío"
      < Payload:CrearTareaSchema
      => TareaService.crear()
        !error:400 -> 400

    Endpoint PATCH /:id/completar
      !! "La tarea debe existir y pertenecer al usuario"
      => TareaService.completar()
        !error:404 -> 404
        !error:403 -> 403

    Endpoint DELETE /:id
      => TareaService.eliminar()
        !error:404 -> 404

// ── FRONTEND ─────────────────────────────────────────

Store TareaStore
  ~tareas: []
  ~filtroEstado: "todas"
  ~cargando: false
  Action cargar()
  Action crear(tarea)
  Action completar(id)
  Action eliminar(id)
  Selector tareasFiltradas
  Selector tareasCompletadas

Page GestionTareas
  @Auth[mode:jwt]
  Layout Stack

  Section Header [justify:between]
    Text "Mis Tareas" !bold !xl
    Button "Nueva tarea" #primary => ModalStore.abrir("crear-tarea")

  Section Filtros #glass
    ~filtroActivo: "todas"
    Button "Todas" [active:~filtroActivo==="todas"] => TareaStore.filtrar("todas")
    Button "Pendientes" => TareaStore.filtrar("pendiente")
    Button "En progreso" => TareaStore.filtrar("en-progreso")
    Button "Completadas" => TareaStore.filtrar("completada")

  ( ~cargando ) ->
    SkeletonRow * 5
  :
    Section ListaTareas
      Table from TareaStore.tareasFiltradas [paginate:20, page:~currentPage]
        !error:500 -> /error/servidor
        !error:network -> /sin-conexion

  Modal CrearTarea
    Form NuevaTareaForm
      Input titulo [required, placeholder:"¿Qué necesitas hacer?"]
      Input descripcion [type:textarea, placeholder:"Descripción opcional"]
      Select prioridad [options:baja,media,alta, default:media]
      Input fechaLimite [type:date, optional]
      !! "El título no puede estar vacío"
      Button "Crear tarea" #primary => TareaService.crear()
        !error:400 -> /error/validacion
      Button "Cancelar" #ghost => ModalStore.cerrar()
```

---

## Lección 14: Cerrar el ciclo — `nexus verify`

### El problema que resuelve

La IA generó código. ¿Realmente implementó todo lo que declaraste en el blueprint? `nexus verify` responde esa pregunta sin que tengas que leer el código completo.

### Uso básico

```bash
# Verificar blueprint contra código generado
nexus verify tareas.nexus ./src

# Salida JSON para CI/CD
nexus verify tareas.nexus ./src --json
```

### Ejemplo de salida

```
⬡ nexus verify — tareas.nexus

  ✓ [auth] @Auth[mode:jwt] → src/auth.guard.ts
  ✓ [precondition] "El título no puede estar vacío" → src/tarea.service.ts
  ✓ [action] TareaService.crear() → src/tarea.controller.ts
  ✓ [action] TareaService.completar() → src/tarea.controller.ts
  ✗ [error handler] !error:403 -> 403
  ✓ [endpoint] POST /api/tareas → src/tarea.controller.ts
  ✓ [pagination] Table from Tarea → src/tarea.service.ts
  ✓ [dependency] date-fns → package.json

  7 passed  1 failed
```

El `✗` en `!error:403` te dice exactamente qué falta: el 403 no está manejado en el código.

### Qué verifica

| Tipo | Ejemplo en blueprint | Qué busca en el código |
|---|---|---|
| `auth` | `@Auth[mode:jwt]` | JWT guard, `UseGuards`, `Bearer` |
| `assertion` | `!! "El título..."` | La cadena literal en algún archivo |
| `error-handler` | `!error:403` | El código HTTP en algún archivo |
| `action` | `=> TareaService.crear()` | `TareaService.crear` en algún archivo |
| `install` | `@install date-fns` | `date-fns` en `package.json` |
| `endpoint` | `Endpoint POST /api/tareas` | La ruta base en algún archivo |
| `pagination` | `[paginate:20]` | `skip`, `take`, `limit`, `offset` |

### Integrar en CI/CD

```yaml
# .github/workflows/verify.yml
- name: Verify blueprint implementation
  run: nexus verify blueprints/tareas.nexus ./src --json | tee verify-results.json
- name: Check all items passed
  run: |
    FAILED=$(cat verify-results.json | jq '[.[] | select(.found == false)] | length')
    if [ "$FAILED" -gt 0 ]; then exit 1; fi
```

### API programática

```typescript
import { extractContract, verifyContract } from 'nxlang'
import fs from 'fs'
import path from 'path'

const blueprint = fs.readFileSync('tareas.nexus', 'utf-8')
const items = extractContract(blueprint)

const codeFiles = new Map<string, string>()
// cargar archivos de src/...

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const results = verifyContract(items, codeFiles, packageJson)

const failed = results.filter(r => !r.found)
if (failed.length > 0) {
  console.error('Items no implementados:')
  failed.forEach(r => console.error(`  ✗ [${r.item.type}] ${r.item.declaration}`))
  process.exit(1)
}
```

---

## Operadores de consulta y control avanzado

### `??` — Consulta sin salir de NEXUS

Haz una pregunta a la IA sin salir del modo NEXUS. Responde brevemente y continúa:

```nexus
Page Checkout
  ?? "¿Debería usar Zustand o Context para el estado del carrito aquí?"
  Store CarritoStore
    // ...
```

### `[new]` y `[locked]` — Control de modificación

```nexus
@modify [preserve:all]
Page Dashboard
  Navbar [locked]                    // no regenerar
  Section BannerPromocion [new]      // solo añadir esto
    Text "¡Nuevo! 20% de descuento" #accent
    Button "Ver oferta" -> /promo
```

### `[animate:]`, `[hover:]`, `[a11y:]` — UI avanzada

```nexus
Modal CrearUsuario [animate: fade-in, duration: 200ms]
  Card [hover: scale-102, transition: 150ms]
    Button "Cerrar" [a11y: aria-label="Cerrar modal"]
```

### `[inherit:siblings]`, `[cascade:children]`, `[position:move-to:N]`

```nexus
Button "Nuevo" [new, inherit:siblings]      // hereda estilo de otros botones
Section [cascade:children]                  // propaga estilos a hijos
Card [position:move-to:1]                   // mueve a primera posición
```

---

## Resumen — Los 20 operadores de NEXUS

| Operador | Para qué sirve |
|---|---|
| `@` | Directiva de stack / framework |
| `@modify` | Edición segura — solo lo declarado |
| `@Auth` | Autenticación en endpoint o recurso |
| `@RateLimit` | Límite de peticiones |
| `@install` | Declarar dependencia del proyecto |
| `#` | Token de diseño o estilo |
| `$` | Variable global / constante |
| `~` | Estado local reactivo |
| `\|` | Variante responsiva |
| `* N` | Repetir N veces |
| `?` | Estado de UI (loading/error/empty) |
| `!` | Modificador de prioridad visual |
| `!!` | Precondición antes de `=>` |
| `!error:` | Captura errores de `=>` o `<`/`from` |
| `->` | Navegación / relación entre modelos |
| `=>` | Acción / efecto secundario |
| `<` | Binding de datos |
| `from` | Binding de datos (alias legible de `<`) |
| `{ }` | Inyectar archivo existente |
| `??` | Consulta rápida a la IA |

---

## Proyecto final — Pon a prueba lo aprendido

Construye el blueprint completo de una aplicación de **reservas de turno** con:

**Backend:**
- Modelo `Turno` con: id, fecha, hora, estado, profesional → `Model.Profesional`, cliente → `Model.Usuario`
- CRUD completo de turnos con auth JWT
- Endpoint especial `POST /turnos/:id/cancelar` con precondición de que el turno no esté ya cancelado

**Frontend:**
- Page `MisTurnos` con lista paginada de los turnos del usuario
- Formulario para crear un nuevo turno
- Condicional: si no hay turnos → mostrar "No tenés turnos agendados"
- Manejo de error de red y servidor

<details>
<summary>Ver solución</summary>

```nexus
@React @NestJS @Prisma @PostgreSQL @Tailwind

Model Turno
  Entity id type:uuid !pk
  Entity fecha [type:date]
  Entity hora [type:time]
  Entity estado [enum:pendiente,confirmado,cancelado, default:pendiente]
  Entity profesional -> Model.Profesional
  Entity cliente -> Model.Usuario
  Index fecha [type:btree]
  Index estado [type:hash]

Controller TurnoController [route:/api/turnos]
  @Auth[mode:jwt]
  @RateLimit[100/min]

  Router ApiV1
    Endpoint GET /
      Table from Turno [paginate:10]
      => TurnoService.listarPorUsuario()

    Endpoint POST /
      !! "La fecha no puede ser en el pasado"
      !! "El profesional debe estar disponible"
      < Payload:CrearTurnoSchema
      => TurnoService.crear()
        !error:400 -> 400
        !error:409 -> 409

    Endpoint POST /:id/cancelar
      !! "El turno no puede estar ya cancelado"
      !! turno.estado !== "cancelado"
      => TurnoService.cancelar()
        !error:404 -> 404
        !error:400 -> 400

    Endpoint DELETE /:id
      @Auth[role:admin]
      => TurnoService.eliminar()
        !error:404 -> 404

Page MisTurnos
  @Auth[mode:jwt]
  ~currentPage: 1
  Layout Stack

  Section Header [justify:between]
    Text "Mis Turnos" !bold !xl
    Button "Nuevo turno" #primary => ModalStore.abrir("nuevo-turno")

  ( TurnoStore.turnos.length === 0 ) ->
    Section Vacio
      Text "No tenés turnos agendados" #muted
      Button "Agendar primer turno" #primary => ModalStore.abrir("nuevo-turno")
  :
    Table from TurnoStore.turnos [paginate:10, page:~currentPage]
      !error:500 -> /error/servidor
      !error:network -> /sin-conexion

  Modal NuevoTurno
    Form ReservaTurnoForm
      Select profesional [options:TurnoStore.profesionales]
      Input fecha [type:date, required]
      Select hora [options:TurnoStore.horasDisponibles]
      !! "La fecha debe ser futura"
      !! "El horario debe estar disponible"
      Button "Confirmar turno" #primary => TurnoService.crear()
        !error:409 -> /error/turno-ocupado
        !error:400 -> /error/datos-invalidos
      Button "Cancelar" #ghost => ModalStore.cerrar()
```
</details>

---

## Próximos pasos

- [Referencia completa de gramática](./gramatica.md)
- [Diccionario de operadores](./operadores.md)
- [Más ejemplos reales](./ejemplos.md)
- [Roadmap del protocolo](./roadmap.md)
- [Proponer extensión via RFC](./rfcs/RFC-0001-plantilla.md)

---

*NEXUS Protocol v4.3.1 — nexuslang.dev*
