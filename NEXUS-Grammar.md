# 📖 Referencia de Gramática NEXUS (v4.3.0)

NEXUS es el lenguaje de alto nivel diseñado para una comunicación exacta y fluida entre Humanos e IAs. Elimina la ambigüedad del lenguaje natural y permite orquestar aplicaciones full-stack completas a través de intenciones estructuradas.

---

## 1. Sintaxis y Jerarquía
NEXUS se basa en la indentación (2 espacios). Cada línea representa un **Orquestador**, una **Palabra Clave (Keyword)** o un **Operador**.

**Anatomía de una línea NEXUS:**
`Orquestador Nombre #Estilo [Atributos] "Contenido" => Lógica -> Destino`

---

## 2. Operadores Maestros (Diccionario Semántico)

| Operador | Nombre | Propósito | Ejemplo |
|:---:|:---:|:---|:---|
| `@` | **Directiva** | Define el entorno o modo de pensamiento. | `@React @CleanCode` |
| `@modify` | **Edición Segura** | Solo modifica el elemento especificado. | `@modify [preserve:all]` |
| `@Auth` | **Seguridad** | Requisitos de autenticación. | `@Auth[mode:jwt]` |
| `@RateLimit` | **Rate Limiting** | Limita peticiones por ventana de tiempo. | `@RateLimit[100/min]` |
| `@install` | **Instalador JIT** | Instala una dependencia al declararla. | `@install axios` |
| `@install-dev` | **Dependencia Dev JIT** | Instala una dependencia de desarrollo. | `@install-dev typescript` |
| `#` | **Estilo** | Tokens de diseño del DNA del proyecto. | `#glass #primary` |
| `$` | **Var DNA** | Constantes globales o valores de config. | `$primary-color` |
| `~` | **Estado Local** | Variables reactivas (useState/Signals). | `~isOpen:false` |
| `\|` | **Responsivo** | Variaciones para móvil/escritorio. | `Grid [cols:1 \| cols:3]` |
| `* N` | **Multiplicador** | Repetición de estructuras. | `Card * 5` |
| `?` | **Estado UI** | Variantes visuales/lógicas (loading/error). | `?loading:Skeleton` |
| `!` | **Prioridad** | Peso visual o importancia crítica. | `Text "Título" !bold` |
| `!pk` | **Primary Key** | Restricción de clave primaria de DB. | `Entity id !pk` |
| `!!` | **Aserción** | Precondición explícita antes de una acción `=>`. | `!! "Carrito no vacío"` |
| `!error:código` | **Manejo de Errores** | Captura errores de `=>` y redirige. | `!error:400 -> /error` |
| `??` | **Consulta** | Pregunta rápida a la IA dentro del código. | `?? "¿Por qué este hook?"` |
| `->` | **Flujo** | Navegación, rutas o relaciones. | `PageA -> PageB` |
| `-> Model.` | **Relación de Modelo** | Relación tipada entre entidades de BD. | `Entity items -> Model.Producto [many]` |
| `=>` | **Lógica** | Efectos secundarios, APIs o manejadores. | `Click => guardar()` |
| `<` | **Binding** | Fuentes de datos o tipos de datos. | `Table < UserData` |
| `from` | **Binding (legible)** | Alias legible de `<` — misma semántica, sintaxis más natural. | `Table from User` |
| `{ ruta }` | **Inyección** | Inyecta archivos o contexto existente. | `{ ./utils.ts }` |
| `( cond ) -> A : B` | **Condicional** | Renderizado condicional. | `( ?auth ) -> Home : Login` |
| `[paginate:N]` | **Paginación** | Paginación nativa en elementos con `<`. | `Table < User [paginate:20]` |
| `[new]` | **Nuevo** | Marca un elemento recién añadido. | `Button [new]` |
| `[locked]` | **Protegido** | No modificar ni regenerar. | `Navbar [locked]` |
| `[animate:]` | **Animación** | Animación de entrada/salida. | `[animate: fade-in, duration: 200ms]` |
| `[hover:]` | **Hover** | Estilos en hover o foco. | `[hover: scale-105]` |
| `[a11y:]` | **Accesibilidad** | Atributos ARIA. | `[a11y: aria-label="Cerrar"]` |
| `[inherit:siblings]` | **Herencia** | Hereda estilo de los hermanos. | `Button [new, inherit:siblings]` |
| `[cascade:children]` | **Cascada** | Aplica estilos del padre a los hijos. | `Section [cascade:children]` |
| `[position:move-to:N]` | **Mover** | Mueve el elemento a la posición N. | `[position:move-to:1]` |

---

## 3. Orquestadores

### 🎨 Frontend — Estructura
- `Page`: Una pantalla o vista completa.
- `Layout`: Envoltorio estructural reutilizable.
- `Section`: Un bloque temático dentro de una página.
- `Store`: Estado global (Zustand/Redux/Pinia).
- `Type`: Interfaces o tipos de TypeScript.
- `Create`: Crea archivos en disco.

