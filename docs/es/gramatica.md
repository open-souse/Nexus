<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <strong>🇪🇸 Español</strong> · <a href="../en/grammar.md">🇺🇸 English</a>
</p>

# Gramática NEXUS — Referencia Completa

## Principios Fundamentales

NEXUS se basa en sangría de 2 espacios. Cada línea representa un **Orquestador**, una **Palabra Clave** o un **Operador**.

**Anatomía de una línea NEXUS:**

```
Orquestador Nombre #Estilo [Atributos] "Contenido" => Lógica -> Destino
```

Las líneas hijas siempre están sangradas 2 espacios respecto a su padre. Los operadores en la misma línea no necesitan sangría adicional.

---

## Orquestadores Frontend

| Orquestador | Propósito | Ejemplo |
|---|---|---|
| `Page` | Pantalla o vista completa | `Page Dashboard` |
| `Layout` | Envoltorio estructural reutilizable | `Layout SplitView` |
| `Section` | Bloque temático dentro de una página | `Section Hero #glass` |
| `Store` | Estado global (Zustand/Redux/Pinia) | `Store CartStore` |
| `Type` | Interfaces o tipos TypeScript | `Type UserProfile` |
| `Form` | Formulario interactivo | `Form LoginForm` |
| `Table` | Tabla de datos | `Table < Pedido` |
| `Chart` | Visualización de datos | `Chart < Ventas` |
| `Card` | Contenedor de información | `Card #glass` |
| `Button` | Elemento interactivo | `Button "Guardar"` |
| `Text` | Contenido textual | `Text "Título" !bold` |
| `Image` | Elemento visual | `Image < producto.foto` |
| `Input` | Campo de entrada | `Input email [type:email]` |
| `Badge` | Etiqueta de estado | `Badge "Activo" #success` |
| `Nav` | Navegación | `Nav [items:5]` |
| `Header` | Cabecera de página | `Header #fixed` |
| `Grid` | Layout en cuadrícula | `Grid [cols:3]` |
| `List` | Lista de elementos | `List < Items` |
| `Create` | Crear archivos en disco | `Create Button [type:component]` |

---

## Orquestadores Backend

| Orquestador | Propósito | Ejemplo |
|---|---|---|
| `Model` | Entidad de base de datos | `Model Usuario` |
| `Controller` | Agrupación de recursos API | `Controller UsuarioController` |
| `Router` | Organización de rutas | `Router ApiV1` |
| `Endpoint` | Ruta API específica | `Endpoint GET /usuarios` |
| `Service` | Lógica de negocio | `Service UsuarioService` |
| `Middleware` | Interceptor de peticiones | `Middleware AuthMiddleware` |
| `Worker` | Tarea en segundo plano | `Worker EmailWorker` |
| `Queue` | Cola de mensajes | `Queue NotificacionQueue` |
| `CronJob` | Tarea programada | `CronJob ReportesDiarios` |
| `Entity` | Campo de modelo | `Entity nombre [type:string]` |
| `Index` | Índice de base de datos | `Index email [unique]` |

---

## Orquestadores de Testing

| Orquestador | Propósito | Ejemplo |
|---|---|---|
| `Suite` | Grupo de pruebas | `Suite AutenticacionTests` |
| `Test` | Caso de prueba individual | `Test "Login exitoso" [type:unit]` |

---

## Operadores

Ver [diccionario completo de operadores](./operadores.md).

Resumen de los más comunes:

| Operador | Propósito |
|---|---|
| `@Directiva` | Entorno o framework (`@React`, `@NestJS`) |
| `#token` | Token de diseño o estilo (`#glass`, `#primary`) |
| `$var: valor` | Variable global o constante DNA |
| `~var: valor` | Estado local reactivo |
| `!modificador` | Flag de prioridad o peso visual (`!bold`, `!pk`) |
| `< Fuente` | Binding de datos |
| `=> Acción()` | Efecto secundario o llamada a API |
| `-> Destino` | Navegación o ruta |
| `( cond ) -> A : B` | Renderizado condicional |
| `!error:código -> ruta` | Manejo de errores bajo `=>` |
| `[paginate:N]` | Paginación nativa en elementos con `<` |
| `-> Model.Nombre` | Relación entre modelos de base de datos |
| `* N` | Repetir N veces |
| `?? "pregunta"` | Consulta rápida a la IA |
| `{ ruta }` | Inyectar archivo o contexto existente |

---

## Reglas de Sangría

- Cada nivel usa exactamente **2 espacios**
- Los hijos siempre están sangrados respecto a su padre
- Los operadores `!error:` deben estar sangrados bajo la línea `=>` que los contiene
- Las líneas al mismo nivel son hermanos

```nexus
Page Ejemplo          ← nivel 0
  Section A           ← nivel 1 (hijo de Page)
    Button "X"        ← nivel 2 (hijo de Section)
      => Servicio()   ← en la misma línea o sangrado
      !error:* -> /   ← nivel 3 (hijo de =>)
```

---

## Palabras Clave de Testing

Dentro de bloques `Test`:

| Keyword | Propósito |
|---|---|
| `renders:` | Estados de renderizado a cubrir (Frontend) |
| `handles:` | Interacciones a probar |
| `asserts:` | Aserciones específicas |
| `mocks:` | Dependencias a mockear |
| `expects:` | Expectativas de respuesta (Backend) |
| `db:` | Efectos secundarios en base de datos (Backend) |

---

## Ejemplos

→ [Ver ejemplos completos](./ejemplos.md)
