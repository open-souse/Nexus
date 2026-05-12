# 📖 Referencia de Gramática NEXUS (v4.0.0)

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

### 📂 SDD (Software Design Document)
*Usado para arquitectura de sistemas de alto nivel.*
- `System`: El contenedor principal de la aplicación.
- `Actor`: Roles de usuario y sus capacidades.
- `Requirement`: Restricciones de negocio o técnicas.
- `Flow`: Rutas lógicas entre capas (UX/API/DB).

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

### 🛠️ Database Avanzado
- `Index`: Índices de optimización de base de datos.
- `Trigger`: Lógica de DB automatizada en eventos.
- `Procedure`: Procedimientos almacenados o consultas complejas.

### 🧪 Testing
- `Suite`: Grupo de pruebas relacionadas.
- `Test`: Caso de prueba individual (Unit, Integration, E2E).

---

## 4. Palabras Clave Avanzadas

| Palabra Clave | Contexto | Propósito |
|:---|:---|:---|
| `can` | `Actor` | Define permisos/capacidades del usuario. |
| `must` / `should` | `Requirement` | Define restricciones estrictas o sugeridas. |
| `policy` | `Router` / `Controller` | Nombre de la lógica de control de acceso. |
| `architecture` | `System` | Patrón global (Hexagonal, Monolito). |
| `Entity` | `Model` | Define un campo en la base de datos. |
| `Relation` | `Model` | Define relaciones de clave foránea. |
| `unique` | `Index` | Asegura que un campo sea único. |
| `renders` | `Test` | Estados de UI a verificar. |
| `handles` | `Test` / `Endpoint` | Eventos o rutas a procesar. |
| `expects` | `Test` | Aserciones sobre los resultados. |

---

## 5. Ejemplos de Implementación

### Arquitectura de Sistema (SDD)
```nexus
System "GestorPedidos"
  architecture: Hexagonal
  Actor "DueñoTienda"
    can: gestionar-inventario, ver-reportes
  Requirement "Rendimiento"
    must: cargar-en-menos-de-200ms
```

### Lógica Full-Stack
```nexus
@NestJS @Prisma
Model Cuenta
  Entity id !pk
  Entity saldo type:decimal
  Index id [unique]

Controller CuentaController
  policy: es-dueño
  Endpoint GET /saldo => CuentaService.obtenerSaldo()
```

---
*Nexus: Menos palabras, más intención.*