### 🎨 Frontend — Componentes UI
- `Card`: Contenedor de información.
- `Button`: Elemento interactivo.
- `Text`: Contenido textual.
- `Image`: Elemento visual.
- `Input`: Campo de entrada.
- `Badge`: Etiqueta de estado.
- `Nav` / `Navbar`: Navegación.
- `Header`: Cabecera de página.
- `Grid`: Layout en cuadrícula.
- `List`: Lista de elementos.
- `Form`: Formulario interactivo.
- `Table`: Tabla de datos.
- `Chart`: Visualización de datos.
- `Modal`: Diálogo modal.
- `Select`: Selector desplegable.
- `Skeleton`: Placeholder de carga.
- `Stack`: Apilamiento vertical/horizontal.
- `Field`: Campo de formulario con label.

### ⚙️ Backend
- `Model`: Definición de entidad de base de datos.
- `Entity`: Campo de un modelo.
- `Index`: Índice de base de datos.
- `Controller`: Agrupación de recursos de API.
- `Router`: Organización de rutas anidadas.
- `Endpoint`: Ruta de API específica.
- `Service`: Encapsulación de lógica de negocio.
- `Middleware`: Interceptores de petición/respuesta.
- `Worker` / `Queue` / `CronJob`: Tareas en segundo plano.

### 🧪 Testing
- `Suite`: Grupo de pruebas relacionadas.
- `Test`: Caso de prueba individual (Unit, Integration, E2E).

---

## 4. Ejemplos de Implementación

### Lógica Full-Stack
```nexus
@NestJS @Prisma
Model Cuenta
  Entity id !pk
  Entity saldo type:decimal
  Index id [unique]

Controller CuentaController
  Endpoint GET /saldo => CuentaService.obtenerSaldo()
```

---

## 5. Operadores v4.3.0

### 5.1 Manejo de Errores — `!error:`

Captura errores de acciones `=>` o de binding de datos (`<`/`from`) y redirige al destino especificado. Va indentado bajo la línea que origina el error.

**Sintaxis:**
```nexus
Elemento => Servicio.metodo()
  !error:código -> /destino

Elemento < Fuente [paginate:N]
  !error:código -> /destino

Elemento from Fuente [paginate:N]
  !error:código -> /destino
```

**Códigos de error válidos:**

| Código | Tipo |
|:---|:---|
| `400`–`599` | Código HTTP de error (ej. 400, 401, 403, 404, 500) |
| `timeout` | La petición superó el tiempo límite |
| `network` | Error de red / sin conexión |
| `*` | Comodín — captura cualquier error no manejado |

**Reglas:**
- Válido anidado bajo una línea con `=>` (acción) o `<`/`from` (binding de datos)
- Siempre requiere `-> /destino` después del código
- Se pueden encadenar múltiples `!error` bajo el mismo padre

**Ejemplo:**
```nexus
Button "Pagar" => PagoService.procesar()
  !error:400 -> /error/pago
  !error:500 -> /error/servidor
  !error:timeout -> /reintentar
  !error:* -> /error/general

Table from Pedido [paginate:20]
  !error:500 -> /error/servidor
  !error:network -> /sin-conexion
```

---

### 5.2 Paginación Nativa — `[paginate:N]`

Genera paginación automática en elementos con binding de datos `<`. La IA genera el componente paginado completo con controles de navegación.

**Sintaxis:**
```nexus
Elemento < Fuente [paginate:N]
Elemento < Fuente [paginate:N, page:~variable]
Elemento < Fuente [paginate:N, layout:grid|list]
Elemento from Fuente [paginate:N]
```

**Parámetros:**

| Parámetro | Descripción | Valores |
|:---|:---|:---|
| `paginate:N` | Ítems por página (requerido) | Entero entre 1 y 500 |
| `page:~var` | Variable de estado para la página actual | Variable local `~nombre` |
| `layout:X` | Disposición visual de los ítems | `grid` \| `list` |

**Reglas:**
- Requiere binding de datos `<` o `from` en la misma línea
- No puede combinarse con el multiplicador `* N`
- N debe ser un entero positivo entre 1 y 500

**Ejemplo:**
```nexus
Table < Pedido [paginate:20]
Table < Usuario [paginate:10, page:~currentPage]
List < Producto [paginate:12, layout:grid]
Table from Pedido [paginate:20]
```

---

### 5.3 Relaciones entre Modelos — `-> Model.Nombre`

Define relaciones tipadas entre entidades de base de datos dentro de bloques `Model`. La IA genera las claves foráneas, restricciones y relaciones inversas según el ORM activo.

