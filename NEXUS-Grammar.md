# NEXUS: The AI-Native Language Protocol (v3.3)

NEXUS es el lenguaje de alto nivel diseñado para la comunicación exacta y fluida entre Humanos e IAs. Elimina la ambigüedad del lenguaje natural y permite orquestar aplicaciones completas.

## 1. Estructura y Jerarquía
Basado en indentación (2 espacios).
`Componente #Estilo [Atributos] "Contenido" => Lógica -> Destino`

## 2. Operadores Maestros (Diccionario Semántico)

- `@` **Directivas de Comportamiento**: Establece el modo de pensamiento de la IA, el entorno técnico o layouts predefinidos.
  - *Ejemplo:* `@React @CleanCode @Layout:Sidebar`
- `@modify` **Modo Edición Segura (Intervención Mínima)**: Indica que el elemento YA EXISTE. La IA tiene prohibido reescribir partes no afectadas.
  - *Ejemplo:* `@modify [preserve:all]` → la IA solo entrega el fragmento modificado.
- `#` **Design Tokens / Estilos**: Vincula el componente con el sistema de diseño (DNA). Soporta herencia.
- `$` **Variables Globales / DNA**: Define constantes o parámetros del sistema.
- `~` **Estado Local / Reactividad**: Define variables que cambian durante la sesión (useState/Signals).
- `|` **Adaptabilidad (Responsive)**: Define variaciones según el tamaño de pantalla.
- `* N` **Multiplicador**: Indica repetición de estructuras con variación de datos automática.
- `?` **Estados de UI**: Define variantes visuales o lógicas basadas en el estado.
- `!` **Prioridad / Énfasis**: Indica peso visual o importancia crítica.
- `[new]` **Elemento Nuevo**: Marca un elemento como recién añadido.
- `[locked]` **Componente Protegido**: Prohíbe a la IA alterar o regenerar este componente.
- `[` `]` **Atributos Técnicos**: Pasa parámetros de configuración (props).
- `[animate: ...]` **Animaciones**: Define transiciones y efectos de entrada/salida.
  - *Ejemplo:* `Modal [animate: fade-in, duration: 200ms]`
  - *Ejemplo:* `List [animate: stagger, children: slide-up, delay: 50ms]`
- `[hover: ...]` **Estados de Interacción**: Define estilos o comportamientos en hover/focus.
  - *Ejemplo:* `Card [hover: scale-105, shadow: elevated]`
- `[a11y: ...]` **Accesibilidad**: Define atributos ARIA y semántica accesible.
  - *Ejemplo:* `Button "×" [a11y: aria-label="Cerrar modal"]`
  - *Ejemplo:* `Nav [a11y: role="navigation", aria-label="Principal"]`
- `?? "question"` **Query Operator**: Ask the AI a natural language question mid-session without leaving NEXUS mode. The AI answers, then returns to strict NEXUS mode automatically.
  - *Example:* `?? "Should I use Zustand or Context API for this store?"`
- `( cond ) -> A : B` **Condicional de Intención**: Define ramas de visualización lógica.
- `->` **Flujo de Navegación / Routing**: Indica un cambio de ubicación o de ruta.
- `=>` **Lógica de Side-Effects / Handlers**: Acciones asíncronas o procesamiento de datos.
- `<` **Data Binding / Types**: Vincula componentes con fuentes de datos o esquemas.
- `{ path }` **Inyección de Contexto**: Integra código o componentes existentes.

## 3. Orquestadores de Estructura
- `Page`: Define una vista o pantalla completa.
- `Layout`: Define un envoltorio estructural reutilizable.
- `Section`: Define un bloque temático dentro de una página.
- `Type`: Define un schema o tipo de datos.
- `Store`: Define un store de estado global con Actions y Selectors.

## 4. Store — Estado Global
```nexus
Store CartStore {
  ~items: []
  ~total: 0
  Action addItem < Product => ~items: [...~items, $item]
  Action removeItem [id: string] => ~items: ~items.filter(id)
  Action clearCart => ~items: []
  Selector isEmpty: ~items.length === 0
  Selector itemCount: ~items.length
}
```

## 5. Casos de Uso: Animaciones y Accesibilidad
```nexus
// Modal accesible con animación de entrada
Modal [animate: fade-in, duration: 200ms] [a11y: role="dialog", aria-modal="true"]
  Header [a11y: aria-label="Título del modal"]
    Text "Confirmar acción" !bold
    Button "×" [a11y: aria-label="Cerrar modal"] => closeModal()
  Body
    Text "¿Estás seguro de esta acción?"
  Footer
    Button "Cancelar" #ghost => closeModal()
    Button "Confirmar" #danger => confirmAction() -> /resultado

// Lista con animación escalonada
List [animate: stagger, children: slide-up, delay: 50ms]
  Item * N < Products [a11y: role="listitem"]
    [hover: bg-gray-50]
```

## 6. Casos de Uso: Edición Segura
### Mover un elemento sin reinterpretar nada
```nexus
@modify [preserve:all]
Card "resumen-credito" [position:move-to:1]
```
### Agregar un elemento heredando el estilo existente
```nexus
@modify [preserve:all]
Form "login"
  Captcha [new, inherit:siblings]
```

## 7. Definición de Tipos (Schemas)
```nexus
Type User {
  name: string
  avatar: image
  role: "admin" | "user"
}
```

## 8. Ejemplo de Orquestación Completa (v3.2)
```nexus
@React @Tailwind @Layout:Dashboard
Page Stats
  Header
    Logo "Nexus"
    Breadcrumbs "Home > Stats"

  Grid [cols:4]
    StatCard #elevated * 4 < [ "Users", "Sales", "Errors", "Revenue" ]
      [animate: fade-in, delay: 100ms]
      [hover: scale-102, shadow: elevated]

  Section "Detailed View"
    ( ?empty ) -> EmptyState : DataTable < { ./api/stats }
      Col "Metric" [a11y: scope="col"]
      Col "Value" #bold [a11y: scope="col"]
      Action "Export" => downloadCSV()
```

---
*Nexus: Menos palabras, más intención.*
