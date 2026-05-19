# NEXUS Protocol — Gramática de Referencia

> Versión neutral. Compatible con Claude Code, Cursor, ChatGPT, Gemini y cualquier IA.
> Este archivo es generado automáticamente por `nexus init`.

---

## Qué es NEXUS

NEXUS es un protocolo minimalista de comunicación Humano-IA. En vez de describir componentes en lenguaje natural, declaras la intención en una sintaxis estructurada que elimina la ambigüedad.

---

## Estructura base

```nexus
@Stack @Framework
OrchestratorName Identificador
  OperadorOSubOrquestador
```

---

## Directivas de Stack (@)

```nexus
@React @Tailwind          // Frontend React con Tailwind
@NestJS @Prisma           // Backend NestJS con Prisma ORM
@React @NestJS @MongoDB   // Full stack
@Vue @Express             // Vue + Express
@Next @Supabase           // Next.js + Supabase
```

---

## Orquestadores válidos

**Frontend / Estructura:**
```
Page, Layout, Section, Store, Type, Create,
Card, Button, Text, Image, Input, Badge, Nav, Navbar,
Header, Grid, List, Form, Table, Chart, Modal, Select,
Skeleton, Stack, Field
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

| Operador | Nombre | Descripción | Ejemplo |
|---|---|---|---|
| `@` | Directiva | Stack / framework / comportamiento | `@React @CleanCode` |
| `@modify` | Safe Edit | Solo aplica el cambio explícito, nada más | `@modify [preserve:all]` |
| `#` | Token de diseño | Token de diseño o clase de estilo | `Button #primary #glass` |
| `$` | Variable global | Constante global o valor DNA | `$brand: "Nexus"` |
| `~` | Estado local | Estado reactivo local (useState/Signals) | `~isOpen: false` |
| `\|` | Responsive | Variante responsive | `Grid [cols:1 \| cols:3]` |
| `* N` | Multiplicador | Repite elemento N veces | `Card * 3` |
| `?` | Estado UI | Estado condicional de UI | `?loading ?error ?empty` |
| `!` | Modificador | Peso visual o importancia | `Text !bold !danger` |
| `->` | Navegación | Ruta o flujo de navegación / relación | `Button -> /dashboard` |
| `=>` | Acción | API call, handler, o acción async | `Button => login()` |
| `<` | Data binding | Vincula a tipo de dato o fuente | `Table < User` |
| `{ }` | Inject | Inyecta código o archivo existente | `{ ./UserCard.tsx }` |
| `??` | Query | Pregunta sin salir del modo NEXUS | `?? "¿Uso Zustand?"` |
| `( cond ) -> A : B` | Condicional | Renderizado condicional | `( ?auth ) -> Home : Login` |
| `[new]` | Nuevo | Marca elemento recién añadido | `Button [new]` |
| `[locked]` | Protegido | No modificar ni regenerar | `Navbar [locked]` |
| `[animate:]` | Animación | Animación de entrada/salida | `[animate: fade-in, duration: 200ms]` |
| `[hover:]` | Hover | Estilos hover o focus | `[hover: scale-105]` |
| `[a11y:]` | Accesibilidad | Atributos ARIA | `[a11y: aria-label="Cerrar"]` |
| `[inherit:siblings]` | Heredar | Hereda estilo de hermanos | `Button [new, inherit:siblings]` |
| `[cascade:children]` | Cascada | Propaga estilos padre a hijos | `Section [cascade:children]` |
| `[position:move-to:N]` | Mover | Mueve elemento a posición N | `[position:move-to:1]` |
| `!pk` | Primary Key | Constraint de clave primaria | `Entity id !pk` |
| `@Auth` | Autenticación | Requiere auth en endpoint o recurso | `@Auth[mode:jwt]` |
| `@RateLimit` | Rate Limiting | Limita frecuencia de peticiones | `@RateLimit[100/min]` |
| `!error:código` | Error Handler | Captura errores HTTP y redirige | `!error:400 -> /error` |
| `!!` | Aserción | Precondición explícita antes de `=>` | `!! "Carrito no vacío"` |
| `[paginate:N]` | Paginación | Paginación nativa sobre elemento `<` | `Table < User [paginate:20]` |
| `-> Model.Nombre` | Relación | Relación tipada entre modelos DB | `Entity items -> Model.Product [many]` |
| `@install` | JIT Install | Instalación on-demand de paquete | `@install lodash` |

---

## Ejemplos

### Frontend
```nexus
@React @Tailwind
Page ProductoDetalle
  @Auth[public]
  Layout Stack
  Section Hero #glass
    Image < producto.imagen [ratio:16/9]
    Text < producto.nombre !bold !xl
    Text < producto.precio #accent !bold
  Section Acciones
    ( producto.stock > 0 ) ->
      Button "Agregar al carrito" => CarritoStore.agregar(producto)
    :
      Badge "Agotado" #muted
```

### Backend
```nexus
@NestJS @Prisma
Model Orden
  Entity id !pk
  Entity usuario -> Model.Usuario
  Entity productos -> Model.Producto [many]
  Entity total [type:decimal]
  Entity estado default:pendiente [enum:pendiente,pagado,enviado,entregado]

Controller OrdenController
  @Auth[mode:jwt]
  Router ApiV1
    Endpoint POST /ordenes
      !! "El carrito no puede estar vacío"
      !! carrito.items.length > 0
      => OrdenService.crear()
      !error:400 -> /error/carrito-vacio
    Endpoint GET /ordenes
      Table < Orden [paginate:20]
      => OrdenService.listar()
```

### Store global
```nexus
Store CartStore {
  ~items: []
  Action agregar => ~items: [...items, producto]
  Selector total: ~items.reduce(sum)
}
```

---

*NEXUS Protocol v4.3.0 — nexuslang.dev*