**Sintaxis:**
```nexus
Model NombreModelo
  Entity campo -> Model.OtroModelo
  Entity campo -> Model.OtroModelo [modificador]
  Entity campo -> Model.OtroModelo [mod1, mod2]
```

**Modificadores de relación:**

| Modificador | Cardinalidad | Descripción |
|:---|:---|:---|
| *(sin modificador)* | Uno a uno requerido | NOT NULL, clave foránea obligatoria |
| `[many]` | Uno a muchos | Array / tabla de unión |
| `[optional]` | Opcional | Permite NULL |
| `[cascade]` | Con cascada | Al eliminar el padre, se eliminan los hijos |

**Reglas:**
- Solo válido dentro de una línea `Entity`
- El nombre del modelo referenciado debe empezar con mayúscula
- Los modificadores válidos son: `many`, `optional`, `cascade`

**Ejemplo:**
```nexus
Model Pedido
  Entity id !pk
  Entity usuario -> Model.Usuario
  Entity items -> Model.Producto [many]
  Entity categoria -> Model.Categoria [optional]
  Entity facturas -> Model.Factura [many, cascade]
```

---

### 5.4 Operador de Aserción — `!!`

Declara precondiciones explícitas que deben cumplirse antes de ejecutar una acción `=>`. Si alguna falla, la IA genera lógica de guardia que bloquea la acción y muestra el error apropiado.

**Sintaxis:**
```nexus
!! "descripción"
!! expresión
```

**Reglas:**
- Siempre antes de la línea `=>` que protege
- Múltiples `!!` se evalúan de arriba a abajo — el primer fallo detiene la ejecución
- El contenido es obligatorio (error si `!!` está vacío)
- Nunca aparece como comentario en el código generado — se convierte en lógica ejecutable

**Ejemplo:**
```nexus
Endpoint POST /checkout
  !! "El carrito no puede estar vacío"
  !! stock.disponible > 0
  !! user.authenticated
  => OrderService.crear()
    !error:400 -> /error/validacion
    !error:* -> /error/general
```

---

## 6. Operador `from` — Binding Legible

`from` es un alias exacto del operador `<`. Ambas formas son equivalentes — usa la que resulte más natural en tu blueprint.

```nexus
// Equivalentes:
Table < Pedido [paginate:20]
Table from Pedido [paginate:20]

// Equivalentes:
Chart < DatosVentas
Chart from DatosVentas
```

**Cuándo usar cada uno:**
- `<` — compacto, idiomático, consistente con el resto de operadores NEXUS
- `from` — más natural para lectores no familiarizados con NEXUS o en contextos de documentación

---

## 7. Verificación de Contratos — `nexus verify`

`nexus verify` compara los items declarados en un blueprint contra el código generado. Reporta qué partes del contrato están implementadas.

**Uso:**
```bash
nexus verify <blueprint.nexus> [directorio-de-código] [--json]
```

**Ejemplo de salida:**
```
⬡ nexus verify — checkout.nexus

  ✓ [auth] @Auth[mode:jwt] → src/auth.guard.ts
  ✓ [precondition] "El carrito no puede estar vacío" → src/cart.service.ts
  ✓ [action] OrderService.crear() → src/order.service.ts
  ✗ [error handler] !error:400 -> /error/validacion
  ✓ [dependency] express → package.json

  4 passed  1 failed
```

**Items verificables en un blueprint:**

| Tipo | Declaración | Qué busca en el código |
|:---|:---|:---|
| `auth` | `@Auth[mode:jwt]` | JWT guard, `UseGuards`, `Bearer`, `authorization` |
| `assertion` | `!! "mensaje"` | La cadena del mensaje en algún archivo |
| `error-handler` | `!error:400` | Código HTTP o `HttpStatus.` en algún archivo |
| `action` | `=> Servicio.metodo()` | `Servicio.metodo` en algún archivo |
| `install` | `@install paquete` | El paquete en `package.json` |
| `endpoint` | `Endpoint POST /ruta` | La ruta base en algún archivo |
| `pagination` | `[paginate:N]` | `page`, `limit`, `skip`, `take`, `offset` en algún archivo |

**API programática:**
```typescript
import { extractContract, verifyContract } from 'nxlang'

const items = extractContract(blueprintContent)
const results = verifyContract(items, codeFilesMap, packageJson)
```

---

## Visión a Futuro — SDD (Software Design by Declaration)

SDD es la próxima evolución planificada del protocolo. La idea es extender NEXUS más allá de la descripción de componentes hacia la declaración de decisiones de diseño completas — arquitectura, patrones y contratos entre sistemas.

La sintaxis de SDD aún no está definida. Cuando llegue el momento, será diseñada junto a la comunidad a través del proceso RFC.

→ [Ver roadmap completo](./docs/es/roadmap.md)
→ [Proponer ideas via RFC](./docs/es/rfcs/RFC-0001-plantilla.md)

---
*Nexus: Menos palabras, más intención.*
