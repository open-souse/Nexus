# NEXUS Protocol — Claude Code Skill

## Qué es NEXUS

NEXUS es un protocolo minimalista de comunicación Humano-IA. En vez de describir componentes en lenguaje natural, declaras la intención en una sintaxis estructurada que elimina la ambigüedad.

Cuando esta skill está activa, Claude Code debe:
1. Leer el requerimiento del usuario
2. Generar primero un blueprint NEXUS
3. Validar el blueprint con `npx nxlang validate`
4. Generar el código a partir del blueprint validado

**Nunca generar código sin antes escribir el blueprint NEXUS correspondiente.**

---

## Gramática NEXUS

### Estructura base

```nexus
@Stack @Framework
OrchestratorName Identificador
  OperadorOSubOrquestador
```

### Directivas de Stack (@)
Definen el contexto tecnológico. Van al inicio del archivo.

```nexus
@React @Tailwind          // Frontend React con Tailwind
@NestJS @Prisma           // Backend NestJS con Prisma ORM
@React @NestJS @MongoDB   // Full stack
@Vue @Express             // Vue + Express
@Next @Supabase           // Next.js + Supabase
```

### Orquestadores válidos

**Frontend:**
```
Page, Layout, Section, Form, Table, Chart, Card, Button, 
Text, Image, Input, Badge, Nav, Navbar, Header, Grid, 
List, Modal, Select, Skeleton, Stack, Field
```

**Backend:**
```
Model, Controller, Router, Middleware, Service, Endpoint,
Worker, Queue, CronJob, Schema, Guard, Interceptor,
Payload, Entity, Relation, Repository
```

**Testing:**
```
Test, Suite, renders, handles, asserts, mocks, expects,
status, body, db
```

**Especiales:**
```
Action, Selector, Method, Auth, Response, Frontend, 
Backend, components, hooks, types
```

---

## Operadores

### @ — Directiva de stack
```nexus
@React @Tailwind @Prisma
```

### # — Token de diseño/etiqueta
```nexus
Section Hero #glass        // aplica estilo glassmorphism
Button "Enviar" #primary   // botón primario
Text "Error" #danger       // texto de error
```

### $ — Variable de entorno
```nexus
$DATABASE_URL
$JWT_SECRET
```

### ~ — Estado reactivo
```nexus
~loading
~userList
~currentPage
```

### ` ` — Clase directa
```nexus
Section Hero `min-h-screen flex items-center`
```

### * N — Repetición
```nexus
Card * 6    // genera 6 cards
```

### ? — Opcional/Condicional
```nexus
Input description ?    // campo opcional
```

### ! — Modificador
```nexus
Text < product.name !bold !xl    // negrita y grande
Input email !required            // campo requerido
Entity id !pk                    // primary key
Entity email [unique]            // campo único
```

### !! — Aserción (precondición explícita)
Hace explícitas las condiciones que deben cumplirse ANTES de ejecutar una acción.
```nexus
Endpoint POST /checkout
  !! "El carrito no puede estar vacío"
  !! carrito.items.length > 0
  !! usuario.autenticado
  => OrderService.crear()
  !error:400 -> /error/validacion
```

La IA genera guards ejecutables, no comentarios:
```typescript
if (carrito.items.length === 0) throw new BadRequestException('El carrito no puede estar vacío')
if (!usuario.autenticado) throw new UnauthorizedException()
return await OrderService.crear(payload)
```

### !error:código — Manejo de errores
```nexus
!error:404 -> /not-found
!error:401 -> /login
!error:500 -> /error/server
```

### -> — Relación/Navegación
```nexus
Entity usuario -> Model.Usuario    // relación de datos
-> /dashboard                      // navegación
( condicion ) ->                   // condicional
```

### => — Acción
```nexus
Button "Guardar" => api.save()
Endpoint POST /users => UserService.create()
```

### < — Data binding
```nexus
Table < Usuario              // tabla con datos de Usuario
Text < product.nombre        // texto con dato del producto
Image < user.avatar          // imagen con dato
```

### [paginate:N] — Paginación
```nexus
Table < Producto [paginate:20]
```

### [type:X] — Tipo de dato
```nexus
Entity precio [type:decimal]
Entity fecha [type:date]
Input edad [type:number]
```

### -> Model.Nombre — Relación entre modelos
```nexus
Entity usuario -> Model.Usuario
Entity productos -> Model.Producto [many]
```

### @Auth — Autenticación
```nexus
@Auth[mode:jwt]
@Auth[role:admin]
@Auth[public]
```

### @install / @install-dev — Dependencias JIT
```nexus
@install axios
@install-dev typescript
```

### [paginate:N, layout:grid] — Opciones múltiples
```nexus
Grid < Producto [paginate:12, layout:grid, cols:3]
```

