# 📖 Referencia de Gramática NEXUS (v4.1.0)

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
| `#` | **Estilo** | Tokens de diseño del DNA del proyecto. | `#glass #primary` |
| `$` | **Var DNA** | Constantes globales o valores de config. | `$primary-color` |
| `~` | **Estado Local** | Variables reactivas (useState/Signals). | `~isOpen:false` |
| `|` | **Responsivo** | Variaciones para móvil/escritorio. | `|mobile:hide` |
| `* N` | **Multiplicador** | Repetición de estructuras. | `Card * 5` |
| `?` | **Estado UI** | Variantes visuales/lógicas (loading/error). | `?loading:Skeleton` |
| `!` | **Prioridad** | Peso visual o importancia crítica. | `Text "Título" !bold` |
| `!pk` | **Primary Key** | Restricción de clave primaria de DB. | `Entity id !pk` |
| `@Auth` | **Seguridad** | Requisitos de autenticación. | `@Auth[mode:jwt]` |
| `??` | **Consulta** | Pregunta rápida a la IA dentro del código. | `?? "¿Por qué este hook?"` |
| `->` | **Flujo** | Navegación, rutas o relaciones. | `PageA -> PageB` |
| `=>` | **Lógica** | Efectos secundarios, APIs o manejadores. | `Click => guardar()` |
| `<` | **Binding** | Fuentes de datos o tipos de datos. | `Table < UserData` |
| `{ ruta }` | **Inyección** | Inyecta archivos o contexto existente. | `{ ./utils.ts }` |

---

## 3. Orquestadores

### 🎨 Frontend
- `Page`: Una pantalla o vista completa.
- `Layout`: Envoltorio estructural reutilizable.
- `Section`: Un bloque temático dentro de una página.
- `Store`: Estado global (Zustand/Redux/Pinia).
- `Type`: Interfaces o tipos de TypeScript.

### ⚙️ Backend
- `Model`: Definición de entidad de base de datos.
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

## 5. Operadores v4.1 — Nuevos en esta versión

### 5.1 Manejo de Errores — `!error:`

Captura errores de acciones `=>` y redirige al destino especificado. Siempre va indentado bajo una línea con `=>`.

**Sintaxis:**
```nexus
Elemento => Servicio.metodo()
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
- Solo válido anidado bajo una línea con `=>`
- Siempre requiere `-> /destino` después del código
- Se pueden encadenar múltiples `!error` bajo el mismo `=>`

**Ejemplo:**
```nexus
Button "Pagar" => PagoService.procesar()
  !error:400 -> /error/pago
  !error:500 -> /error/servidor
  !error:timeout -> /reintentar
  !error:* -> /error/general
```

---

### 5.2 Paginación Nativa — `[paginate:N]`

Genera paginación automática en elementos con binding de datos `<`. La IA genera el componente paginado completo con controles de navegación.

**Sintaxis:**
```nexus
Elemento < Fuente [paginate:N]
Elemento < Fuente [paginate:N, page:~variable]
Elemento < Fuente [paginate:N, layout:grid|list]
```

**Parámetros:**

| Parámetro | Descripción | Valores |
|:---|:---|:---|
| `paginate:N` | Ítems por página (requerido) | Entero entre 1 y 500 |
| `page:~var` | Variable de estado para la página actual | Variable local `~nombre` |
| `layout:X` | Disposición visual de los ítems | `grid` \| `list` |

**Reglas:**
- Requiere binding de datos `<` en la misma línea
- No puede combinarse con el multiplicador `* N`
- N debe ser un entero positivo entre 1 y 500

**Ejemplo:**
```nexus
Table < Pedido [paginate:20]
Table < Usuario [paginate:10, page:~currentPage]
List < Producto [paginate:12, layout:grid]
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
*Nexus: Menos palabras, más intención.*
