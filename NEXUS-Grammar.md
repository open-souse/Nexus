# NEXUS: The AI-Native Language Protocol (v2.5)

NEXUS es el lenguaje de alto nivel diseñado para la comunicación exacta y fluida entre Humanos e IAs. Elimina la ambigüedad del lenguaje natural.

## 1. Estructura y Jerarquía
Basado en indentación (2 espacios).
`Componente #Estilo [Atributos] "Contenido" => Lógica -> Destino`

## 2. Operadores Maestros (Diccionario Semántico)

- `@` **Directivas de Comportamiento**: Establece el modo de pensamiento de la IA o el entorno técnico. 
  - *Ejemplo:* `@React @CleanCode` (La IA usará React y aplicará patrones de diseño sólidos).
- `#` **Design Tokens / Estilos**: Vincula el componente con el sistema de diseño (DNA). Soporta herencia.
  - *Ejemplo:* `Button #primary #glass` (Aplica el color primario y el efecto de cristal definidos en el DNA).
- `$` **Variables de Intención**: Define constantes o parámetros de lógica global.
  - *Ejemplo:* `$brand: "Nexus"` (Define un valor reutilizable en toda la sesión).
- `* N` **Multiplicador**: Indica repetición de estructuras con variación de datos automática.
  - *Ejemplo:* `Card * 3` (Genera 3 tarjetas con contenido único).
- `?` **Estados**: Define variantes visuales o lógicas basadas en el estado de la UI.
  - *Ejemplo:* `Button ?loading` (Implementa estados de carga o deshabilitado).
- `!` **Prioridad / Énfasis**: Indica peso visual o importancia crítica.
  - *Ejemplo:* `Text !bold !danger` (Aumenta el contraste y grosor visual).
- `[` `]` **Atributos Técnicos**: Pasa parámetros de configuración (props) que no son de estilo.
  - *Ejemplo:* `Grid [cols:3]` (Configura el componente con valores técnicos exactos).
- `( cond ) -> A : B` **Condicional de Intención**: Define ramas de visualización lógica.
  - *Ejemplo:* `( $isLogged ) -> Dashboard : Login`.
- `->` **Flujo de Navegación**: Indica un cambio de ubicación o de ruta (Routing).
  - *Ejemplo:* `NavItem -> /home`.
- `=>` **Lógica de Side-Effects / API**: Indica acciones asíncronas o procesamiento de datos.
  - *Ejemplo:* `submit => API.post(/auth)`.
- `<` **Data Binding / Types**: Vincula componentes con fuentes de datos o esquemas definidos.
  - *Ejemplo:* `Table < User` (Mapea la estructura del tipo User a la tabla).
- `{ path }` **Inyección de Contexto**: Integra código o componentes existentes en el flujo actual.
  - *Ejemplo:* `MainContent { ./Layout.js }`.

## 3. Definición de Tipos (Schemas)
Permite que la IA conozca la forma de los datos:
```nexus
Type User {
  name: string
  avatar: image
  role: "admin" | "user"
}
```

## 4. Ejemplo de Aplicación Avanzada
```nexus
@React @Tailwind @Accessibility
Page Dashboard
  ( ?loading ) -> SkeletonLoader : MainContent

  MainContent
    Header #fixed
      Logo "Nexus"
      UserMenu < { ./UserMenu.tsx }
    
    Grid [cols:3]
      StatCard #elevated * 3 < [ "Sales:$1k", "Users:500", "Orders:12" ]
    
    Section "Actions"
      Button "Delete Account" !danger => API.delete(/user) -> Toast("Deleted")
```

---
*Nexus: Menos palabras, más intención.*