### ( condicion ) -> / : — Condicional
```nexus
( usuario.activo ) ->
  Button "Ver perfil" => router.push('/perfil')
:
  Badge "Inactivo" #muted
```

---

## Ejemplos completos

### E-commerce — Página de producto
```nexus
@React @Tailwind
Page ProductoDetalle
  @Auth[public]
  Layout Stack
  Section Hero #glass
    Image < producto.imagen [ratio:16/9]
    Text < producto.nombre !bold !xl
    Text < producto.precio #accent !bold
    Text < producto.descripcion #muted
  Section Acciones
    ( producto.stock > 0 ) ->
      Button "Agregar al carrito" => CarritoStore.agregar(producto)
    :
      Badge "Agotado" #muted
  Section Relacionados
    Grid < ProductosRelacionados [paginate:4, layout:grid, cols:4]
```

### E-commerce — API de órdenes
```nexus
@NestJS @Prisma
Model Orden
  Entity id !pk
  Entity usuario -> Model.Usuario
  Entity productos -> Model.Producto [many]
  Entity total [type:decimal]
  Entity estado default:pendiente [enum:pendiente,pagado,enviado,entregado]
  Entity direccion [type:string]

Controller OrdenController
  @Auth[mode:jwt]
  Router ApiV1
    Endpoint POST /ordenes
      !! "El carrito no puede estar vacío"
      !! carrito.items.length > 0
      !! "El usuario debe tener dirección registrada"
      => OrdenService.crear()
      !error:400 -> /error/carrito-vacio
      !error:402 -> /error/sin-direccion

    Endpoint GET /ordenes
      Table < Orden [paginate:20]
      => OrdenService.listar()

    Endpoint GET /ordenes/:id
      => OrdenService.buscar()
      !error:404 -> /error/orden-no-encontrada

    Endpoint PATCH /ordenes/:id/estado
      !! "Solo admins pueden cambiar el estado"
      @Auth[role:admin]
      => OrdenService.actualizarEstado()
```

### Auth completa
```nexus
@NestJS @Prisma
Model Usuario
  Entity id !pk
  Entity email [type:string, unique]
  Entity password [type:string, hashed]
  Entity nombre [type:string]
  Entity role default:user [enum:user,admin]
  Entity activo default:true

Controller AuthController
  Router ApiV1
    Endpoint POST /auth/register
      !! "El email no debe estar registrado"
      => AuthService.register()
      !error:409 -> /error/email-existe

    Endpoint POST /auth/login
      !! "Las credenciales deben ser válidas"
      => AuthService.login()
      !error:401 -> /error/credenciales-invalidas

    Endpoint POST /auth/logout
      @Auth[mode:jwt]
      => AuthService.logout()

    Endpoint POST /auth/refresh
      !! "El refresh token debe ser válido"
      => AuthService.refresh()
      !error:401 -> /error/token-invalido
```

---

## Reglas de uso

### SIEMPRE hacer esto:
1. Generar el blueprint NEXUS completo antes de cualquier código
2. Incluir directivas de stack (@React, @NestJS, etc.)
3. Usar !! para precondiciones en endpoints con acciones
4. Usar !error: para manejo de errores en endpoints
5. Usar < para data binding en componentes con datos
6. Validar el blueprint antes de generar código:
```bash
npx nxlang validate archivo.nexus
```

### NUNCA hacer esto:
1. Generar código sin el blueprint NEXUS previo
2. Usar orquestadores inventados (solo los de la lista)
3. Omitir las precondiciones !! en operaciones críticas
4. Usar lenguaje natural donde va sintaxis NEXUS

---

## Flujo de trabajo con esta skill

```
Usuario pide: "Crea una tienda de productos con carrito"
      ↓
Claude Code genera el blueprint NEXUS completo
      ↓
Claude Code valida: npx nxlang validate tienda.nexus
      ↓
Si válido: genera el código
Si inválido: corrige el blueprint y revalida
      ↓
Entrega el código organizado por archivos
```

---

## CLI de nxlang

```bash
# Instalar globalmente
npm install -g nxlang

# Inicializar proyecto NEXUS
nexus init

# Validar un archivo
nexus validate archivo.nexus

# Instalar dependencias declaradas en el blueprint
nexus install archivo.nexus

# Generar contexto para la IA
nexus context

# Ver la gramática completa
nexus grammar
```

---

## Instalación de esta skill

```bash
# Copiar a tu carpeta de skills de Claude Code
nexus install --skill claude-code

# O manualmente:
cp skills/claude-code/SKILL.md /ruta/a/tus/skills/nexus/SKILL.md
```

---

*NEXUS Protocol v4.3.0 — nexuslang.dev*
