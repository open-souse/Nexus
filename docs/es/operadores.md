# Diccionario de Operadores NEXUS

<p align="right"><a href="../en/operators.md">🇺🇸 English version</a></p>

Referencia completa de todos los operadores del protocolo NEXUS v4.1.0.

---

## `@` — Directiva

**Propósito:** Define el entorno, framework o modo de comportamiento para el bloque NEXUS.

**Sintaxis:**
```nexus
@Framework
@Framework @OtroFramework
@modify [preserve:all]
```

**Ejemplos:**
```nexus
@React @Tailwind
@NestJS @Prisma @PostgreSQL
@modify [preserve:all]
```

**Notas:**
- Siempre en la primera línea del bloque NEXUS
- Se pueden encadenar varios en la misma línea
- `@modify [preserve:all]` le dice a la IA que solo aplique el cambio explícito, sin reinterpretar ni mover otros elementos

---

## `#` — Token de Estilo

**Propósito:** Aplica tokens de diseño o clases de estilo a un elemento.

**Sintaxis:**
```nexus
Elemento #token
Elemento #token1 #token2
```

**Ejemplos:**
```nexus
Section Hero #glass
Button "Guardar" #primary #rounded
Card #glass #shadow-lg
```

**Notas:**
- Se pueden encadenar múltiples tokens
- Los tokens son definidos por el DNA del proyecto (`nexus.config.json`)
- No se validan contra una lista fija — el AI los interpreta según el stack

---

## `$` — Variable Global (DNA)

**Propósito:** Declara constantes globales o valores del DNA del proyecto.

**Sintaxis:**
```nexus
$nombre: valor
```

**Ejemplos:**
```nexus
$brand: "Nexus"
$primary-color: "#5DCAA5"
$api-base: "/api/v1"
```

**Notas:**
- Se definen una vez y se referencian en todo el archivo
- Útiles para mantener consistencia en valores repetidos

---

## `~` — Estado Local

**Propósito:** Declara variables de estado local reactivo (equivalente a `useState` en React o `ref` en Vue).

**Sintaxis:**
```nexus
~nombre: valorInicial
```

**Ejemplos:**
```nexus
~isOpen: false
~currentPage: 1
~searchQuery: ""
```

**Notas:**
- Scope local al componente o página donde se declara
- Se puede referenciar en `[page:~variable]` para paginación

---

## `|` — Variante Responsiva

**Propósito:** Define variaciones de diseño según el tamaño de pantalla.

**Sintaxis:**
```nexus
Elemento [propiedad:valorMobile | propiedad:valorDesktop]
```

**Ejemplos:**
```nexus
Grid [cols:1 | cols:3]
Nav |mobile:hide
```

---

## `* N` — Multiplicador

**Propósito:** Repite un elemento N veces.

**Sintaxis:**
```nexus
Elemento * N
```

**Ejemplos:**
```nexus
Card * 3
SkeletonRow * 5
```

**Errores comunes:**
- No se puede combinar con `[paginate:N]` en la misma línea

---

## `?` — Estado UI

**Propósito:** Define variantes visuales o lógicas del componente.

**Sintaxis:**
```nexus
?estado
?estado:Componente
```

**Ejemplos:**
```nexus
?loading:Skeleton
?error:ErrorBanner
?empty:EmptyState
```

---

## `!` — Prioridad / Flag

**Propósito:** Aplica modificadores de peso visual, comportamiento o restricción.

**Sintaxis:**
```nexus
Elemento !modificador
Elemento !mod1 !mod2
```

**Ejemplos:**
```nexus
Text "Título" !bold !xl
Button "Eliminar" !danger
Entity id !pk
```

**Modificadores especiales:**
- `!pk` — clave primaria de base de datos
- `!bold`, `!xl`, `!danger` — modificadores visuales

---

## `!pk` — Clave Primaria

**Propósito:** Marca un campo como clave primaria de la entidad de base de datos.

**Sintaxis:**
```nexus
Entity campo !pk
Entity campo type:uuid !pk
```

**Ejemplos:**
```nexus
Model Usuario
  Entity id !pk
  Entity id type:uuid !pk
```

**Notas:**
- Solo válido dentro de bloques `Model`
- Solo puede haber un `!pk` por modelo

---

## `!error:` — Manejo de Errores

**Propósito:** Captura errores de acciones `=>` y redirige al destino especificado.

**Sintaxis:**
```nexus
Elemento => Servicio.metodo()
  !error:código -> /destino
```

**Códigos válidos:**

| Código | Tipo |
|---|---|
| `400`–`599` | Código HTTP (400, 401, 403, 404, 500…) |
| `timeout` | La petición superó el tiempo límite |
| `network` | Error de red / sin conexión |
| `*` | Comodín — captura cualquier error |

**Ejemplo completo:**
```nexus
Button "Pagar" => PagoService.procesar()
  !error:400 -> /error/pago
  !error:401 -> /login
  !error:500 -> /error/servidor
  !error:timeout -> /reintentar
  !error:* -> /error/general
```

**Reglas:**
- Solo válido sangrado bajo una línea con `=>`
- Siempre requiere `-> /destino` después del código
- Se pueden encadenar múltiples `!error` bajo el mismo `=>`

**Errores comunes:**
- `!error:600` — código HTTP inválido (debe ser 400–599)
- `!error:network` sin `->` — falta el destino

---

## `@Auth` — Autenticación

**Propósito:** Requiere autenticación para un endpoint o recurso.

**Sintaxis:**
```nexus
@Auth
@Auth[mode:jwt]
@Auth[role:admin]
```

**Ejemplos:**
```nexus
Endpoint GET /perfil @Auth => UsuarioService.getPerfil()
Endpoint DELETE /usuario @Auth[role:admin] => UsuarioService.eliminar()
```

