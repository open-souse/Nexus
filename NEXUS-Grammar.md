# NEXUS: The AI-Native Language Protocol (v3.1)

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
- `( cond ) -> A : B` **Condicional de Intención**: Define ramas de visualización lógica.
- `->` **Flujo de Navegación / Routing**: Indica un cambio de ubicación o de ruta.
- `=>` **Lógica de Side-Effects / Handlers**: Acciones asíncronas o procesamiento de datos.
- `<` **Data Binding / Types**: Vincula componentes con fuentes de datos o esquemas.
- `{ path }` **Inyección de Contexto**: Integra código o componentes existentes.

## 3. Orquestadores de Estructura
- `Page`: Define una vista o pantalla completa.
- `Layout`: Define un envoltorio estructural reutilizable.
- `Section`: Define un bloque temático dentro de una página.

## 4. Casos de Uso: Edición Segura
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

## 5. Definición de Tipos (Schemas)
```nexus
Type User {
  name: string
  avatar: image
  role: "admin" | "user"
}
```

## 6. Ejemplo de Orquestación (v3.0)
```nexus
@React @Tailwind @Layout:Dashboard
Page Stats
  Header
    Logo "Nexus"
    Breadcrumbs "Home > Stats"
  
  Grid [cols:4]
    StatCard #elevated * 4 < [ "Users", "Sales", "Errors", "Revenue" ]
  
  Section "Detailed View"
    ( ?empty ) -> EmptyState : DataTable < { ./api/stats }
      Col "Metric"
      Col "Value" #bold
      Action "Export" => downloadCSV()
```

---
*Nexus: Menos palabras, más intención.*