---

## `@RateLimit` — Límite de Frecuencia

**Propósito:** Limita la frecuencia de peticiones a un endpoint.

**Sintaxis:**
```nexus
@RateLimit[N/unidad]
```

**Ejemplos:**
```nexus
@RateLimit[100/min]
@RateLimit[1000/hora]
```

---

## `??` — Consulta Rápida

**Propósito:** Hacer una pregunta a la IA sin salir del modo NEXUS.

**Sintaxis:**
```nexus
?? "pregunta"
```

**Ejemplos:**
```nexus
?? "¿Debería usar Zustand o Context aquí?"
?? "¿Este endpoint necesita rate limiting?"
```

**Notas:**
- La IA responde brevemente y luego continúa generando código

---

## `->` — Navegación / Relación

**Propósito:** Define navegación entre páginas, rutas, o relaciones entre modelos.

**Sintaxis:**
```nexus
Elemento -> /ruta
Button -> /destino
Entity campo -> Model.Nombre [modificador]
```

**Modificadores de relación de modelos:**

| Modificador | Cardinalidad |
|---|---|
| *(sin modificador)* | Uno a uno requerido (NOT NULL) |
| `[many]` | Uno a muchos |
| `[optional]` | Opcional (permite NULL) |
| `[cascade]` | Elimina hijos al eliminar el padre |

**Ejemplos:**
```nexus
Button "Inicio" -> /dashboard
Model Pedido
  Entity usuario -> Model.Usuario
  Entity items -> Model.Producto [many]
  Entity categoria -> Model.Categoria [optional]
  Entity facturas -> Model.Factura [many, cascade]
```

**Reglas para `-> Model.Nombre`:**
- Solo válido dentro de una línea `Entity`
- El nombre del modelo referenciado debe empezar con mayúscula
- Modificadores válidos: `many`, `optional`, `cascade`

---

## `=>` — Efecto Secundario

**Propósito:** Despacha acciones, llama APIs o define manejadores de eventos.

**Sintaxis:**
```nexus
Elemento => Servicio.metodo()
Elemento => Store.accion(payload)
```

**Ejemplos:**
```nexus
Button "Guardar" => FormService.guardar()
Form => UsuarioService.crear()
Input onChange => Store.setFiltro(value)
```

---

## `<` — Binding de Datos

**Propósito:** Vincula un elemento a una fuente de datos o tipo TypeScript.

**Sintaxis:**
```nexus
Elemento < Fuente
Endpoint METODO /ruta < Payload:Schema
```

**Ejemplos:**
```nexus
Table < Pedido
Chart < DatosVentas
Endpoint POST /usuarios < Payload:UsuarioSchema => UsuarioService.crear()
```

---

## `{ }` — Inyección

**Propósito:** Inyecta un archivo o contexto existente en el bloque NEXUS.

**Sintaxis:**
```nexus
{ ./ruta/al/archivo }
```

**Ejemplos:**
```nexus
{ ./componentes/UserCard.tsx }
{ ./utils/auth.ts }
```

---

## `[paginate:N]` — Paginación Nativa

**Propósito:** Genera paginación automática en elementos con binding de datos `<`.

**Sintaxis:**
```nexus
Elemento < Fuente [paginate:N]
Elemento < Fuente [paginate:N, page:~variable]
Elemento < Fuente [paginate:N, layout:grid|list]
```

**Parámetros:**

| Parámetro | Descripción | Valores |
|---|---|---|
| `paginate:N` | Ítems por página (requerido) | Entero entre 1 y 500 |
| `page:~var` | Variable de estado para la página actual | Variable local `~nombre` |
| `layout:X` | Disposición visual | `grid` \| `list` |

**Ejemplos:**
```nexus
Table < Pedido [paginate:20]
Table < Usuario [paginate:10, page:~currentPage]
List < Producto [paginate:12, layout:grid]
```

**Reglas:**
- Requiere binding de datos `<` en la misma línea
- No puede combinarse con `* N`
- N debe ser entero entre 1 y 500

**Errores comunes:**
- `Table [paginate:20]` sin `<` — falta el binding de datos
- `Table < Datos [paginate:600]` — N fuera de rango
- `Card * 3 [paginate:10]` — conflicto con multiplicador

---

## `( cond ) -> A : B` — Condicional

**Propósito:** Renderizado condicional según una expresión lógica.

**Sintaxis:**
```nexus
( condición ) ->
  ComponenteVerdadero
:
  ComponenteFalso
```

**Ejemplos:**
```nexus
( producto.enStock ) ->
  Button "Agregar al carrito" => CarritoStore.agregar(producto)
:
  Badge "Agotado" #muted

( ?auth ) ->
  Dashboard
:
  LoginPage
```

---

## `[new]` / `[locked]` — Control de Modificación

**`[new]`** — Marca un elemento como recién agregado (útil con `@modify`).

**`[locked]`** — Le dice a la IA que no modifique ni regenere este elemento.

**Ejemplos:**
```nexus
@modify [preserve:all]
Page Dashboard
  Navbar [locked]
  Section Nueva [new]
    Button "Nuevo" [new]
```

---

## `[animate:]` / `[hover:]` / `[a11y:]` — Atributos Especiales

**`[animate:]`** — Animación de entrada/salida.
```nexus
Card [animate: fade-in, duration: 200ms]
```

**`[hover:]`** — Estilos al pasar el cursor.
```nexus
Button "Ver" [hover: scale-105]
```

**`[a11y:]`** — Atributos de accesibilidad ARIA.
```nexus
Button "Cerrar" [a11y: aria-label="Cerrar modal"]
```

---

*[← Volver a la gramática](./gramatica.md) · [Ver ejemplos →](./ejemplos.md)*
